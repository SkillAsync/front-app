<script setup lang="ts">
import { getChannels, createChannel } from '@/api/index';
import { v4 as uuidv4 } from 'uuid';
import type { Channel } from '@/types/Channel';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/useAuthStore';
import { storeToRefs } from 'pinia';

const { user } = storeToRefs(useAuthStore());
const router = useRouter();
interface Props {
    first_name: string,
    uuid: string,
    image: string
}

const data = defineProps<Props>();
const channel = ref<Channel[]>([]);

onMounted(async () => {
    await getChannels().then((res) => {
        channel.value.push(...res.channels);
    });
});

const goChannel = async (uuid: string) => {
    if (user.value) {
        //Boolean que comprueba si dos participantes tienen un chat
        const chat = channel.value.find((chat) => {
            return chat.participants.some((participant) => {
                return participant.uuid === uuid;
            });
        });
        if (chat) {
            router.push(`/chat/${chat.uuid}`);
        } else {
            const _data = {
                name: data.first_name,
                uuid: uuidv4(),
                participants: [{
                    uuid: user.value.uuid,
                    name : user.value.first_name
                }, {
                    uuid: data.uuid,
                    name: data.first_name
                }]
            };

            try {
                const res = await createChannel(_data);
                router.push(`/chat/${res.uuid}`);
            } catch (error) {
                console.error('Error al crear el canal:', error);
            }
        }
    }
};
</script>


<template>
    <div class="bg-white rounded-lg shadow-lg max-w-sm w-full p-6">
        <div class="flex items-center">
            <img :src="data.image" :alt="`Foto de ${first_name}`" class="w-24 h-24 rounded-full mr-4">
            <div>
                <h2 class="text-xl font-bold text-gray-800">{{ first_name }}</h2>
                <p class="text-gray-600">Freelancer | Web Developer</p>
            </div>
        </div>
        <div class="mt-4 flex justify-between items-center">
            <span class="text-gray-600 font-semibold">Skills:</span>
            <div class="flex space-x-3">
                <img src="https://via.placeholder.com/20" alt="JavaScript Icon" class="w-6 h-6">
                <img src="https://via.placeholder.com/20" alt="Python Icon" class="w-6 h-6">
            </div>
        </div>
        <div class="mt-4">
            <!--<p class="text-gray-600">{{ data.bio }}</p>-->
        </div>
        <div class="mt-4 flex justify-end">
            <button class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                @click="goChannel(data.uuid)">Contact</button>

        </div>
    </div>
</template>
<style lang="scss" scoped></style>