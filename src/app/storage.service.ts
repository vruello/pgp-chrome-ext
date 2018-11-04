import { Injectable } from '@angular/core';
import {Config} from './config';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  public passphrase: string;

  constructor() { }

  get(key: string) {
    return localStorage.getItem(key);
  }

  set(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  remove(key: string) {
    localStorage.removeItem(key);
  }

  clear() {
    localStorage.clear();
  }


}
