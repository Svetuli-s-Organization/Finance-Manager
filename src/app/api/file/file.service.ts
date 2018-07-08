import { Injectable } from '@angular/core';

import { FileData } from './file.data';
import { MetaData } from './meta.data';
import { Expense } from './expense';
import { Category } from './category';
import { Label } from './label';
import { Tag } from './tag';

@Injectable()
export class FileService {

  private fileData: FileData;
  private lastId: number = 0;

  constructor() { }

  public setFile(file: FileData) {
    this.fileData = file;
  }

  public getMetaData(): MetaData {
    return this.fileData.metaData;
  }

  public getExpenses(): Expense[] {
    return this.fileData.data.expenses;
  }

  public getExpense(id: number): Expense {
    return this.fileData.data.expenses.find(expense => expense.id === id);
  }

  public getCategories(): Category[] {
    return this.fileData.data.categories;
  }

  public getCategory(id: number): Category {
    return this.fileData.data.categories.find(category => category.id === id);
  }

  public getLabels(): Label[] {
    return this.fileData.data.labels;
  }

  public getLabel(id: number): Label {
    return this.fileData.data.labels.find(label => label.id === id);
  }

  public getTags(): Tag[] {
    return this.fileData.data.tags;
  }

  public getTag(id: number): Tag {
    return this.fileData.data.tags.find(tag => tag.id === id);
  }

  public getId(): number {
    this.fileData.metaData.lastId = ++this.lastId;
    return this.lastId;
  }

}
