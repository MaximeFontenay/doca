<script setup lang="ts">
const client = useSupabaseClient()
const user = useSupabaseUser()

const email = ref<string>('')
const errorMessage = ref<string>('')
const emailSent = ref<boolean>(false)
const loading = ref<boolean>(false)

const signInWithOtp = async () => {
  console.log('signInWithOtp');
  loading.value = true;

  try {
    const { error } = await client.auth.signInWithOtp({
      email: email.value,
    })
    if (error?.status === 429) {
      errorMessage.value = 'Trop de demandes. Veuillez attendre avant de réessayer.';
    } else if (error) {
      errorMessage.value = error.message || 'Une erreur est survenue';
    } else {
      emailSent.value = true;
    }
  }
  catch (error: any) {
    errorMessage.value = error.message || 'Une erreur est survenue';
  }
  finally {
    loading.value = false;

    setTimeout(() => {
      errorMessage.value = '';
    }, 3000);
  }
}

const signInWithOAuth = async () => {
  console.log('signInWithOAuth');

  try {
    const { error: signInError } = await client.auth.signInWithOAuth({
      provider: 'google',
    });

    if (signInError) {
      throw new Error(signInError.message);
    }

  } catch (err: any) {
    errorMessage.value = err.message || 'Une erreur est survenue';
  }
}

watchEffect(() => {
  if (user.value) {
    navigateTo('/dashboard');
  }
});

</script>

<template>
  <div class="my-40 mx-auto max-w-96 w-full space-y-6">
    <h1>Connexion</h1>

    <UFormGroup label="Email" name="email">
      <UInput v-model="email" type="email" placeholder="email@me.com" required variant="outline" />
    </UFormGroup>

    <div class="mx-auto w-full border-t border-primary-800 !mt-6 pt-6">
      <UButton :label="emailSent ? 'Vérifiez votre boite mail pour continuer' : 'Connexion avec email'" block size="md"
        :loading="loading" :disabled="!email || emailSent" @click="signInWithOtp" />
    </div>

    <p v-if="errorMessage" class="text-red-400 text-sm">{{ errorMessage }}</p>


    <div class="">
      <UButton label="Connexion avec Google" block size="md" @click="signInWithOAuth" />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
