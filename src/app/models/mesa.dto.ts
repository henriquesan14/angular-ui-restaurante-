type status = 'DISPONIVEL' | 'OCUPADA';
export interface MesaDTO{
    id: string;
    nome: string;
    status: status;
}