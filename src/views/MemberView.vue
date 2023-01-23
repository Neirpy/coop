<script setup>
import {inject, onMounted, reactive} from "vue";
import {useMembresStore} from "@/stores/membres";
import {useRoute} from "vue-router";

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
  api.get(`channels?token=${session.connectUser.token}`).then(response => {
    for (let i = 0; i < response.length; i++) {
      api.get(`channels/${response[i].id}/posts?token=${session.connectUser.token}`).then(messages => {
        for (let j = 0; j < messages.length; j++) {
          if (messages[j].id===session.connectUser.id) {
            recupMessage.push(messages[j]);
          }
        }
      });
    }
    console.log(recupMessage.sort((a, b) => a.created_at - b.created_at));
  });
}
loadMessages();


</script>

<template>
    <div class="columns">
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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Phasellus nec iaculis mauris. <a>@bulmaio</a>.
          <a href="#">#css</a> <a href="#">#responsive</a>
          <br>
          <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
        </div>
      </div>
    </div>
  </div>
</template>
