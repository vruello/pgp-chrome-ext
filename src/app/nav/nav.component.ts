import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import {filter, map, startWith, switchMap, tap} from 'rxjs/operators';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent} from '@angular/material';
import {Router} from '@angular/router';
import {User} from '../user';
import {UserService} from '../user.service';

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

  constructor(private breakpointObserver: BreakpointObserver, private router: Router, private userService: UserService) {}

}
