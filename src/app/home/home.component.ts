import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {PGPService} from '../pgp.service';
import {StorageService} from '../storage.service';
import {MatDialog, MatSnackBar} from '@angular/material';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild('form') form: NgForm;
  @ViewChild('loadingDialog') loadingDialog: TemplateRef<any>;

  formFull = true;

  name: string;
  passphrase: string;
  email: string;

  constructor(private PGPService: PGPService,
              private storageService: StorageService,
              private snackBar: MatSnackBar,
              private dialog: MatDialog,
              private router: Router) {}

  ngOnInit() {
    if (this.storageService.get('privateKeyArmored') && this.storageService.get('publicKeyArmored') && this.storageService.passphrase) {
      this.router.navigate(['/dashboard']);
    }
    else if(this.storageService.get('privateKeyArmored') && this.storageService.get('publicKeyArmored')) {
      this.formFull = false;
    }
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }

    if (this.formFull) {
      this.generateKeys();
    }
    else {
      this.unlockKeys();
    }
  }

  async unlockKeys() {
    const res = await this.PGPService.unlockKeys(this.passphrase);
    if (res) {
      this.storageService.passphrase = this.passphrase;
      this.router.navigate(['/dashboard']);
    }
    else {
      alert('La phrase secrète est invalide !');
      this.passphrase = '';
    }
  }


  generateKeys() {
    const ref = this.dialog.open(this.loadingDialog);

    this.PGPService.generateKeys(this.name, this.email, this.passphrase)
      .subscribe((keys: {privateKeyArmored: string, publicKeyArmored: string, revocationCertificate: string}) => {
        this.storageService.set('privateKeyArmored', keys.privateKeyArmored);
        this.storageService.set('publicKeyArmored', keys.publicKeyArmored);
        this.storageService.set('revocationCertificate', keys.revocationCertificate);

        ref.close();

        this.snackBar.open('Vos clés ont été générées !', null, { duration: 3000 });

        this.router.navigate(['/dashboard']);
      });
  }
}
