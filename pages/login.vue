<script setup lang="ts">
import type { FormSubmitEvent } from '#ui/types';
import { object, string, type InferType } from 'yup';

const schema = object({
  email: string().email('Email est invalide').required('Champs requis'),
  password: string()
    .min(8, 'Le mot de passe doit faire un minimum de 8 caractères')
    .required('Champs requis')
})

type Schema = InferType<typeof schema>

const user = reactive({
  email: undefined,
  password: undefined
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  // Do something with event.data
  console.log(event.data)
}
</script>

<template>
  <div class="my-40 mx-auto max-w-96 w-full space-y-6">
    <h1>Connexion</h1>
    <UForm :schema="schema" :user="user" class="w-full space-y-4" @submit="onSubmit">
      <UFormGroup label="Email" name="email">
        <UInput v-model="user.email" />
      </UFormGroup>

      <UFormGroup label="Mot de passe" name="password">
        <UInput v-model="user.password" type="password" />
      </UFormGroup>

      <div class="mx-auto w-full border-t border-primary-800 !mt-6 pt-6">
        <UButton label="Connexion" block size="md" />
      </div>
    </UForm>
  </div>

</template>
