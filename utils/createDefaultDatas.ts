import type { Client } from "@/types/clientType";
import type { Project } from "@/types/projectType";

export function createDefaultClient(): Client {
  return {
    id: 0,
    name: '',
    email: '',
    address: {
      street: '',
      city: '',
      postalCode: '',
      country: '',
    },
    siren: '',
    TVA: {
      number: '',
      intracom: false,
      rate: 0,
    },
    contacts: [],
    projects: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

export function createDefaultProject(): Project {
  return {
    id: 0,
    name: '',
    client: createDefaultClient(),
    documents: [],
    description: '',
    startDate: new Date().toISOString(),
    endDate: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}