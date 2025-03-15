export interface ResponseSchema<Data = unknown> {
  data?: Data;
  status: number;
  message: string;
}
