export interface IRepositorioBase<T> {
  Inserir(item: Partial<T>): Promise<T>;
  BuscarPorCodigo(codigo: number): Promise<T | null>;
  BuscarPorCodigos(codigos: number[]): Promise<T[]>;
  BuscarTodos(): Promise<T[]>;
  Deletar(id: number): Promise<number | null>;
  Atualizar(id: number, item: Partial<T>): Promise<[number, T[]]>;
  ContarTodos(): Promise<number>;
  BuscarPrimerRegistro(): Promise<T | null>;
}
