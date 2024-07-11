export const filterNonNumeric = (event: Event) => {
  const input = event.target as HTMLInputElement
  input.value = input.value.replace(/\D/g, '')
}
