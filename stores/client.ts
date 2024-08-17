import { type Client } from "@/types/clientType"

export const useClientStore = defineStore('clientStore', () => {
  const datas: Client = reactive<Client>(createDefaultClient())

  return { datas }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useClientStore, import.meta.hot))
}
