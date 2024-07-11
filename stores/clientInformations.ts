import { type ClientInformations } from 'types/clientInformationsType'

export const useClientInformationsStore = defineStore(
  'clientInformations',
  () => {
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
  },
)
