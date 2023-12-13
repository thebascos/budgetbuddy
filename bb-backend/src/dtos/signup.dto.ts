export interface SignUpDTO {
  email: string;
  password: string;
  name: string;
}

export interface GmailSignUpDTO {
  name: string;
  email: string;
  password: string;
  credential?: string;
  g_csrf_token?: string;
}
