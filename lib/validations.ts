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
 * DEPOT VEHICULE (COMPLET)
 * =========================
 */

export const vehicleDepositSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),

  // Garage
  dealership: z.string().optional(),

  // Véhicule
  vehicleType: z.string().optional(),
  brandModel: z.string().min(2),
  year: z.string().optional(),

  // Style
  style: z
    .enum(['exterieur', 'showroom', 'lifestyle', 'concession'])
    .optional(),

  message: z.string().optional()
});

export type VehicleDepositInput = z.infer<typeof vehicleDepositSchema>;

/**
 * Alias sécurité
 */
export const depotSchema = vehicleDepositSchema;
export type DepotInput = VehicleDepositInput;
