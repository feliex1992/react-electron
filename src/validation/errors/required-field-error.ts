export class RequiredFieldError extends Error {
  constructor () {
    super('Kolom ini harus di isi.')
    this.name = 'RequiredFieldError'
  }
}
