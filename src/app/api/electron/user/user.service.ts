import { Injectable } from '@angular/core';

import { ElectronService } from 'ngx-electron';

@Injectable()
export class UserService {

  private _userPreferences: object;
  private _userMetaData: object;

  constructor(private electronService: ElectronService) {
    this.electronService.ipcRenderer.send('user-service-ready');
    this.setUserData();
  }

  public getUserPreferences(): Promise<object> {
    return new Promise((resolve, reject) => {
      if(this._userPreferences) {
        resolve(this._userPreferences);
      } else {
        this.setUserData().then(() => {
          resolve(this._userPreferences);
        });
      }
    });
  }

  public getUserMetaData(): Promise<object> {
    return new Promise((resolve, reject) => {
      if(this._userMetaData) {
        resolve(this._userMetaData);
      } else {
        this.setUserData().then(() => {
          resolve(this._userMetaData);
        });
      }
    });
  }

  private setUserData(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.electronService.ipcRenderer.on('user-preferences', (event, data) => {
        this._userPreferences = data;
        if(this._userPreferences !== undefined && this._userMetaData !== undefined) {
          resolve();
        }
      });

      this.electronService.ipcRenderer.on('user-metadata', (event, data) => {
        this._userMetaData = data;
        if(this._userPreferences !== undefined && this._userMetaData !== undefined) {
          resolve();
        }
      });
    });
  }

}
