export const useGlobalStore = defineStore('globalStore', () => {
  const datas = reactive({
    loaded: false,
  })

  return { datas }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useGlobalStore, import.meta.hot))
}
