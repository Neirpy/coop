<script setup>
import {onMounted} from "vue";

const user = useUserStore();
onMounted(() => {
  api.get('ping').then(response => {
    console.log("L'api fonctionne !")
  })
  // let member = {fullname:'ok',email:'oui@ok.fr',password:'poiutfgio'};
  // api.delete('members',{body:member}).then(response => {
  //   console.log(response)
  // })
})
</script>

<template>
  <div class="about">
    <h1>This is an about page</h1>
      <div v-if="user.isConnected">
        Un utilisateur est connecté
        <div>
          <button @click="user.disconnect">Se déconnecter</button>
        </div>
      </div>
      <div v-else>
        Aucun utilisateur n'est connecté
        <div>
          <button @click="user.setConnected">Se connecter</button>
        </div>
      </div>
  </div>
</template>

<style>
</style>
