import { type PrestationData, type UnitType } from 'types/prestationType'

export const usePrestationStore = defineStore('prestationStore', () => {
  const unitTypes: UnitType[] = [
    { unit: 'any', label: 'Quantité' },
    { unit: 'hour', label: 'Heures' },
    { unit: 'day', label: 'Jours' },
    { unit: 'week', label: 'Semaines' },
    { unit: 'month', label: 'Mois' },
  ]

  const datas: PrestationData = reactive<PrestationData>({
    unitType: 'day',
    prestations: [
      {
        name: '',
        details: [],
        price: '',
        quantity: '',
        total: '',
      },
    ],
  })

  const getUnitLabel = () => {
    const unitObj = unitTypes.find((u) => u.unit === datas.unitType)
    return unitObj?.label
  }

  const addPrestation = () => {
    datas.prestations.push({
      name: `Prestation ${datas.prestations.length + 1}`,
      details: [],
      price: '',
      quantity: '1',
      total: '',
    })
  }

  const removePrestation = (index: number) => {
    datas.prestations.splice(index, 1)
  }

  const addDetail = (index: number) => {
    datas.prestations[index].details.push('')
  }

  const removeDetail = (index: number, detailIndex: number) => {
    datas.prestations[index].details.splice(detailIndex, 1)
  }

  const getTotal = (): number => {
    return datas.prestations.reduce((total, prestation) => {
      const price = parseFloat(prestation.price) || 0
      const quantity = parseFloat(prestation.quantity) || 0
      return total + price * quantity
    }, 0)
  }

  return {
    datas,
    unitTypes,
    getUnitLabel,
    addPrestation,
    removePrestation,
    addDetail,
    removeDetail,
    getTotal,
  }
})
