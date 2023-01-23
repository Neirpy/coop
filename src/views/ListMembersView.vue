<script setup>
import {inject, onMounted, reactive} from 'vue';
import {useMembresStore} from "@/stores/membres";

const bus = inject('bus');
const membresStore = useMembresStore();

let data= reactive({
  membres: '',
});

onMounted(()=>{
  membresStore.chargerMembres().then((liste)=>{
    data.membres = liste;
  });
});


</script>

<template>
  <div class="columns">

    <template v-for="membre in data.membres">

        <div class="card column is-4">
          <div class="card-image">
            <RouterLink :to="'/member/' + membre.id">
              <figure class="image is-4by3">
                <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image">
              </figure>
            </RouterLink>
          </div>
          <div class="card-content">
            <div class="media">
              <div class="media-left">
                <figure class="image is-48x48">
                  <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">
                </figure>
              </div>
              <div class="media-content">
                <p class="title is-4">{{membre.fullname}}</p>
                <p class="subtitle is-6">{{membre.email}}</p>
              </div>
            </div>

            <div class="content">
              <time :datetime="membre.created_at">{{membre.created_at}}</time>
            </div>
          </div>
          <footer class="card-footer">
            <a href="#" class="card-footer-item">Save</a>
            <a href="#" class="card-footer-item">Edit</a>
            <a href="#" class="card-footer-item">Delete</a>
          </footer>
        </div>
    </template>
  </div>

</template>