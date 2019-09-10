export interface DashboardDTO {
    codigo: string;
    mes: string;
    ano: string;
    salario: string;
    qtdConta: string;
    totalGastos: string;
    saldoFinal: string;
}

export interface TipoContaDTO {
    codigo: string;
    tipo: string;
    descricao: string;
}

export interface LocalUser {
    token: string;
    email: string;
}

export interface FieldMessage {
    fieldName: string;
    message: string;
}