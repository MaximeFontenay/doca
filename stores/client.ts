import { type ClientDatas } from 'types/clientType'

export const useClientStore = defineStore('clientStore', () => {
  const datas: ClientDatas = reactive<ClientDatas>({
    name: '',
    email: '',
    address: {
      street: '',
      city: '',
      postalCode: '',
    },
    siren: '',
    TVA: {
      number: '',
      intracom: false,
    },
  })

  return { datas }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useClientStore, import.meta.hot))
}
