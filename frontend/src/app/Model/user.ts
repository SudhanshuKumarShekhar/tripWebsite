export interface UserForRegister {
  UserName: string;
  Email?: string;
  Password: string;
  Mobile: number;
  Type:string;
  Token:string;
}

export interface UserForLogin {
  id:number;
  userName: string;
  email?: string;
  password: string;
  mobile?: number;
  type:string;
  token:string;
}
