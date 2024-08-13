<script setup>
const projets = ref([])

onMounted(async () => {
  try {
    const response = await fetch('static/projects.json')
    if (!response.ok) {
      throw new Error('Failed to fetch')
    }
    const data = await response.json()
    projets.value = data.projets
  } catch (err) {
    console.error('Unable to load projects:', err)
  }
})
</script>

<template>
  <div>
    <ul>
      <li v-for="projet in projets" :key="projet.id">
        {{ projet.nom }} - {{ projet.client }} - {{ projet.montant }} - {{ projet.statusDuDevis }} - {{
        projet.statutDeLaFacture }}
      </li>
    </ul>
  </div>
</template>


<style scoped></style>
