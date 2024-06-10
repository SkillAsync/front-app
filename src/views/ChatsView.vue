<script setup lang="ts">
import headerComponent from '@/components/layout/headerComponent.vue';

</script>
<template>
    <headerComponent />
    <script setup lang="ts">

import { onMounted, ref, watch } from 'vue';
import { io } from 'socket.io-client';
import { getChannels } from './api/index';

const socket = ref(null);
const channelId = ref(JSON.parse(localStorage.getItem('user')).uuid);
console.log(channelId.value)
const messages = ref([]);
const newMessage = ref('');
const joinedChannel = ref(false);
const user = ref('');

const joinChannel = () => {
  if (channelId.value) {
    socket.value = io('http://localhost:3000');
    socket.value.emit('joinChannel', channelId.value);

    socket.value.on('channelMessages', (msgs) => {
      messages.value = msgs;
    });

    socket.value.on('newMessage', (msg) => {
      messages.value.push(msg);
      socket.value.emit('messageDelivered', msg._id);
    });

    joinedChannel.value = true;
  }
};

const sendMessage = () => {
  if (newMessage.value) {
    socket.value.emit('sendMessage', {
      channel: channelId.value,
      user: user.value,
      message: newMessage.value
    });

    newMessage.value = '';
  }
};

onMounted(() => {
  getChannels().then((res) => {
    console.log(res);
  });
});


</script>
    <template>
        <div class="flex h-screen">
            <!-- Parte izquierda: Lista de chats -->
            <div class="flex flex-col w-1/3 bg-gray-100 border-r border-gray-300">
                <!-- Encabezado de la lista de chats -->
                <div class="px-4 py-3 bg-gray-200 border-b border-gray-300">
                    <h2 class="text-lg font-bold">Chats</h2>
                </div>
                <!-- Lista de chats -->
                <div class="flex-1 overflow-y-auto">
                    <!-- Aquí van los chats, puedes usar un bucle para mostrar varios -->
                    <div class="px-4 py-3 hover:bg-gray-200 cursor-pointer">
                        <div class="font-bold">Nombre del chat</div>
                        <div class="text-sm text-gray-500">Último mensaje recibido</div>
                        <div class="text-xs text-gray-400">Hora del último mensaje</div>
                    </div>
                </div>
                <!-- Pié de lista de chats -->
                <div class="px-4 py-3 bg-gray-200 border-t border-gray-300">
                    <span class="text-xs text-gray-500">Filtrar y ordenar por hora</span>
                </div>
            </div>

            <!-- Parte derecha: Conversación -->
            <div class="flex-1 flex flex-col bg-gray-50">
                <!-- Encabezado de la conversación -->
                <div class="px-4 py-3 bg-gray-200 border-b border-gray-300">
                    <h2 class="text-lg font-bold">Nombre del chat</h2>
                </div>
                <!-- Cuerpo de la conversación -->
                <div class="flex-1 overflow-y-auto px-4 py-2">
                    <!-- Aquí va el contenido de la conversación -->
                    <div class="flex flex-col mb-2">
                        <div class="bg-blue-500 text-white rounded-lg p-2 max-w-xs">
                            <p>Mensaje de ejemplo</p>
                            <div class="text-xs text-gray-300">Hora del mensaje</div>
                        </div>
                        <!-- Otro mensaje -->
                        <div class="bg-gray-300 text-gray-800 rounded-lg p-2 max-w-xs self-end mt-2">
                            <p>Otro mensaje de ejemplo más largo</p>
                            <div class="text-xs text-gray-500">Hora del mensaje</div>
                        </div>
                    </div>
                </div>
                <!-- Pié de la conversación -->
                <div class="px-4 py-3 bg-gray-200 border-t border-gray-300 relative">
                    <input type="text" placeholder="Escribe un mensaje..."
                        class="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500">
                    <!-- Iconos de grabar audio , enviar mensaje y adjuntar archivo 
          -->
                    <div class="absolute right-0 bottom-0 flex items-center space-x-2">
                        <button class="p-2 rounded-full bg-gray-300 hover:bg-gray-400">
                            <svg class="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 14c-2.206 0-4-1.794-4-4s1.794-4 4-4 4 1.794 4 4-1.794 4-4 4z"></path>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M19 21v-2a7.002 7.002 0 0 0-7-7H7a7.002 7.002 0 0 0-7 7v2"></path>
                            </svg>
                        </button>
                        <button class="p-2 rounded-full bg-gray-300 hover:bg-gray-400">
                            <svg class="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M21 12a9 9 0 0 1-9 9c-4.97 0-9-4.03-9-9s4.03-9 9-9a9 9 0 0 1 9 9z"></path>
                                <circle cx="12" cy="12" r="3"></circle>
                            </svg>
                        </button>
                        <button class="p-2 rounded-full bg-gray-300 hover:bg-gray-400">
                            <svg class="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg">
                                <path stroke-line cap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 14l9-5-9-5-9 5 9 5z"></path>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 14l9-5-9-5-9 5 9 5z"></path>
                            </svg>
                        </button>
                    </div>
                </div>

            </div>
        </div>
    </template>

    <style scoped></style>
</template>

<style scoped>

</style>