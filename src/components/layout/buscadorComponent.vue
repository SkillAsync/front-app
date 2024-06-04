<template>
    <div>
        <div class="group">
  <svg class="icon" aria-hidden="true" viewBox="0 0 24 24"><g><path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path></g></svg>
  <input placeholder="Usuarios y servicios" type="search" class="input">
</div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.group {
 display: flex;
 line-height: 28px;
 align-items: center;
 position: relative;
 max-width: 250px;
}

.input {
 width: 100%;
 height: 40px;
 line-height: 28px;
 padding: 0 1rem;
 padding-left: 2.5rem;
 border: 2px solid transparent;
 border-radius: 8px;
 outline: none;
 background-color: #f3f3f4;
 color: #0d0c22;
 transition: .3s ease;
 align-items: center;
}

.input::placeholder {
 color: #9e9ea7;
}

.input:focus, input:hover {
 outline: none;
 border-color: rgba(196, 210, 220, 0.4);
 background-color: #fff;
 box-shadow: 0 0 0 4px rgba(229, 76, 234, 0.1);
}

.icon {
 position: absolute;
 left: 1rem;
 fill: #dedefe;
 width: 1rem;
 height: 1rem;
}






</style>