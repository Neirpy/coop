<script setup>
import {useSessionStore} from "@/stores/session";

const session = useSessionStore();
const membre = session.connectUser.member;
</script>
<template>
<nav>
  <div class="navbar is-primary" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <RouterLink class="navbar-item" to="/">
        <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28">
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
            <div v-if="session.isValid()">
              <RouterLink class="button is-primary" to="/logout">
                <strong>Se déconnecter</strong>
              </RouterLink>
              <RouterLink class="button is-secondary" :to="'/member/' + membre.id">
                {{membre.fullname}}
              </RouterLink>
            </div>
            <div v-else>
              <RouterLink class="button is-primary" to="/login">
                <strong>Se connecter</strong>
              </RouterLink>
              <RouterLink class="button is-light" to="/add-user">
                S'inscrire
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</nav>
</template>
