import { Expense } from './expense';
import { Category } from './category';
import { Label } from './label';
import { Tag } from './tag';

export interface Data {
  expenses: Expense[];
  categories: Category[];
  labels: Label[];
  tags: Tag[];
}
