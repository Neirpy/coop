<script setup>
import {inject, onMounted, reactive} from 'vue';

const bus = inject('bus');
const session = useSessionStore();
session.logout();

</script>

<template>

</template>