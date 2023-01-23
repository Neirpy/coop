<script setup>
import {inject, reactive} from "vue";
import {useSessionStore} from "@/stores/session";
import {useRouter} from "vue-router";


const router= useRouter();

const sessionStore = useSessionStore();

let channel=reactive({
  label:'',
  topic:''
})

const validForm=()=>{
  api.post(`channels?token=${sessionStore.connectUser.token}`,{
    body:channel
    /*body:{
        fullname:member.fullname,
        email:member.email,
        password:member.password
    }*/
  }).then(res=>{
    if(res.message){
      alert(res.message);
    } else {
      console.log(res);
      router.push('/');
    }

  });
}
</script>
<template>
  <h1>Créer une conversation</h1>
  <form @submit.prevent="validForm">
    <div class="field">
      <label for="name">Titre : </label>
      <input type="text" id="name" v-model="channel.topic" placeholder="Titre de la conversation"/>
    </div>
    <div class="field">
      <label for="descr">Description : </label>
      <textarea id="descr" class="textarea" v-model="channel.label" placeholder="Votre description"/>
    </div>
    <div class="field is-grouped">
      <div class="control"><button class="button is-primary" type="submit">Créer la conversation</button></div>
      <div class="control"><RouterLink class="button" to="/">Annuler</RouterLink></div>
    </div>

  </form>
</template>