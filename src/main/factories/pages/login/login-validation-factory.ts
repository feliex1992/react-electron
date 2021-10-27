import { ValidationComposite, ValidationBuilder } from '@/validation/validators'

export const makeLoginValidation = (): ValidationComposite => ValidationComposite.build([
  ...ValidationBuilder.field('userName').required().min(5).build(),
  ...ValidationBuilder.field('password').required().min(5).build()
])
