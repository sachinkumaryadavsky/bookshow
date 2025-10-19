export interface SignupData{
  name: string;
  email: string;
  password: string;
  phone?: string;
}

export interface SigninData{
  email: string;
  password: string;
}
