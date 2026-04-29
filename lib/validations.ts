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

  garageName: z.string().min(2, 'Nom du garage requis'),
  vehicleModel: z.string().min(2, 'Modèle du véhicule requis'),

  style: z
    .enum(['exterieur', 'showroom', 'lifestyle', 'concession'])
    .optional(),

  message: z.string().optional()
});

export type VehicleDepositInput = z.infer<typeof vehicleDepositSchema>;

/**
 * Alias possible si une autre partie du projet utilise encore depotSchema
 */
export const depotSchema = vehicleDepositSchema;
export type DepotInput = VehicleDepositInput;
export function validateDepot(data: unknown) {
  const result = depotSchema.safeParse(data);

  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors
    };
  }

  return {
    success: true,
    data: result.data
  };
}

export function validateContact(data: unknown) {
  const result = contactSchema.safeParse(data);

  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors
    };
  }

  return {
    success: true,
    data: result.data
  };
}
