<script setup lang="ts">
const client = useSupabaseClient()
const user = useSupabaseUser()

const projects = ref<Project[]>([])

onMounted(async () => {
  if (user.value) {
    try {
      const { data, error } = await client
        .from('projects')
        .select(`
          id,
          name,
          amount,
          end_date,
          invoice_status,
          client:clients (
            name
          )
        `)
        .order('created_at', { ascending: false })
        .limit(5)

      if (error) throw error

      projects.value = data.map((project: any) => ({
        ...project,
        client: project.client.name, // Correctement assigner le nom du client
        endDate: project.end_date, // Utiliser le nom correct de la colonne
        invoiceStatus: project.invoice_status
      })) as Project[]
    } catch (err) {
      console.error('Unable to load projects:', err)
    }
  }
})

onBeforeMount(() => {
  if (!user.value) {
    navigateTo('/login')
  }
})

const getAllClients = () => {
  const clients = projects.value.map((project: Project) => project.client);
  return Array.from(new Set(clients));
};

const columns = [
  {
    key: 'client',
    label: 'Client',
    sortable: true
  }, {
    key: 'name',
    label: 'Projet',
    sortable: true
  }, {
    key: 'amount',
    label: 'Montant',
    sortable: true,
    direction: 'desc' as const
  }, {
    key: 'endDate',
    label: 'Date'
  },
  {
    key: 'invoiceStatus',
    label: 'Statut'
  },
]

const calculateMonthlyStats = async () => {
  const { data, error } = await client
    .from('projects')
    .select('amount, created_at')
    .gte('created_at', new Date(new Date().getFullYear(), 0, 1).toISOString())

  if (error) {
    console.error('Error fetching project data:', error)
    return []
  }

  const months = ['jan', 'fév', 'mars', 'avr', 'mai', 'juin', 'juil', 'août', 'sept', 'oct', 'nov', 'dec']
  const monthlyStats = months.map(month => ({ month, ca: 0, value: 0 }))

  data.forEach(project => {
    const month = new Date(project.created_at).getMonth()
    monthlyStats[month].ca += project.amount
  })

  const maxCA = Math.max(...monthlyStats.map(stat => stat.ca))
  monthlyStats.forEach(stat => {
    stat.value = maxCA > 0 ? (stat.ca / maxCA) * 100 : 0
  })

  return monthlyStats
}

const stats = ref([])

onMounted(async () => {
  try {
    stats.value = await calculateMonthlyStats()
  } catch (error) {
    console.error('Error calculating monthly stats:', error)
  }
})

</script>

<template>
  <div class="w-full p-10">

    <ul class="flx-center gap-2">
      <li v-for="(client, clientIndex) in getAllClients()" :key="clientIndex">
        {{ client }}
      </li>
    </ul>

    <div class="">
      <h2>Dernière factures</h2>
      <div class="w-fit bg-white/5 border border-primary-800 rounded-lg">
        <UTable :columns="columns" :rows="projects" />
      </div>
    </div>

    <div class="w-fit">
      <div class="bg-dark-100 rounded-lg px-4 py-3 w-fit relative z-10 shadow-lg shadow-dark-200">
        <h2 class="text-primary-300 mb-8">Statistiques</h2>
        <div class="grid grid-cols-12 gap-1 h-[200px] w-fit">
          <div v-for="(stat, statIndex) in stats" :key="statIndex"
            class="flex flex-col justify-end items-center gap-0.5 h-full group ">
            <div class="bg-white/10 grow w-1.5 rounded-t-full duration-200 relative group-hover:bg-white"
              :style="{ maxHeight: `calc(${stat.value}% + 5px)`}">
              <p :style="{ bottom: `calc( ${stat.value}%)` }"
              class="absolute pointer-events-none -translate-y-1/3 left-1/2 -translate-x-1/2 text-primary-300 opacity-0 duration-200 z-10 py-1 px-2 bg-dark-200 rounded group-hover:opacity-100">
              {{ stat.ca }}<span class="text-xxs font-medium">&nbsp;€</span>
              </p>
            </div>
            <h3 class="text-primary-300/70 duration-200 cursor-default group-hover:text-primary-300">{{ stat.month }}
            </h3>
          </div>
        </div>
      </div>
      <div class="bg-dark-100 rounded-lg px-4 pb-3 pt-12 w-fit -translate-y-8 ml-auto">
        <p><span class="text-sm">Total :</span> <span class="text-primary-300 font-bold">{{ stats.reduce((sum, stat) =>
          sum + stat.ca, 0).toFixed(2) }}<span class="text-xs font-medium">&nbsp;€</span></span></p>
      </div>
    </div>

    <div class="absolute bottom-4 right-2">
      <ULink to="/document/new" class="text-primary-300">
        <UButton label="Créer un document" size="xl" />
      </ULink>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
