export interface CredenciaisDTO {
    email: string;
    senha: string;
}

export interface AuthResponse {
    token: string;
}

export interface EmailDTO {
    email: string;
}

export class UsuarioDTO {
    codigo?: string;
    nome: string;
    email: string;
    senha: string;
}

export interface DashboardDTO {
    codigo: string;
    mes: string;
    ano: string;
    salario: string;
    qtdConta: string;
    totalGastos: string;
    saldoFinal: string;
}

export interface LocalUser {
    token: string;
    email?: string;
}

export interface FieldMessage {
    fieldName: string;
    message: string;
}

export interface ContaDTO {
    codigo?: string;
    valorConta: string;
    dataVencimento: string;
    dataPagamento?: string;
    status: StatusContaDTO;
    qtdParcelas?: string;
    comentario?: string;
    tipoConta: TipoContaDTO;
    mes: MesDTO;
}

export interface MesSalarioDTO {
    codigo?: string;
    valorSalario?: string;
    mes: MesDTO;
}

export interface TipoContaDTO {
    codigo: string;
    tipo?: string;
    descricao?: string;
}

export interface MesDTO {
    codigo?: string;
    dsMes?: string;
}

export interface StatusContaDTO {
    codigo: string;
    descricao?: string;
}