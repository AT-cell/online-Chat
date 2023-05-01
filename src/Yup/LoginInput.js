import * as Yup from 'yup'

export const Validation = Yup.object({
  userId: Yup.string()
      .required("What's your ID?")
      .matches(/^[aA-zZ]+$/, 'Numbers and special characters are not allowed.')
  })