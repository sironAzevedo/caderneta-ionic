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