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
    siren: '',
    website: '',
    logo: '',
  })

  return { datas }
})
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
