<script setup lang="ts">
const supabase = useSupabaseClient()

const email = ref<string>('')
const errorMessage = ref<string>('')
const emailSent = ref<boolean>(false)

const signInWithOtp = async () => {
  try {
    const { error } = await supabase.auth.signInWithOtp({
      email: email.value,
    })

    if (error) {
      throw new Error(error.message);
    }

  } catch (err: any) {
    errorMessage.value = err.message || 'Une erreur est survenue';
  }

  emailSent.value = true
}

const signInWithOAuth = async () => {
  try {
    const { error: signInError } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });

    if (signInError) {
      throw new Error(signInError.message);
    }

  } catch (err: any) {
    errorMessage.value = err.message || 'Une erreur est survenue';
  }
}

</script>

<template>
  <div class="my-40 mx-auto max-w-96 w-full space-y-6">
    <h1>Connexion</h1>

    <UFormGroup label="Email" name="email">
      <UInput v-model="email" type="email" placeholder="email@me.com" equired />
    </UFormGroup>

    <div class="mx-auto w-full border-t border-primary-800 !mt-6 pt-6">
      <UButton :label="emailSent ? 'Vérifiez votre boite mail pour continuer' : 'Connexion avec email'" block size="md"
        :disabled="!email || emailSent" @click="signInWithOtp" />
    </div>

    <p v-if="errorMessage" class="text-red-400 text-sm">{{ errorMessage }}</p>


    <div class="">
      <UButton label="Connexion avec Google" block size="md" @click="signInWithOAuth" />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
