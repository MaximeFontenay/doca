import type { Project } from "@/types/projectType"

export const useProjectStore = defineStore('projectStore', () => {
  const datas: Project = reactive<Project>(createDefaultProject())

  return { datas }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useProjectStore, import.meta.hot))
}
