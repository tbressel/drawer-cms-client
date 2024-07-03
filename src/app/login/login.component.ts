import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrationService } from '../services/registration.service';
import { NavigationService } from '../services/navigation.service';
import { NotificationsComponent } from '../notifications/notifications.component';
import { NotificationsService } from '../services/notifications.service';
import { switchMap, tap, catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NotificationsComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  // Attributs
  loginForm: FormGroup;
  errorMessage: string | null = null;

  isNotificationWindow = false;
  notificationMessage: string = '';

  isLoading: Boolean = false;

  // Constructor
  constructor(
    private formBuilder: FormBuilder,
    private registrationService: RegistrationService,
    private navigationService: NavigationService,
    private notificationsService: NotificationsService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }


  /**
   * Method to submit the login form
   */
  onSubmit(): void {
    this.isLoading = true;
  
    // Check if the form is valid
    if (this.loginForm.valid) {
      // Get the username and password from the form
      const { username, password } = this.loginForm.value;
  
      this.registrationService.login(username, password).pipe(
        switchMap((data: any) => {
          // Store the token in the local storage if present
          if (data.sessionToken?.sessionToken) {
            localStorage.setItem('token', data.sessionToken.sessionToken);
            // Proceed to check if the user is an admin
            return this.registrationService.isAdmin();
          } else {
            throw new Error('Session token is missing');
          }
        }),
        tap((isAdminData: any) => {

          console.log('isAdminData', isAdminData);
          // Update the menu state with the value of isAdmin
          this.updateMenuState(isAdminData.state);
          // Display success notification and navigate to the home page
          this.displayNotification('Successfully logged in', 2000, '/accueil', 'client');
        }),
        catchError((error: any) => {
          const message = error.error?.message || 'An error occurred';
          // Display error notification
          this.displayNotification(message, 2000, null, 'server');
          return of(null); // Return a safe fallback
        }),
        finalize(() => {
          // Ensure loading state is set to false regardless of the outcome
          this.isLoading = false;
        })
      ).subscribe();
    }
  }

  /**
   * 
   * Method to update the menu state
   * 
   * @param isAdmin 
   */
  private updateMenuState(isAdmin: boolean): void {

    console.log('isAdmin', isAdmin);

    // define the news states of the menu
    const menuStates: any = {
      isLogin: false,
      isSignin: false,
      isLogout: true,
      isAdmin: isAdmin
    };

    // send the new states to the navigation service
    this.navigationService.updateMenuRightStates(menuStates);
  }


/**
 * 
 * @param display set to true to display the message
 * @param key the key of the message to show
 * @param timer  duration of the message
 * @param redirect choose or not to redirect to a page '/accueil' for example or null
 * @param origin  if it is from the 'client' or the 'server'
 */
  displayNotification(key: string, timer: number = 0, redirect: string | null, origin: string) {

    // Most of time set to true to display the notification
    this.isNotificationWindow = true;

    if (origin === 'client' || origin === undefined) {
      this.notificationMessage = this.notificationsService.getNotificationMessage(key);
    } else if (origin === 'server') {
      this.notificationMessage = key;
    }

    if (timer > 0) {
      setTimeout(() => {
        this.isNotificationWindow = false;

        if (redirect !== null) {
          this.router.navigate([redirect]);
        }
      }, timer);
    }
  }
}

