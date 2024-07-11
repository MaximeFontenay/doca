export interface UserInformations {
  name: string
  firstname: string
  email: string
  phone: number | null
  address: {
    street: string
    city: string
    postalCode: number | null
  }
  siret: number | null
  website: string
  logo: string
}
