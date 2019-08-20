export declare interface Mpesa {
  apiToken: any
  authCredentialString?: any
  accessToken: any
  baseURL: any
  requestError: any
  Http: Record<string, any> | null
}

export declare interface HTTPService {
  baseURL: string
  generatedUrl: string
  config: Record<string, any> | null
  requestError: any
}

export declare interface MpesaLNMPayload {
  BusinessShortCode: string
  Password: string
  Timestamp: string
  TransactionType: string
  Amount: string
  PartyA: string
  PartyB: string
  PhoneNumber: string
  CallBackURL: string
  AccountReference: string
  TransactionDesc: string
}
