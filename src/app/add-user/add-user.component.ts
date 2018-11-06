import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from '../user';
import {NgForm} from '@angular/forms';
import {UserService} from '../user.service';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  @ViewChild('form') form: NgForm;
  user: User = new User();

  onNoClick(): void {
    this.dialogRef.close();
  }

  constructor(private userService: UserService, public dialogRef: MatDialogRef<AddUserComponent>) { }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }

    this.userService.add(this.user);
    this.dialogRef.close();

  }

  ngOnInit() {
  }

}
