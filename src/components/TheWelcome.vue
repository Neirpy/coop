<script setup>
import {useSessionStore} from "@/stores/session";
const sessionStore = useSessionStore();
</script>

<template>
  <h1>Bienvenue dans Coop : <span v-if="sessionStore.connectUser.member">{{sessionStore.connectUser.member.fullname}}</span> </h1>

</template>
