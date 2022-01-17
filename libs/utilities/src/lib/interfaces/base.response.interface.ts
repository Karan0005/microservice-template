export interface IBaseResponse {
  isSuccess: boolean;
  message: string;
  data: unknown;
  errors: unknown[];
}
