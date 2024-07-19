import { type UserDatas } from 'types/userType'

export const useUserStore = defineStore('userStore', () => {
  const datas: UserDatas = reactive<UserDatas>({
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

  return { datas }
})
