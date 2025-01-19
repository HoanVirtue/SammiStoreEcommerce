export interface IQueryResultsModel
{
  errors: GenericError[];
  isSuccess: boolean;
  message: string;
}

export class QueryResultsModel<T> implements IQueryResultsModel
{
  errors: GenericError[];
  isSuccess: boolean;
  message: string;
  result: T;
}

export class GenericError {
  errorMessage: string;
  memberName: string;
}
