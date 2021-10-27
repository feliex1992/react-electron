export class InvalidCredentialsError extends Error {
  constructor () {
    super('Kredensial tidak valid.')
    this.name = 'InvalidCredentialsError'
  }
}
