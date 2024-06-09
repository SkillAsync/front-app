import './index.css'
import { createApp, provide, h } from 'vue'
import { createPinia } from 'pinia'
import { ApolloClient, createHttpLink, InMemoryCache, from, ApolloLink } from '@apollo/client/core'
import { DefaultApolloClient } from '@vue/apollo-composable'
import App from './App.vue'
import router from './router'

const httpLink = createHttpLink({
    uri: import.meta.env.VITE_APP_URL_API as string
})

const authMiddleware = new ApolloLink((operation, forward) => {
    const token = localStorage.getItem('access_token')
    operation.setContext({
        headers: {
            authorization: token ? `Bearer ${token}` : '',
        }
    })
    return forward(operation)
})

const apolloClient = new ApolloClient({
    link: from([authMiddleware, httpLink]),
    cache: new InMemoryCache(),
})

const app = createApp({
    setup() {
        provide(DefaultApolloClient, apolloClient)
    },
    render: () => h(App),
})

app.use(createPinia())
app.use(router)

app.mount('#app')
