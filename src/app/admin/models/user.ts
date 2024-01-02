export interface UserLoginResponse {
  data: UserResponse,
  token: string
}

export interface UserResponse {
  id: number,
  name: string,
  last_name: string,
  username: string,
  type: EUserType,
  gender: EUserGender,
  birthdate: string,
  contact_information: ContactInformation
}

export interface ContactInformation {
  email: string,
  phone_number: string,
  address: string
}

export interface UserLoginRequest {
  username: string,
  password: string
}

export enum EUserGender {
  male = 'male',
  female = 'female'
}

export enum EUserType {
  admin = 'admin',
  customer = 'customer'
}
