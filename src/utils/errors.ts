export class APIError extends Error {
  public status: number;
  public message: string;

  constructor(message: string, status: number) {
    super(message);
    this.status = status || 500;
    this.message = message;
  }
}

export const NOT_FOUND = () => {
  return new APIError('Not Found', 404);
};
export const UNPROCESSABLE_ENTITY = (message: string) => {
  return new APIError(message, 422);
};
export const FORBIDDEN = () => {
  return new APIError('Forbidden', 403);
};
