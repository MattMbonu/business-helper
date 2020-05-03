class HttpError extends Error {
  constructor(message: string, errorCode?: number) {
    super(message); //Adds default message property
    this.code = errorCode;
  }
  code: number | undefined;
}

export default HttpError;
