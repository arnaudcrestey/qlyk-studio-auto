import { z } from 'zod';

/**
 * =========================
 * CONTACT
 * =========================
 */

export const contactSchema = z.object({
  firstName: z.string().min(2, 'Prénom requis'),
  lastName: z.string().min(2, 'Nom requis'),
  email: z.string().email('Email invalide'),
  phone: z.string().optional(),
  company: z.string().optional(),
  message: z.string().min(10, 'Message trop court')
});

export type ContactInput = z.infer<typeof contactSchema>;

/**
 * =========================
 * DEPOT VEHICULE
 * =========================
 */

export const vehicleDepositSchema = z.object({
  firstName: z.string().min(2, 'Prénom requis'),
  lastName: z.string().min(2, 'Nom requis'),
  email: z.string().email('Email invalide'),
  phone: z.string().optional(),

  garageName: z.string().optional(),

  brandModel: z.string().min(2, 'Marque et modèle requis'),
  vehicleModel: z.string().optional(),

  style: z
    .enum(['exterieur', 'showroom', 'lifestyle', 'concession'])
    .optional(),

  message: z.string().optional()
});

export type VehicleDepositInput = z.infer<typeof vehicleDepositSchema>;

export const depotSchema = vehicleDepositSchema;
export type DepotInput = VehicleDepositInput;
