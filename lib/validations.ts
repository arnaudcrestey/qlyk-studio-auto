import { z } from 'zod';

const email = z.string().email('Email invalide');
const phone = z
  .string()
  .min(8, 'Téléphone trop court')
  .max(20, 'Téléphone trop long');

export const contactSchema = z.object({
  firstName: z.string().min(2, 'Prénom requis'),
  lastName: z.string().min(2, 'Nom requis'),
  email,
  phone,
  company: z.string().min(2, 'Société requise'),
  message: z.string().min(10, 'Message trop court')
});

export const vehicleDepositSchema = z.object({
  firstName: z.string().min(2, 'Prénom requis'),
  lastName: z.string().min(2, 'Nom requis'),
  email,
  phone,
  dealership: z.string().min(2, 'Concession requise'),
  vehicleType: z.string().min(2, 'Type de véhicule requis'),
  brandModel: z.string().min(2, 'Marque / modèle requis'),
  year: z.string().regex(/^\d{4}$/, 'Année invalide'),
  objective: z.string().min(6, 'Objectif requis'),
  requestedStyle: z.string().min(2, 'Style requis'),
  message: z.string().min(10, 'Message trop court'),
  photosLink: z.string().url('Lien photos invalide')
});

export type ContactValues = z.infer<typeof contactSchema>;
export type VehicleDepositValues = z.infer<typeof vehicleDepositSchema>;
