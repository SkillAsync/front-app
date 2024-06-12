<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { io, Socket } from 'socket.io-client';
import { getChannels } from '@/api/index';
import { useAuthStore } from '@/stores/useAuthStore';
import headerComponent from '@/components/layout/headerComponent.vue';
import { storeToRefs } from 'pinia';
import type { Channel } from '@/types/Channel';
import type { Message } from '@/types/message';
import { watch } from 'vue';

const { user } = storeToRefs(useAuthStore());

const props = defineProps<{ selected?: string }>();

const chats = ref<Channel[]>([]);
const socket = ref<Socket | null>(null);

onMounted(() => {
    socket.value = io(import.meta.env.VITE_APP_SERVER_CHAT_URL as string);

    getChannels().then((res) => {
        chats.value = [...res.channels];

        chats.value.forEach((chat) => {
            socket.value?.emit('joinChannel', chat.uuid);
        });
    });

    socket.value.on('lastMessage', (msg: any) => {
        // Actualizar el último mensaje de cada chat
        chats.value.forEach((chat) => {
            if (chat.uuid === msg.channel) {
                chat.lastMessage = msg;
            }
        });

        // Ordenar los chats por la fecha del último mensaje
        chats.value.sort((a, b) => {
            const timeA = a.lastMessage?.createdAt ? new Date(a.lastMessage?.createdAt).getTime() : 0;
            const timeB = b.lastMessage?.createdAt ? new Date(b.lastMessage?.createdAt).getTime() : 0;
            return timeB - timeA;
        });
    });
});

const messageLastMessage = (lastMessage: Message | undefined) => {
    const isUser = lastMessage?.user === user.value?.uuid ? 'Tú: ' : '';
    const messageLastMessage = `${isUser}${lastMessage?.message}`;

    return messageLastMessage || 'No hay mensajes';
};

watch(() => props.selected, (newValue: string) => {
    console.log(newValue);
}, {
    immediate: true
});
</script>

<template>
    <headerComponent />
    <div class="flex h-screen bg-gray-100">
        <div class="flex flex-col w-1/3 bg-gray-100 border-r border-gray-300 pt-20">
            <div class="px-4 py-3 bg-gray-200 border-b border-gray-300">
                <h2 class="text-lg font-bold pt-4">Chats</h2>
            </div>
            <div class="overflow-y-auto">
                <div v-for="chat in chats" :key="chat.uuid" class="px-4 py-3 hover:bg-green-200 cursor-pointer"
                    @click="$router.push(`/chat/${chat.uuid}`)" :class="{
                        'bg-green-200': chat.uuid === props.selected
                    }">
                    <div class="font-bold">{{ chat.name }}</div>
                    <div class="text-sm text-gray-500">
                        {{ messageLastMessage(chat.lastMessage) === 'undefined' ? 'No hay mensajes' : messageLastMessage(chat.lastMessage) }}
                    </div>
                    <div class="text-xs text-gray-400">
                        {{ chat.lastMessage?.createdAt ? chat.lastMessage.createdAt.split('T')[1].split('.')[0].slice(0,
                        5) : '' }}
                    </div>
                </div>
            </div>
        </div>
        <div class="w-full">
            <slot></slot>
        </div>
    </div>
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
