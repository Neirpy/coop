<script setup>
import { defineProps, inject, onMounted, ref, reactive } from 'vue';
import {useMembresStore} from "@/stores/membres";

const bus = inject('bus');
const membresStore = useMembresStore();
const props = defineProps(['message']);

let state = reactive({
  // id:0,
  auteur:'',
  date:'',
});

onMounted(()=>{
  // state.id = props.message.id;
  state.auteur = membresStore.getMembreById(props.message.member_id);
  state.date = 'le ' + new Date(props.message.created_at).toLocaleDateString() + ' à ' + new Date(props.message.created_at).toLocaleTimeString();
})

</script>

<template>
  <article class="media">
    <figure class="media-left">
      <p class="image is-64x64">
        <img src="https://bulma.io/images/placeholders/128x128.png">
      </p>
    </figure>
    <div class="media-content">
      <div class="content">
        <p>
          <strong>{{state.auteur.fullname}}</strong> <small></small> <small>{{state.date}}</small>
          <br>
          {{props.message.message}}
        </p>
      </div>
      <nav class="level is-mobile">
        <div class="level-left">
          <a class="level-item">
            <span class="icon is-small"><i class="fas fa-reply"></i></span>
          </a>
          <a class="level-item">
            <span class="icon is-small"><i class="fas fa-retweet"></i></span>
          </a>
          <a class="level-item">
            <span class="icon is-small"><i class="fas fa-heart"></i></span>
          </a>
        </div>
      </nav>
    </div>
  </article>
</template>

<style>
</style>

<style scoped>
</style>