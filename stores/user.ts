import { type UserInformations } from 'types/userInformationsType'

export const useUserStore = defineStore('userStore', () => {
  const informations: UserInformations = reactive<UserInformations>({
    name: '',
    firstname: '',
    email: '',
    phone: null,
    address: {
      street: '',
      city: '',
      postalCode: null,
    },
    siret: null,
    website: '',
    logo: '',
  })

  return { informations }
})
