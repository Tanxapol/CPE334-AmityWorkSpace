export type Token = {
    role: string
    firstname: string
    lastname: string
    email: string
} | null

export interface TokenData {
    role: string
    firstname: string
    lastname: string
    email: string
}