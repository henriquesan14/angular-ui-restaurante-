import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class NotAuthGuard implements CanActivate {
  constructor(private storage: StorageService, private router: Router) { }

  canActivate(): boolean {
    if (!this.storage.getLocalUser()) {
      return true;
    }
    this.router.navigateByUrl('dashboard');
    return false;
  }
}