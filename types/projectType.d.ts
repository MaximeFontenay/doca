export interface Project {
  id: number;
  name: string; // Nom du projet client (ex: Landing page)
  client: Client; // Relation vers le client
  documents?: ProjectDocument[]; // Liste des documents liés au projet
  description?: string; // Description optionnelle du projet
  startDate: string; // Format YYYY-MM-DD
  endDate: string; // Format YYYY-MM-DD
  createdAt: string; // Date de création du projet
  updatedAt: string; // Date de dernière mise à jour du projet
}

export interface ProjectDocument {
  id: number;
  name: string; // Nom du document (ex: Facture n°20240001)
  amount: number; // Total HT du document
  services: Service[]; // Liste des tâches sur le document
  type: 'quote' | 'invoice' | 'contract' | 'other'; // Type de document
  status: 'pending' | 'sent' | 'signed' | 'rejected' | 'paid' | 'overdue' | 'canceled'; // Statut du document
  currency: string; // Devise du montant (ex: EUR, USD)
  url: string; // URL du document
  createdAt: string; // Date de création du projet 
  uploadedAt: string; // Date de téléchargement
}

export interface Service {
  id: number;
  title: string; // Nom de la tâche
  price: number; // Prix à l'unité
  quantity: number; // Quantité 
  description?: string[]; // Description optionnelle de la tâche en bullet points
  status: 'todo' | 'in-progress' | 'completed';  // Pour le suivi de l'avancement
  dueDate?: string; // Date d'échéance, optionnelle
}
