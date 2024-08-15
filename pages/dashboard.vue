<script setup lang="ts">

const client = useSupabaseClient()
const user = useSupabaseUser()

const projects = ref<Project[]>([])
onMounted(async () => {
  try {
    const response = await fetch('data/projects.json')
    if (!response.ok) {
      throw new Error('Failed to fetch')
    }
    const data = await response.json()
    projects.value = data.projects
  } catch (err) {
    console.error('Unable to load projects:', err)
  }
})

onBeforeMount(() => {
  if (!user.value) {
    navigateTo('/login')
  }
})

</script>

<template>
  <div class="w-full">
    <ul>
      <li v-for="project in projects" :key="project.id">
        {{ project.name }} - {{ project.client }} - {{ project.amount }} - {{ project.quoteStatus }} - {{
          project.invoiceStatus }} - {{ project.startDate }} - {{ project.endDate }}
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped></style>