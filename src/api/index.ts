import axios from 'axios'
import { useAuthStore} from '../stores/useAuthStore'
import { storeToRefs } from 'pinia'


const authStore = useAuthStore()

const { user } = storeToRefs(authStore)
const uuid : string = user.value?.uuid || ''

const API_URL = import.meta.env.VITE_APP_SERVER_CHAT_URL

export const createChannel = async (data : object) => {
  try {
    const response = await axios.post(`${API_URL}/channels`, data)
    console.log(response.data)
    return response.data
  } catch (error) {
    console.log('Hubo un error al crear el canal')
  }
}

export const getChannels = async () => {
  try {
    const response = await axios.get(`${API_URL}/channels/${uuid}`)
    return response.data
  } catch (error) {
    console.log('Hubo un error al obtener los canales')
  }
}

export const getMessages = async (channelId : string) => {
  try {
    const response = await axios.get(`${API_URL}/messages/${channelId}`)
    return response.data
  } catch (error) {
    console.log('Hubo un error al obtener los mensajes')
  }
}

