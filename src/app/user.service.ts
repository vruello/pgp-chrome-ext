import { Injectable } from '@angular/core';
import {User} from './user';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users: User[] = [];

  constructor() {
    this.users = [
      { id: 1, name: 'Hello', publicKey: null},
      { id: 2, name: 'Test', publicKey: null},
      { id: 3, name: 'Adrien', publicKey: null},
      { id: 4, name: 'Jean', publicKey: null},
      { id: 5, name: 'Heud', publicKey: null},
      { id: 6, name: 'Fred', publicKey: null},
      { id: 7, name: 'Olivier', publicKey: null},
      { id: 8, name: 'Vincent', publicKey: null},
      { id: 9, name: 'Auzo', publicKey: null}
    ];
  }

  public getById(id: number): Observable<User> {
    return of(this.users.find(user => user.id === id));
  }

  public get(): Observable<User[]> {
    return of(this.users);
  }

  public add(user: User) {
    this.users.push(user);
  }

  public remove(id: number) {
    this.users = this.users.filter(user => user.id !== id);
  }

}
