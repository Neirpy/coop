<script setup>
import {inject, onMounted, reactive, watch} from "vue";
import {useMembresStore} from "@/stores/membres";
import {useRoute} from "vue-router";
import {useSessionStore} from "@/stores/session";

const bus = inject('bus');
const route = useRoute();
const session = useSessionStore();
const membreStore = useMembresStore();
let data = reactive({
  membre: '',
  messages: [],
});

data.membre = membreStore.getMembreById(route.params.id);

function loadMessages() {
  let recupMessage = [];
  api.get(`channels?token=${session.connectUser.token}`).then(responses => {

    let total = responses.length;
    for (let response of responses) {
      api.get(`channels/${response.id}/posts?token=${session.connectUser.token}`).then(messages => {
        // console.log('compteur messages', messages.length)
        for (let message of messages) {
          if (message.member_id === route.params.id) {
            recupMessage.push(message);
          }
        }
        total--;
        if(total===0) {
          data.messages=recupMessage.sort((a, b) => {
            return new Date(b.modified_at) - new Date(a.modified_at);
          });
        }
      });
    }


  });
}

watch(route, (to) => {
  data.membre = membreStore.getMembreById(route.params.id);
  loadMessages();
});

onMounted(() => {
  loadMessages();
})

</script>

<template>
<div class="columns" v-if="data.membre">
    <div class="card column is-one-quarter">
      <div class="card-image">
        <figure class="image is-4by3">
          <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image">
        </figure>
      </div>
      <div class="card-content">
        <div class="media">
          <div class="media-left">
            <figure class="image is-48x48">
              <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">
            </figure>
          </div>
          <div class="media-content">
            <p class="title is-4">{{data.membre.fullname}}</p>
            <p class="subtitle is-6">{{data.membre.email}}</p>
          </div>
        </div>
        <div class="content">
          <time :datetime="data.membre.created_at">{{data.membre.created_at}}</time>
        </div>
      </div>
    </div>
    <div class="card column">
      <div class="card-content">
        <div class="content">
          <template v-for="message in data.messages.slice(0,10)">
            <div class="box">
              <article class="media">
                <div class="media-content">
                  <div class="content">
                    <p>
                      <RouterLink :to="'/conversation/'+ message.channel_id">{{message.message}}</RouterLink>
                    </p>
                    <small><a>Like</a> · <a>Reply</a> · {{message.modified_at}}</small>
                  </div>
                </div>
              </article>
            </div>
          </template>
      </div>
    </div>
  </div>
</div>
</template>
