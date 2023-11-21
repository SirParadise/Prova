import { Categoria } from "./categoria.model";

export interface Produto {
  status: string;
  tarefaId?: number;
  titulo: string;
  descricao: string;
  criadoEm?: string;
  categoriaId: number;
  categoria?: Categoria;
}