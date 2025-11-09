export interface Note {
    patientUuid: string,
    doctorId: string,
    createdAt: string,
    updatedAt?: string | null,
    content: string,
    id: string
}

export interface MinimalNote {
    id: string,
    patientUuid: string,
    doctorId: string,
    createdAt: string,
    updatedAt?: string,
}

export interface UpdateNote {
    content: string
}