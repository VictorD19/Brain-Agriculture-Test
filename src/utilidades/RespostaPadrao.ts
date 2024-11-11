export class RespostaPadrao {
  //#region atributos
  public Sucesso!: boolean;
  public Data!: unknown;
  public Mensagem!: unknown;
  //#endregion

  //#region Construtores
  constructor();
  constructor(data: unknown);
  constructor(status: boolean, mensagem: string);
  constructor(status: boolean, data: unknown, mensagem: string);
  constructor(data?: unknown) {
    if (typeof data === "boolean" && !arguments[1] && !arguments[2]) {
      this.Sucesso = true;
      this.Mensagem = "";
      this.Data = data;
      return;
    }

    if (typeof data === "boolean" && arguments[1] != null && arguments[2] ) {
      this.Sucesso = arguments[0];
      this.Mensagem = arguments[2];
      this.Data = arguments[1];
      return;
    }

    if (typeof data === "boolean" && arguments[1]) {
      this.Sucesso = arguments[0];
      this.Mensagem = arguments[1];
      this.Data = null;
      return;
    }

    if (typeof data === "string") {
      this.Sucesso = true;
      this.Mensagem = data;
      this.Data = null;
      return;
    }

    this.Sucesso = true;
    this.Mensagem = "";
    this.Data = data ?? null;
  }

  //#endregion
}
