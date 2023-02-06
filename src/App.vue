<script setup>

import Navbar from "@/components/Navbar.vue";
import {provide, onMounted, reactive, watch} from "vue";
import {useRoute, useRouter} from "vue-router";

import {useGlobal} from "@/mixins/global";
import {useSessionStore} from "@/stores/session";
import mitt from "mitt";
import {useMembresStore} from "@/stores/membres";

const state = reactive({ appReady: false, sessionValid: false })

provide('bus' , mitt());

const router = useRouter();
provide('router', router);

provide('global', useGlobal());

const session = useSessionStore();
provide('session', session);

const membres = useMembresStore();
//provide('membres', membres);
console.log('membres', session.connectUser.member.fullname);

const route = useRoute();

watch(route, (to) => {
  start();
});

onMounted(()=>{
  start();
})

function start(){
  if (session.isValid()) {
    membres.chargerMembres().then(() => {
      state.sessionValid = true;
      state.appReady = true;
    });
  } else {
    state.sessionValid = false;
    state.appReady = true;
  }
}

</script>

<template>
    <template v-if="state.sessionValid">
      <Navbar />
    </template>
    <section class="section">
      <template v-if="state.appReady">
        <RouterView />
      </template>
    </section>
</template>

<style scoped>
</style>
