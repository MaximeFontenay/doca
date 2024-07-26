export interface UnitType {
  unit: string
  label: string
}

export interface Prestation {
  name: string
  details: string[]
  price: string
  quantity: string
  total: string
}

export interface PrestationData {
  unitType: string
  prestations: Prestation[]
}
