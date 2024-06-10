<script setup lang="ts">
import { ref, watch, watchEffect , computed } from 'vue';
import { io, Socket } from 'socket.io-client';
import { useAuthStore } from '@/stores/useAuthStore';
import { storeToRefs } from 'pinia';

const { user } = storeToRefs(useAuthStore());

interface interfaceProps {
    nameChannel: string;
    uuid: string;
}

const props = defineProps<interfaceProps>();

const channelId = ref(props.uuid as string)
const socket = ref<Socket | null>(null);
const messages = ref<Message[]>([]);
const newMessage = ref('');

interface Message {
    _id: string;
    user: string;
    channel: string;
    message: string;
    read: boolean;
    sent: boolean;
    delivered: boolean;
    edited: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

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

// Función para agrupar mensajes por fecha
const groupMessagesByDate = (msgs: Message[]) => {
    const grouped: Record<string, Message[]> = {};

    msgs.forEach(msg => {
        let date = new Date(msg.createdAt).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })
        const now = new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })
        if(date === now) {
            date = 'Hoy'
        }
        // const date = new Date(msg.createdAt).toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });        
        if (!grouped[date]) {
            grouped[date] = [];
        }
        grouped[date].push(msg);
    });

    return grouped;
};

const groupedMessages = computed(() => groupMessagesByDate(messages.value));

watchEffect(() => {
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

watch(() => props.uuid, (newVal) => {
    messages.value = [];
    channelId.value = newVal;
}, {
    immediate: true
});
</script>


<template>
    <div class="flex-1 flex flex-col bg-gray-50 h-screen w-full ">
        <div class="px-4 py-3 bg-gray-200 border-b border-gray-300">
            <h2 class="text-lg font-bold">{{ props.nameChannel }}</h2>
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
            <input v-model="newMessage" @keyup.enter="sendMessage" type="text"
                class="flex-1 p-2 border border-gray-300 rounded-lg" placeholder="Escribe un mensaje" />
            <button @click="sendMessage" class="px-4 py-2 bg-green-700 text-white rounded-lg ml-2">
                Enviar
            </button>
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


