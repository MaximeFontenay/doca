export interface UnitType {
  unit: string
  label: string
}

export interface Prestation {
  name: string
  details: string[]

  total: string
}

export interface PrestationData {
  unitType: string
  prestations: Prestation[]
}
