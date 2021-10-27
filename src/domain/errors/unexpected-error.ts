export class UnexpectedError extends Error {
  constructor () {
    super('Proses gagal! Coba ulangi kembali beberapa saat lagi.')
    this.name = 'UnexpectedError'
  }
}
