export interface Doctor {
  id: string;
  name: string;
  university: string;
  professionalId: string;
  specialty?: string;
  specialtyId?: string;
  phone: string;
  email: string;
  signatureUrl?: string;
  type: "in-house" | "external";
  avatarUrl?: string;
}

export interface ClinicInfo {
  logoUrl?: string;
  name: string;
  address: string;
  phone: string;
  email: string;
}
