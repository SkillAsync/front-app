import './index.css'
import { createApp , provide , h  } from 'vue'
import { createPinia } from 'pinia'
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'
import { DefaultApolloClient } from '@vue/apollo-composable'

import App from './App.vue'
import router from './router'

const httpLink = createHttpLink({
    uri: 'http://localhost:8000/graphql',
})

const apolloClient = new ApolloClient({
    link: httpLink,
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
