import { Injectable } from '@angular/core';
import {User} from './user';
import {BehaviorSubject, NEVER, Observable, of} from 'rxjs';
import {StorageService} from './storage.service';
import {filter, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users: BehaviorSubject<User[]>;
  public users$: Observable<User[]>;

  public contactsString = 'contacts';

  constructor(private storageService: StorageService) {
    this.users = new BehaviorSubject<User[]>([]);
    this.users$ = this.users.asObservable();

    this.load();
  }

  public getById(index: number): Observable<User> {
    const users = this.users.getValue();

    if (users && index >= 0 && index < users.length) {
      return of(users[index]);
    }
    else
      return NEVER;
  }

  public get(): Observable<User[]> {
    return this.users$.pipe(
      filter((users) => !!users),
      map((users: User[]) => {
        return users
          .map((user, index) => {
            const usr = new User();
            usr.id = index;
            usr.name = user.name;
            usr.publicKey = user.publicKey;
            return usr;
          })
          .sort((a, b) => a.name.localeCompare(b.name));
      })
    );
  }

  public add(user: User) {
    const users = this.users.getValue();
    users.push(user);
    this.users.next(users);
    this.save(users);
  }

  public remove(index: number) {
    const users = this.users.getValue();
    users.splice(index);
    this.users.next(users);
    this.save(users);
  }

  public load() {
    const users = JSON.parse(this.storageService.get(this.contactsString));
    if (!!users) {
      this.users.next(users);
    }
  }

  public clear() {
    this.users.next([]);
    this.storageService.remove(this.contactsString);
  }

  private save(users: User[]) {
    this.storageService.set(this.contactsString, JSON.stringify(users));
  }

}
