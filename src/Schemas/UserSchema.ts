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
  }).refine((value) => value.includes('@'), {
    message: 'El correo debe contener un @',
  }),
  company: z.number({
    invalid_type_error: 'La compañía debe ser un número',
    required_error: 'La compañía es requerida',
  }).int().min(0).max(2),
  process: z.number({
    invalid_type_error: 'El proceso debe ser un número',
    required_error: 'El proceso es requerido',
  }).int().min(0).max(12),
  sub_process: z.number({
    invalid_type_error: 'El sub proceso debe ser un número',
    required_error: 'El sub proceso es requerido',
  }).int().min(0).max(30)
});

const UserLogin = z.object({
  username: z.string({
    invalid_type_error: 'El nombre de usuario debe ser una cadena de texto',
    required_error: 'El nombre de usuario es requerido',
  }),
  password: z.string({
    invalid_type_error: 'La contraseña debe ser una cadena de texto',
    required_error: 'La contraseña es requerida',
  }),
  app: z.string({
    invalid_type_error: 'La aplicación debe ser una cadena de texto',
    required_error: 'La aplicación es requerida',
  })
})


export type UserType = z.infer<typeof User>;
export type UserLoginType = z.infer<typeof UserLogin>;

export function validateUser(user: UserType) {
  return User.safeParseAsync(user);
}

export function validateUserLogin(user: UserLoginType) {
  return UserLogin.safeParseAsync(user);
}