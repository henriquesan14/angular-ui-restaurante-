type tipo = 'REFEICAO' | 'BEBIDA' | 'SOBREMESA';
export interface CategoriaDTO {
    id: string;
    nome: string;
    tipoCategoria: tipo ;
}