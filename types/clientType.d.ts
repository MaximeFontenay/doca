export interface ClientDatas {
  name: string
  email: string
  address: {
    street: string
    city: string
    postalCode: string
  }
  siren: string
  TVA: {
    number: string
    intracom: boolean
  }
}
