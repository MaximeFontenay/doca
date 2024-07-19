import appConfig from '@/app.config';

export const useContractStore = defineStore('contractStore', () => {
  const datas = reactive({
    type: '',
    date: new Date(),
    number: '',
    color: appConfig.ui.primary,
  })

  return { datas }
})
