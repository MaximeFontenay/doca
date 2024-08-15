export interface Project {
  id: number
  name: string
  client: string
  amount: number
  quoteStatus: 'pending' | 'sent' | 'signed'
  invoiceStatus: 'pending' | 'sent' | 'paid'
  startDate: string // Format YYYY-MM-DD
  endDate: string // Format YYYY-MM-DD
}
