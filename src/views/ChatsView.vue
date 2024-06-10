<template>
    <headerComponent />
    <div class="flex mt-20 pt-4 h-screen">
        <div class="flex flex-col w-1/3 bg-gray-100 border-r border-gray-300">
            <div class="px-4 py-3 bg-gray-200 border-b border-gray-300">
                <h2 class="text-lg font-bold">Chats</h2>
            </div>
            <div class="overflow-y-auto">
                <div v-for="chat in chats" :key="chat.uuid" class="px-4 py-3 hover:bg-green-200 cursor-pointer" @click="selected = true;
                chatSelected = chat;
                ">
                    <div class="font-bold">{{ chat.name }}</div>
                    <div class="text-sm text-gray-500">
                        {{ messageLastMessage(chat.lastMessage) }}
                    </div>
                    <div class="text-xs text-gray-400">
                        {{
                            chat.lastMessage?.createdAt.split('T')[1].split('.')[0].slice(0, 5)
                        }}
                    </div>
                </div>
            </div>
        </div>

        <div class="flex-1 flex flex-col bg-gray-50" v-if="!selected">
            <div class="flex-1 flex flex-col items-center justify-start mt-10">
                <h1 class="text-2xl font-bold text-green-600">Selecciona un chat</h1>
            </div>
        </div>
        <div v-else class="w-full">
            <ChatsUser :nameChannel="chatSelected?.name" :uuid="chatSelected?.uuid" />
        </div>

    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { io, Socket } from 'socket.io-client';
import { getChannels } from '@/api/index';
import { useAuthStore } from '@/stores/useAuthStore';
import headerComponent from '@/components/layout/headerComponent.vue';
import { storeToRefs } from 'pinia';
import ChatsUser from './ChatsUser.vue';

const { user } = storeToRefs(useAuthStore());

interface UserMongo {
    _id: string;
    name: string;
    uuid: string;
}
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

interface Channel {
    _id: string;
    uuid: string;
    name: string;
    participants: UserMongo[];
    active: boolean;
    lastMessage: Message;
    __v: number;
}

const chats = ref<Channel[]>([]);
const socket = ref<Socket | null>(null);
const selected = ref<boolean>(false);
const chatSelected = ref<Channel>({
    _id: '',
    uuid: '',
    name: '',
    participants: [],
    active: false,
    lastMessage: {
        _id: '',
        user: '',
        channel: '',
        message: '',
        read: false,
        sent: false,
        delivered: false,
        edited: false,
        createdAt: '',
        updatedAt: '',
        __v: 0
    },
    __v: 0
});

onMounted(() => {
    socket.value = io(import.meta.env.VITE_APP_SERVER_CHAT_URL as string);

    getChannels().then((res) => {
        chats.value.slice(0, chats.value.length);
        chats.value.push(...res.channels);

        chats.value.forEach((chat) => {
            socket.value?.emit('joinChannel', chat.uuid);
        });
    });


    socket.value.on('lastMessage', (msg: any) => {
        chats.value.forEach((chat) => {
            console.log(chat)
            if (chat.uuid === msg.channel) {
                chat.lastMessage = msg;
            }
        });
    });
});

const messageLastMessage = (lastMessage: Message | undefined) => {
    const isUser = lastMessage?.user === user.value?.uuid ? 'Tú: ' : '';
    return `${isUser}${lastMessage?.message}`;
};
</script>

<style scoped>
.chat-list {
    overflow-y: auto;
    max-height: calc(100vh - 100px);
}

.message-list {
    overflow-y: auto;
    max-height: calc(100vh - 200px);
}

.message-list::-webkit-scrollbar {
    width: 6px;
}

.message-list::-webkit-scrollbar-track {
    background: #f1f1f1;
}

.message-list::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 3px;
}

.message-list::-webkit-scrollbar-thumb:hover {
    background: #555;
}
</style>
