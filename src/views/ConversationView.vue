<script setup>
import PosterMessage from '@/components/PostMessage.vue'
import Message from '@/components/Message.vue'

import { onMounted, ref, inject, reactive } from 'vue'
import { useRoute } from 'vue-router'

const bus = inject('bus');
const route = useRoute();
const session = inject('session');
let refresh=ref();

bus.on('recharger-messages',chargerMessages);

let data = reactive({
  // les détails de la conversation choisie
  channel : {},
  // les messages postés dans cette conversation
  messages : []
})
async function chargerMessages() {
  if (route.params.id !== undefined && route.name === 'conversation'){
    const response = await api.get(`channels/${route.params.id}/posts?token=${session.connectUser.token}`);
    data.messages = response.reverse();
    refresh = setTimeout(() => bus.emit('recharger-messages'), 10);
  }
  else{
    clearTimeout(refresh);
    refresh = null;
  }
}
function chargerConversation() {
  api.get(`channels/${route.params.id}?token=${session.connectUser.token}`).then(response => {
    data.channel = response;
  });
}
onMounted(() => {
  chargerConversation();
  chargerMessages();
});
</script>
<template>
  <div v-if="data.channel.id">
    <h1 class="title">{{ data.channel.topic }}</h1>
    <p class="subtitle">{{ data.channel.label }}</p>
    <template v-for="message in data.messages">
      <message :message="message"></message>
    </template>
    <poster-message :cid="data.channel.id"></poster-message>
  </div>
</template>