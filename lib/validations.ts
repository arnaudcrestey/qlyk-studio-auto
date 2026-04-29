import { z } from 'zod';

/**
 * =========================
 * DEPOT VEHICULE (Qlyk)
 * =========================
 */

export const depotSchema = z.object({
  firstName: z
    .string()
    .min(2, 'Prénom requis')
    .max(50),

  lastName: z
    .string()
    .min(2, 'Nom requis')
    .max(50),

  email: z
    .string()
    .email('Email invalide'),

  phone: z
    .string()
    .optional(),

  garageName: z
    .string()
    .min(2, 'Nom du garage requis')
    .max(100),

  vehicleModel: z
    .string()
    .min(2, 'Modèle requis')
    .max(100),

  style: z.enum(['exterieur', 'showroom', 'lifestyle'], {
    errorMap: () => ({ message: 'Style invalide' })
  }),

  message: z
    .string()
    .max(500)
    .optional()
});

/**
 * Type TypeScript auto généré
 */
export type DepotInput = z.infer<typeof depotSchema>;

/**
 * =========================
 * CONTACT (SITE)
 * =========================
 */

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, 'Nom requis')
    .max(100),

  email: z
    .string()
    .email('Email invalide'),

  subject: z
    .string()
    .min(3, 'Sujet requis')
    .max(150),

  message: z
    .string()
    .min(10, 'Message trop court')
    .max(1000)
});

export type ContactInput = z.infer<typeof contactSchema>;

/**
 * =========================
 * HELPER VALIDATION
 * =========================
 */

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
