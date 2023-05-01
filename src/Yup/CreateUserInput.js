import * as Yup from 'yup'

export const Validation = Yup.object({
  userId: Yup.string()
      .required("What's your ID?")
      .matches(/^[aA-zZ]+$/, 'Numbers and special characters are not allowed.'),
      name: Yup.string()
      .required("What's your name?")
      .matches(/^[aA-zZ]+$/, 'Numbers and special characters are not allowed.')
      .min(2, 'name must be between 2 and 16 characters.')
      .max(16, 'name must be between 2 and 16 characters.'),
  })