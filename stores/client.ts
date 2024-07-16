import { type ClientInformations } from 'types/clientInformationsType'

export const useClientStore = defineStore('clientStore', () => {
  const informations: ClientInformations = reactive<ClientInformations>({
    name: '',
    email: '',
    address: {
      street: '',
      city: '',
      postalCode: '',
    },
    siret: null,
    TVA: {
      number: '',
      intracom: false,
    },
  })

  return { informations }
})
