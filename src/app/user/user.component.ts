import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {User} from '../user';
import {UserService} from '../user.service';
import {switchMap} from 'rxjs/operators';
import {PGPService} from '../pgp.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user: User;
  message: string;
  encrypted: string;

  constructor(private route: ActivatedRoute, private userService: UserService, private PGPService: PGPService) { }

  ngOnInit() {
    this.route.paramMap.pipe(
        switchMap(paramMap => {
          return this.userService.getById(+paramMap.get('id'));
        })
    )
    .subscribe((user: User) => {
      this.user = user;
    });
  }

  async onEncrypt() {
    this.encrypted = await this.PGPService.encrypt(this.message);
  }



}
