import{ inject, reactive  } from 'vue'
import { defineStore} from "pinia";
import {useSessionStore} from "@/stores/session";

export const useMembresStore = defineStore('membres', () => {
  const session = useSessionStore();
  const state = reactive({
    membres: [],
  });

  function chargerMembres() {
    return new Promise(async (resolve, reject) => {
      const response = await api.get(`members?token=${session.connectUser.token}`);
      const result = await response;
      state.membres = result;
      resolve(result);
    });
  }

  function getMembreById(id) {
    const membre = state.membres.find((membre) => membre.id == id);
    return membre;
  }


  return {state, chargerMembres, getMembreById}
}, {
  persist :false,
});