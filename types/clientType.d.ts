export interface Client {
  id: number;
  name: string; // Nom de l'entreprise
  email: string; // Email de contact principal
  address: Address; // Adresse de l'entreprise
  siren: string; // Numéro SIREN de l'entreprise
  TVA: TVAInfo; // Informations sur la TVA
  contacts?: ClientContact[]; // Liste de contacts associés à ce client
  projects?: Project[]; // Projets associés à ce client
  createdAt: string; // Date de création du client
  updatedAt: string; // Date de dernière mise à jour du client
}
export interface Address {
  street: string; // Rue de l'entreprise
  city: string; // Ville de l'entreprise
  postalCode: string; // Code postal de l'entreprise
  country: string; // Pays de l'entreprise
}

export interface TVAInfo {
  number: string; // Numéro de TVA
  intracom: boolean; // Assujetti à la TVA intracommunautaire ?
  rate?: number; // Taux de TVA applicable
}

export interface ClientContact {
  name: string; // Nom du contact
  email: string; // Email du contact
  phone: string; // Numéro de téléphone du contact
  position?: string; // Position du contact dans l'entreprise, optionnel
}