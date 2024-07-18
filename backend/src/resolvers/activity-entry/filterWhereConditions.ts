import { FindOperator } from 'typeorm';

export interface FilterWhereConditions {
  name?: FindOperator<string>;
  spendedAt?: FindOperator<Date>;
  user: {
    id: string;
  };
  category?: {
    id: FindOperator<number>;
  };
}
