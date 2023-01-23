<script setup>
import {inject, reactive} from "vue";

const router= inject('router');
const sessionStore = inject('session');

let member=reactive({
  email: 'world@gmail.com',
  password: 'helloworld'
});

const loginUser = () => {
  api.post('members/signin', {
    body:member
  }).then(res => {
    if (res.message){
      alert(res.message);
    } else {
      sessionStore.setSession(res.member,res.token);
      router.push('/');
    }


  });
};
</script>

<template>
  <h1>Se connecter :</h1>
  <form @submit.prevent="loginUser">
    <div class="field">
      <label for="email">Mail : </label>
      <input type="email" id="email" v-model="member.email" />
    </div>
    <div class="field">
      <label for="password">Mot de passe : </label>
      <input type="password" id="password" v-model="member.password" />
    </div>
    <div class="field">
      <div class="control"><button type="submit" class="button is-primary">Se connecter</button></div>
    </div>
  </form>
</template>