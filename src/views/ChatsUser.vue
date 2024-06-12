<script setup lang="ts">
import ChatsView from '@/views/ChatsView.vue';
import { ref, watch, watchEffect, computed, onMounted } from 'vue';
import { getChannels } from '@/api/index';
import { useRouter } from 'vue-router';
import { io, Socket } from 'socket.io-client';
import { useAuthStore } from '@/stores/useAuthStore';
import { storeToRefs } from 'pinia';
import type { Message } from '@/types/message';
import { nextTick } from 'vue';


const { user } = storeToRefs(useAuthStore());
const router = useRouter();

const channelId = ref(router.currentRoute.value.params.uuid)
const name = ref<string>('');


const socket = ref<Socket | null>(null);
const messages = ref<Message[]>([]);
const newMessage = ref('');



const sendMessage = () => {
    if (newMessage.value && socket.value) {
        socket.value.emit('sendMessage', {
            channel: channelId.value,
            user: user.value?.uuid,
            message: newMessage.value
        });

        newMessage.value = '';
    }
};

const groupMessagesByDate = (msgs: Message[]) => {
    const grouped: Record<string, Message[]> = {};

    msgs.forEach(msg => {
        let date = new Date(msg.createdAt).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })
        const now = new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })
        if (date === now) {
            date = 'Hoy'
        }
        if (!grouped[date]) {
            grouped[date] = [];
        }
        grouped[date].push(msg);
    });

    return grouped;
};

const groupedMessages = computed(() => groupMessagesByDate(messages.value));
const refInput = ref<HTMLInputElement>(null);

watchEffect(async () => {

    socket.value = io(import.meta.env.VITE_APP_SERVER_CHAT_URL as string);
    socket.value.emit('joinChannel', channelId.value);

    socket.value.on('channelMessages', (msgs: Message[]) => {
        messages.value = [];
        messages.value.push(...msgs);
    });

    socket.value.on('message', (msg: Message) => {
        messages.value.push(msg);
    });
});

watch(() => router.currentRoute.value.params.uuid, async (newValue: string) => {

    await nextTick(() => {
        refInput.value?.focus();
    });

    await getChannels().then((res) => {
        res.channels.forEach((chat) => {
            chat.participants.forEach((participant) => {
                if (participant.uuid === user.value?.uuid) {
                    if (chat.uuid === newValue) {
                        name.value = chat.name;
                    }
                }
            });
        });
    });


    channelId.value = newValue;

    socket.value?.emit('joinChannel', channelId.value);

    messages.value = [];

    socket.value?.emit('getChannelMessages', (msgs: Message[]) => {
        messages.value = [];
        messages.value.push(...msgs);
    })
}, {
    immediate: true,
    deep: true
});



</script>


<template>
    <ChatsView :selected="channelId">
        <div class="flex-1 flex flex-col bg-gray-50 h-full w-full pt-20">
            <div class="px-4 py-3 bg-gray-200 border-b border-gray-300">
                <h2 class="text-lg font-bold pt-4">{{ name }}</h2>
            </div>

            <div class="flex-1 overflow-y-auto px-4 py-2 message-list">
                <div v-for="(msgs, date) in groupedMessages" :key="date" class="mb-4">
                    <div class="text-center text-lg font-bold text-gray-600 mb-2">{{ date }}</div>
                    <div v-for="msg in msgs" :key="msg._id" class="flex flex-col mb-2">
                        <div :class="msg.user === user?.uuid ? 'bg-green-500 text-white ml-auto' : 'bg-gray-300 text-gray-800 mr-auto'"
                            class="rounded-lg p-2 max-w-xs whitespace-pre-line">
                            <p>{{ msg.message }}</p>
                            <div class="text-md text-gray-100 text-time">{{
                                msg.createdAt.split('T')[1].split('.')[0].slice(0, 5) }}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex items-center px-4 py-2 bg-gray-200 border-t border-gray-300">
                <input ref="messageInput" v-model="newMessage" @keyup.enter="sendMessage" type="text"
                    class="flex-1 p-2 border  border-gray-300 rounded-lg" placeholder="Escribe un mensaje" />
                <button @click="sendMessage" class="px-4 py-2 bg-green-700 text-white rounded-lg ml-2">
                    Enviar
                </button>
            </div>
        </div>
    </ChatsView>
</template>

<style scoped>
.chat-list {
    overflow-y: auto;
    max-height: calc(100vh - 100px);
}

.message-list {
    overflow-y: auto;
    max-height: calc(100vh - 200px);
}
</style>
