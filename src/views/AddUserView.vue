<script setup>
import {inject, reactive} from "vue";
import{useRouter} from "vue-router";

const router = useRouter();

let member=reactive({
  fullname:'hello',
  email:'world@gmail.com',
  password:'helloworld'
})

const validForm=()=>{
  api.post('members',{
    body:member
    /*body:{
        fullname:member.fullname,
        email:member.email,
        password:member.password
    }*/
  }).then(res=>{
    if (confirm('Votre compte est créé, voulez-vous vous connecter?')){
      router.push('/login')
    }
    console.log(res)
  });
}
</script>
<template>
  <h1>Créer un compte</h1>
  <form @submit.prevent="validForm">
    <div class="field">
      <label for="name">Nom : </label>
      <input type="text" id="name" v-model="member.fullname" placeholder="Nom complet ou pseudo"/>
    </div>
    <div class="field">
      <label for="email">Mail : </label>
      <input type="email" id="email" v-model="member.email" placeholder="Mail"/>
    </div>
    <div class="field">
      <label for="password">Mot de passe : </label>
      <input type="password" id="password" v-model="member.password" placeholder="Mot de passe"/>
    </div>
    <div class="field is-grouped">
      <div class="control"><button class="button is-primary" type="submit">Créer un compte</button></div>
      <div class="control"><RouterLink class="button is-danger" to="/">Annuler</RouterLink></div>
    </div>
  </form>
</template>