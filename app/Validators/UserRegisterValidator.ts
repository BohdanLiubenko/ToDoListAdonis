import { schema, rules } from '@ioc:Adonis/Core/Validator'

export const registerValidation = schema.create({
  username: schema.string({ trim: true }, [
    rules.required(),
    rules.maxLength(8),
    rules.regex(/^[a-zA-Z0-9]+$/),
  ]),

  email: schema.string({ trim: true }, [
    rules.required(),
    rules.email(),
    rules.maxLength(255),
    rules.regex(/^.+@.+\..+$/),
    rules.unique({ table: 'users', column: 'email' }),
  ]),

  password: schema.string({ trim: true }, [
    rules.required(),
    rules.minLength(8),
    rules.regex(/[a-z]/),
    rules.regex(/[A-Z]/),
    rules.regex(/[0-9]/g),
  ]),
})

export const registerValidationMessages = {
  'username.required': 'Enter the name of user',
  'username.maxLength': 'Username cannot exceed 8 characters',
  'username.regex': 'Username must contain only letters and numbers',

  'email.required': 'Enter your email',
  'email.maxLength': 'Email cannot exceed 255 characters',
  'email.email': 'Enter a valid email address',
  'email.unique': 'This email is already in use',

  'password.required': 'Enter your password',
  'password.minLength': 'The password must be at least 8 characters long',
  'password.regex':
    'The password must contain at least one lowercase and one uppercase letter and numbers',
}
