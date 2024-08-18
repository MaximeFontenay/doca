<script setup lang="ts">
import type { Project } from '@/types/projectType';

const client = useSupabaseClient()
const user = useSupabaseUser()

onBeforeMount(() => {
  if (!user.value) {
    navigateTo('/login')
  }
})

const projects = ref<Project[]>([])
const clients = ref<Client[]>([])

onMounted(async () => {
  if (user.value) {
    try {
      const { data: projectsData, error: projectsError } = await client
        .from('projects')
        .select(`
          id,
          name,
          client_id,
          start_date
        `)
        .order('created_at', { ascending: false })
        .limit(5)

      if (projectsError) throw projectsError

      projects.value = projectsData

      const clientIds = projectsData.map((project: Project) => project.client_id)
      const uniqueClientIds = Array.from(new Set(clientIds))

      console.log(uniqueClientIds)

      if (uniqueClientIds.length > 0) {
        const { data: clientsData, error: clientsError } = await client
          .from('clients')
          .select(`
            id,
            name
          `)
          .in('id', uniqueClientIds) 

        if (clientsError) throw clientsError

        clients.value = clientsData
      }



    } catch (err) {
      console.error('Unable to load projects or clients:', err)
    }

    console.log('projects', projects.value)
    console.log('clients', clients.value)
  }
})

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
</script>

<template>
  <div class="w-full p-10">

    <ul class="flx-center gap-2">
      <!-- <li v-for="(client, clientIndex) in getAllClients()" :key="clientIndex">
        {{ client }}
      </li> -->
    </ul>

    <div class="">
      <h2>Dernière factures</h2>
      <div class="w-fit bg-white/5 border border-primary-800 rounded-lg">
        <UTable :columns="columns" :rows="projects" />
      </div>
    </div>
<!-- 
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
    </div> -->

    <div class="absolute bottom-4 right-2">
      <ULink to="/document/new" class="text-primary-300">
        <UButton label="Créer un document" size="xl" />
      </ULink>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
