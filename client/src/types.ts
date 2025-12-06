export interface User {
  id: string;
  name: string;
  email: string;
  skills?: string[];
}

export interface LoginResponse {
  message: string;
  token: string;
  user: User;
}
