import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import {filter, map, startWith, tap} from 'rxjs/operators';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatDialog} from '@angular/material';
import {Router} from '@angular/router';
import {User} from '../user';
import {UserService} from '../user.service';
import {PGPService} from '../pgp.service';
import {StorageService} from '../storage.service';
import {AddUserComponent} from '../add-user/add-user.component';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {

  @ViewChild('searchUserInput') searchUserInput: ElementRef;
  myControl = new FormControl();
  filteredUsers: Observable<any[]>;

  users: User[] = [];

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );


  displayFn(user) {
    return user ? user.name : undefined;
  }

  onOptionSelected(event: MatAutocompleteSelectedEvent) {
    this.myControl.reset();
    this.searchUserInput.nativeElement.blur();
    this.router.navigate(['/dashboard/user', event.option.value.id]);
  }



  ngOnInit() {
    this.userService.get()
      .pipe(
        tap(users => this.users = users)
      )
      .subscribe(_ => {
          this.filteredUsers = this.myControl.valueChanges
            .pipe(
              startWith(''),
              filter(user => typeof user === 'string'),
              map(user => this._filter(user))
            );
        });

  }

  private _filter(username) {
    const filterUsername = username.toLowerCase();

    return this.users.filter(user => user.name.toLowerCase().includes(filterUsername));
  }

  public generateList() {
    const number = 15;
    const users = [];
    for (let i = 0; i < number; i++) {
      const user = new User();
      user.name = Math.random().toString(36).substring(2, 10) + ' ' + Math.random().toString(36).substring(2, 10);
      user.publicKey = `-----BEGIN PGP PUBLIC KEY BLOCK-----
Version: Keybase OpenPGP v1.0.0
Comment: https://keybase.io/crypto

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
ufk6RZRvYOvJDFsZjHLc
=1jUB
-----END PGP PUBLIC KEY BLOCK-----
`;
      this.userService.add(user);
    }

  }

  removeContacts() {
    this.userService.clear();
  }

  openAddUserDialog() {
    this.dialog.open(AddUserComponent, {
      width: '75%',
    });
  }

  constructor(private breakpointObserver: BreakpointObserver, private router: Router, private userService: UserService, private PGPService: PGPService, private storageService: StorageService, private dialog: MatDialog) {}

}
