<script setup>
import {useSessionStore} from "@/stores/session";
import {computed, onMounted, reactive, ref, watch} from "vue";
import {useRoute} from "vue-router";


const session = useSessionStore();
const membre = session.connectUser.member;
console.log('membre', membre);
const route = useRoute();
let data = reactive({
  navbar: [],
  isLogin: false,
});



function dataNavbar () {
  return membre.fullname !== undefined;
}

onMounted(()=>{
  data.isLogin = dataNavbar();
})

//actualiser la navbar en fonction de l'utilisateur connecté
watch(dataNavbar, (value) => {
  data.isLogin = value;
});

</script>
<template>
<nav>
  <div class="navbar is-primary" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <RouterLink class="navbar-item" to="/">
        <img src="../assets/logo.svg" width="112" height="28" alt="logo retour accueil">
      </RouterLink>

      <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
        <RouterLink class="navbar-item" to="/">Accueil</RouterLink>
        <RouterLink class="navbar-item" to="/add-conversation">Créer une conversation</RouterLink>
        <RouterLink class="navbar-item" to="/list-members">Liste Membres</RouterLink>
        <RouterLink class="navbar-item" to="/about">About</RouterLink>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
<!--            <template v-for="item in data.navbar">-->
<!--              <div>-->
<!--                <RouterLink :class="'button '+item.class" :to="item.link">-->
<!--                  <strong>{{item.name}}</strong>-->
<!--                </RouterLink>-->
<!--              </div>-->
<!--            </template>-->

            <template v-if="data.isLogin">
              <RouterLink class="button is-primary" to="/logout">
                <strong>Se déconnecter</strong>
              </RouterLink>
              <RouterLink class="button is-secondary" :to="'/member/' + membre.id">
                {{membre.fullname}}
              </RouterLink>
            </template>
            <template v-else>
              <RouterLink class="button is-primary" to="/login">
                <strong>Se connecter</strong>
              </RouterLink>
              <RouterLink class="button is-light" to="/add-user">
                S'inscrire
              </RouterLink>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</nav>
</template>
