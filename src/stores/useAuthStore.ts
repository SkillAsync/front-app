import { defineStore } from 'pinia'

interface User {
  uuid: string
  first_name: string
  email: string
}

interface AuthState {
  accessToken: string
  user: User | null
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    accessToken: localStorage.getItem('access_token') || '',
    user: JSON.parse(localStorage.getItem('user') || 'null')
  }),
  actions: {
    setAccessToken(token: string) {
      this.accessToken = token
      localStorage.setItem('access_token', token)
    },
    setUser(user: User) {
      this.user = user
      localStorage.setItem('user', JSON.stringify(user))
    },
    clearAuthData() {
      this.accessToken = ''
      this.user = null
      localStorage.removeItem('access_token')
      localStorage.removeItem('user')
    }
  },
  getters: {
    isAuthenticated: (state: AuthState) => !!state.accessToken
  }
})
