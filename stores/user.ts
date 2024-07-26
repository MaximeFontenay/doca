import { type UserDatas } from 'types/userType'

export const useUserStore = defineStore('userStore', () => {
  const datas: UserDatas = reactive<UserDatas>({
    name: '',
    firstname: '',
    email: '',
    phone: '',
    address: {
      street: '',
      city: '',
      postalCode: '',
    },
    siret: '',
    website: '',
    logo: '',
  })

  return { datas }
})
