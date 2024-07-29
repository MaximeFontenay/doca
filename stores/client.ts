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
    siren: null,
    TVA: {
      number: '',
      intracom: false,
    },
  })

  return { datas }
})
