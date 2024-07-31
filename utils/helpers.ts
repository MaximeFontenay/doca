export const filterNonNumeric = (event: Event) => {
  const input = event.target as HTMLInputElement
  input.value = input.value.replace(/\D/g, '')
}

export const saveToLocalStorage = (storeName: string, data: object) => {
  localStorage.setItem(storeName, JSON.stringify(data))
  console.log('save')
}

const client = useSupabaseClient()
export const logout = async () => {
  await client.auth.signOut()
  navigateTo('/')
}
