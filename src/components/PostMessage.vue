<script setup>
import {inject, onMounted, ref} from "vue";

const bus =inject('bus');
const props = defineProps(['cid']);
const session = inject('session');
let message = ref('');

const sendMessage = () => {
  let body ={
    channel_id:props.cid,
    member_id:session.connectUser.id,
    message: message.value
  }
  api.post(`channels/${body.channel_id}/posts?token=${session.connectUser.token}`, {
    body
  }).then(res => {
    message.value = '';
    bus.emit('message');
  });
};
</script>

<template>
  <form @submit.prevent="sendMessage">
    <div class="has-addons">
      <div class="control is-expanded field">
        <label for="message">Message : </label>
        <textarea class="textarea" id="message" v-model="message" placeholder="Votre message"></textarea>
      </div>
      <div class="control field">
        <button class="button is-info" type="submit">Envoyer</button>
      </div>
    </div>
  </form>
</template>