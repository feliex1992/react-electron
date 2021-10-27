import { AccountModel } from '@/domain/models'

export interface Authentication {
  auth: (params: Authentication.Params) => Promise<Authentication.Model>
}

export namespace Authentication {
  export type Params = {
    userId: string
    password: string
  }

  export type Model = AccountModel
}
