import { Injectable } from '@angular/core';

import { FileData } from './file.data';

@Injectable()
export class FileService {

  private fileData: FileData;

  constructor() { }

  public setFile(file: FileData) {
    this.fileData = file;
  }

  public getMetaData() {
    return this.fileData.metaData;
  }

  public getExpenses() {
    return this.fileData.data.expenses;
  }

  public getExpense(id: number) {
    return this.fileData.data.expenses.find(expense => expense.id === id);
  }

  public getCategories() {
    return this.fileData.data.categories;
  }

  public getCategory(id: number) {
    return this.fileData.data.categories.find(category => category.id === id);
  }

  public getLabels() {
    return this.fileData.data.labels;
  }

  public getLabel(id: number) {
    return this.fileData.data.labels.find(label => label.id === id);
  }

  public getTags() {
    return this.fileData.data.tags;
  }

  public getTag(id: number) {
    return this.fileData.data.tags.find(tag => tag.id === id);
  }

}
