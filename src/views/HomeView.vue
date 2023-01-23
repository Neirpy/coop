<script setup>
// import TheWelcome from '../components/TheWelcome.vue'
import {onMounted, ref} from "vue";
import {useSessionStore} from "@/stores/session";

const session = useSessionStore();

onMounted( ()=>{
  if (session.isValid()){
    listeConv(session.connectUser.token);
  }
})

let channels = ref([]);

const listeConv = (token) =>{
  api.get(`channels?token=${token}`).then(res=>{
    channels.value = res;
  })

}

</script>

<template>
  <main class="ml-3">
<!--    <TheWelcome />-->

    <section>
      <h2>Liste des conversations :</h2>
      <p class="subtitle">
        <router-link class="button" to="/add-conversation">Créer une conversation</router-link>
      </p>
      <ul class="ml-3">
        <li class="box" v-for="channel in channels">
          <router-link :to="{name: 'conversation', params:{id :channel.id}}">
          <h2 class="title is-3">{{channel.topic}}</h2>
          <p class="subtitle">{{channel.label}}</p>
          </router-link>
        </li>
      </ul>
    </section>
  </main>
</template>
