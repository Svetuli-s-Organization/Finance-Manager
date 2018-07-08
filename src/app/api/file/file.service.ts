import { Injectable } from '@angular/core';

import { FileData } from './file.data';

@Injectable()
export class FileService {

  private fileData: FileData;

  constructor() { }

  public setFile(file: FileData) {
    this.fileData = file;
  }

}
