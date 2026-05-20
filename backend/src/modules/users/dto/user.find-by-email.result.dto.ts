export interface UserFindByEmailResultDTO {
  id: string;
  login: string | null;
  email: string;
  passwordHash: string | null;
}
