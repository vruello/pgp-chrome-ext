import { Injectable } from '@angular/core';
import {from} from 'rxjs';
import {StorageService} from './storage.service';

declare var openpgp: any;


@Injectable({
  providedIn: 'root'
})
export class PGPService {

  privKeyObj: any;

  constructor(private storageService: StorageService) { }

  generateKeys(name: string, email: string, passphrase: string) {
    const options = {
      userIds: [{ name: name, email: email }], // multiple user IDs
      numBits: 4096,                                            // RSA key size
      passphrase: passphrase         // protects the private key
    };

    return from(openpgp.generateKey(options));
  }

  async unlockKeys(passphrase: string): Promise<boolean> {
    try {
      const privateKeyArmored = this.storageService.get('privateKeyArmored');
      const privKeyObj = (await openpgp.key.readArmored(privateKeyArmored)).keys[0];
      await privKeyObj.decrypt(passphrase);
      this.privKeyObj = privKeyObj;
      return Promise.resolve(true);
    }
    catch (error) {
      return Promise.resolve(false);
    }
  }

  async encrypt(message: string): Promise<string> {
    const privateKeyArmored = this.storageService.get('privateKeyArmored');
    const publicKeyArmored = this.storageService.get('publicKeyArmored');

    const options = {
      message: openpgp.message.fromText(message),       // input as Message object
      publicKeys: (await openpgp.key.readArmored(publicKeyArmored)).keys, // for encryption
      privateKeys: [this.privKeyObj]                                 // for signing (optional)
    };

    const ciphertext = await openpgp.encrypt(options);
    return Promise.resolve(ciphertext.data);
  }
}
