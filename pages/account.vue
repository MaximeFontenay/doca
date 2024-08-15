<script lang="ts" setup>
const client = useSupabaseClient()
const user = useSupabaseUser()

const signOut = async () => {
  const { error } = await client.auth.signOut()
  if (error) {
    console.error('Error logging out:', error.message)
  }
  navigateTo('/login')
}

onBeforeMount(() => {
  if (!user.value) {
    navigateTo('/login')
  }
})

</script>

<template>
  <div class="flex flex-col justify-center items-stretch h-svh w-full relative">
    <div v-if="user"
      class="flex flex-col gap-4 p-4 max-w-[300px] min-w-fit w-full mx-auto border border-primary-800/80 rounded-md">
      <div class="min-w-14 size-14 rounded-full overflow-clip mx-auto">
        <img :src="user.user_metadata.picture" alt="profile picture" class="size-full object-cover" draggable="false">
      </div>
      <ul>
        <li>
          <span class="text-primary-300 pr-2 font-semibold">Nom :</span>{{ user.user_metadata.name }}
        </li>
        <li>
          <span class="text-primary-300 pr-2 font-semibold">Email :</span>{{ user.user_metadata.email }}
        </li>
      </ul>
      <UButton label="Déconnexion" @click="signOut" block />
    </div>
  </div>
</template>

<style lang="scss"></style>
