export interface ClientDatas {
  name: string
  email: string
  address: {
    street: string
    city: string
    postalCode: string
  }
  siret: number | null
  TVA: {
    number: string
    intracom: boolean
  }
}
