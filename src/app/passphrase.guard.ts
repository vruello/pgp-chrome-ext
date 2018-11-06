import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {StorageService} from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class PassphraseGuard implements CanActivate {

  constructor(private storageService: StorageService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.storageService.passphrase && this.storageService.passphrase.length > 0) {
      return true;
    }
    else {
      this.router.navigate(['/']);
    }
  }
}
