
<script setup>
import { ref } from 'vue'
import footerComponent from '@/components/layout/footerComponent.vue'
import { useMutation } from '@vue/apollo-composable'
import gql from 'graphql-tag'

// Definir el estado reactivo para el usuario
const user = ref({
  first_name: '',
  last_name: '',
  email: '',
  address: '',
  password: ''
})

// Definir la mutación de GraphQL con variables
const CREATE_USER_MUTATION = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      uuid
    }
  }
`

// Usar la mutación con Apollo
const { mutate: createUser } = useMutation(CREATE_USER_MUTATION)

// Función para manejar la creación del usuario
const handleCreateUser = async () => {
  try {
    const response = await createUser({
      input: {
        first_name: user.value.first_name,
        last_name: user.value.last_name,
        email: user.value.email,
        password: user.value.password,
        address: user.value.address
      }
    })
    console.log('User created with UUID:', response.data.createUser.uuid)
  } catch (error) {
    console.error('Error creating user:', error)
  }
}
</script>
<template>
  <!-- source:https://codepen.io/owaiswiz/pen/jOPvEPB -->
  <div class="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
    <div class="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
      <div class="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
        <div>
          <img src="https://storage.googleapis.com/devitary-image-host.appspot.com/15846435184459982716-LogoMakr_7POjrN.png" class="w-32 mx-auto" />
        </div>
        <div class="mt-12 flex flex-col items-center">
          <h1 class="text-2xl xl:text-3xl font-extrabold">
            Regístrate
          </h1>
          <div class="w-full flex-1 mt-8">
            <div class="mx-auto max-w-xs">
              <input
                class="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                type="text" placeholder="Nombre" v-model="user.first_name" />
              <input
                class="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                type="text" placeholder="Apellido" v-model="user.last_name" />
              <input
                class="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                type="email" placeholder="Correo electrónico" v-model="user.email" />
              <input
                class="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                type="text" placeholder="Dirección" v-model="user.address" />
              <input
                class="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                type="password" placeholder="Contraseña" v-model="user.password" />
              <button @click="handleCreateUser"
                class="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                <svg class="w-6 h-6 -ml-2" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                  <circle cx="8.5" cy="7" r="4" />
                  <path d="M20 8v6M23 11h-6" />
                </svg>
                <span class="ml-3">
                  Regístrate
                </span>
              </button>
              <p class="mt-6 text-xs text-gray-600 text-center">
                Estoy de acuerdo con cumplir los
                <a href="#" class="border-b border-gray-500 border-dotted">
                  Términos de Servicio
                </a>
                de Templatana y su
                <a href="#" class="border-b border-gray-500 border-dotted">
                  Política de Privacidad
                </a>
              </p>
            </div>
            <!--<LinkButton redirection="/" />-->
          </div>
        </div>
      </div>
      <div class="flex-1 bg-indigo-100 text-center hidden lg:flex">
        <div class="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat img-register"></div>
      </div>
    </div>
  </div>
  <footerComponent></footerComponent>
</template>

<style scoped>
.img-register {
  background-image: url('../assets/images/image-register.png');
}
</style>
