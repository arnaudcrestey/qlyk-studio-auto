import { z } from 'zod';

/**
 * CONTACT
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
 * DEPOT VEHICULE
 */
export const vehicleDepositSchema = z.object({
  firstName: z.string().min(2, 'Prénom requis'),
  lastName: z.string().min(2, 'Nom requis'),
  email: z.string().email('Email invalide'),
  phone: z.string().optional(),

  dealership: z.string().optional(),
  garageName: z.string().optional(),
  company: z.string().optional(),

  vehicleType: z.string().optional(),
  brandModel: z.string().min(2, 'Marque / modèle requis'),
  vehicleModel: z.string().optional(),
  year: z.string().optional(),

  objective: z.string().optional(),
  requestedStyle: z.string().optional(),
  photosLink: z.string().optional(),

  uploadedFiles: z
    .array(
      z.object({
        name: z.string(),
        url: z.string().url(),
        size: z.number().optional()
      })
    )
    .optional(),

  style: z
    .enum(['exterieur', 'showroom', 'lifestyle', 'concession'])
    .optional(),

  message: z.string().optional()
});

export type VehicleDepositInput = z.infer<typeof vehicleDepositSchema>;

/**
 * ALIAS DE COMPATIBILITÉ
 */
export const depotSchema = vehicleDepositSchema;
export type DepotInput = VehicleDepositInput;
