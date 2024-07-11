export interface Contrat {
  id: number
  type: 'devis' | 'facture'
}

export const contractTypes: Contrat['type'][] = ['devis', 'facture']
