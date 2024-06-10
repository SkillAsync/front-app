import axios from 'axios'

const API_URL = 'http://localhost:3000' // URL del servidor Node.js

export const createChannel = async (name, participants) => {
  try {
    const response = await axios.post(`${API_URL}/channels`, { name, participants })
    return response.data
  } catch (error) {
    throw error.response.data
  }
}

export const getChannels = async () => {
  try {
    const uuid = JSON.parse(localStorage.getItem('user').uuid)
    const response = await axios.get(`${API_URL}/channels${uuid}`)
    return response.data
  } catch (error) {
    conserror.response.data
  }
}

