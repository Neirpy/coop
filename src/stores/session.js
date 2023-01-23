import {reactive, ref} from 'vue'
import { defineStore } from 'pinia'
import{useRouter} from "vue-router";



export const useSessionStore = defineStore('session', () => {
  const router = useRouter();
  const connectUser = reactive({
    member:{},
    token:false
  });
  const setSession = (m,t) => {
    connectUser.member = m;
    connectUser.token = t;
  }

  async function isValid() {
    let isConnected=true
    const token=connectUser.token
    if (!token){
      await router.push('/login');
      return false;
    }else {
      const mid = connectUser.member.id;
      const response =await api.get(`members/${mid}/signedin?token=${token}`);
      const data = await response;

      if (!data.token){
        await router.push('/login');
        return false;
      }

      return true;
    }
  }

  return { connectUser, setSession, isValid }
}, {
  persist: true,
})
