import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { RegistrationService } from './registration.service';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators'; 


@Injectable({
  providedIn: 'root'
})
export class PermissionsService implements CanActivate  {


  constructor(private registrationService: RegistrationService,
    private router: Router) { }


    canActivate(): Observable<boolean> | boolean {
      return this.registrationService.isAdmin().pipe(
        tap(isAdmin => {
          if (!isAdmin) {
            // Redirect user is not admin
            this.router.navigate(['/accueil']); 
          }
        }),
        catchError(() => {
          // Redirect user is not admin or error
          this.router.navigate(['/accueil']); 
          return of(false);
        })
      );
    }
  

}
