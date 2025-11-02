export interface Patient {
    uuid: string,
    lastName: string,
    firstName: string,
    birthDate: string,
    gender: string,
    address?: Address,
    phone?: string
}

export interface MinimalPatient {
    uuid: string,
    firstName: string,
    lastName: string,
    birthDate: string,
    gender: string
}

export interface UpdatePatient {
    lastName: string,
    firstName: string,
    gender: string,
    address?: Address,
    phone?: string
}

export interface Address {
    streetNumber: string,
    street: string,
    city: string,
    zip: string
}