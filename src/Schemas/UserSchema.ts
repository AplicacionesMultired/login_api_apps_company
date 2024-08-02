import z from 'zod';

const User = z.object({
  names: z.string({
    invalid_type_error: 'El nombre debe ser una cadena de texto',
    required_error: 'El nombre es requerido',
  }),
  lastNames: z.string({
    invalid_type_error: 'El apellido debe ser una cadena de texto',
    required_error: 'El apellido es requerido',
  }),
  document: z.number({
    invalid_type_error: 'El documento debe ser un número',
    required_error: 'El documento es requerido',
  }),
  phone: z.number({
    invalid_type_error: 'El teléfono debe ser un número',
    required_error: 'El teléfono es requerido',
  }),
  email: z.string({
    invalid_type_error: 'El correo debe ser una cadena de texto',
    required_error: 'El correo es requerido',
  }),
  company: z.number({
    invalid_type_error: 'La empresa debe ser un número',
    required_error: 'La empresa es requerida',
  }).int().min(0).max(2),
  process: z.number({
    invalid_type_error: 'El proceso debe ser un número',
    required_error: 'El proceso es requerido',
  }).int().min(0).max(12),
  rol: z.string({
    invalid_type_error: 'El rol debe ser una cadena de texto',
    required_error: 'El rol es requerido',
  }),
});

// Define el tipo inferido a partir del esquema
type UserType = z.infer<typeof User>;

// Función para validar el usuario
export function validateUser(user: UserType) {
  return User.safeParseAsync(user);
}