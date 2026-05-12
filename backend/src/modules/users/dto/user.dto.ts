
export interface UserDTO {
    id: string;
    login: string;
    email: string;
    passwordHash: string;
    createdAt: Date;
    updatedAt: Date;
}
