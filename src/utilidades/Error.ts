export class ServicoException extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;
  constructor(
    message: string,
    codigo: number = 400,
    erroOperacional: boolean = true
  ) {
    super(message);
    this.statusCode = codigo;
    this.isOperational = erroOperacional;
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this);
  }
}
