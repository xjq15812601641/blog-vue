export interface GetListModel<T> {
  current: number;
  total: number;
  records: Array<T>;
}

export interface commonSuccessModel {
  message: string;
}
