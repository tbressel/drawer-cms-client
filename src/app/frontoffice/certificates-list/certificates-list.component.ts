
///////////////////////////////////////////////////////
////////////////////  IMPORTATIONS   //////////////////
///////////////////////////////////////////////////////

import { Component, OnInit, Input, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

// Subcomponents
import { CertifiCardComponent } from '../certifi-card/certifi-card.component';
import { NotificationsComponent } from '../notifications/notifications.component';

// Model
import { CertificateCardModel } from '../../models/certificate.models';

// Service
import { CertificateService } from '../../services/certificate.service';
import { NotificationsService } from '../../services/notifications.service';





@Component({
  selector: 'app-certificates-list',
  standalone: true,
  imports: [CommonModule,CertifiCardComponent, NotificationsComponent],
  templateUrl: './certificates-list.component.html',
  styleUrl: './certificates-list.component.scss'
})





export class CertificatesListComponent implements OnInit {
@Input() title: string = '';


// Attributes
dataCertificates: CertificateCardModel[] = [];            
token: string | null = '';

isWindowOpen = true;
isWindowToggled = false;


isNotificationWindow = false;
notificationMessage: string = '';



// Constructor
constructor ( private certificateService: CertificateService,
              private router: Router,
              private notificationServices: NotificationsService,
              @Inject(PLATFORM_ID) private platformId: Object) {}  



/**
 * 
 * Method used to fetch the data menu. Initialized after the creation of the component
 */              
ngOnInit(): void {


  // Local storage access only if the platform is the browser (not the server)
  if (isPlatformBrowser(this.platformId)) {
    this.token = localStorage.getItem('token');
  }
  if (!this.token) {
    this.showNotification(true, 'access-failure', 3000, '/accueil');
    return;
  }


  this.certificateService.getCertificates(this.token).subscribe({
    next: (data: any) => {
      this.dataCertificates = data.body;
    },
    error: (error) => {
      error = error.error.message;

      this.showNotification(true, error, 3000, '/login', 'server');
    }
  });
}


  /**
  * 
  * Methode to show a notification
  * 
  * @param display active or not the notification selected by ngIf in html
  * @param type could be a key or a message
  * @param timer duration when the notification is displayed
  * @param redirect route to redirect after the notification is displayed
  * @param origin values to define witch type of error is displayed 'client'(key) or 'server'(value) 
  */
  showNotification(display: boolean, type: string, timer: number = 0, redirect?: string, origin?: string) {

    // Most of time set to true to display the notification
    this.isNotificationWindow = display;

    if (origin === 'client' || origin === undefined) {
      this.notificationMessage = this.notificationServices.getNotificationMessage(type);
    } else if (origin === 'server') {
      this.notificationMessage = type;
    }

    if (display && timer > 0) {
      setTimeout(() => {
        this.isNotificationWindow = false;

        if (redirect !== undefined) {
          this.router.navigate([redirect]);
        }
      }, timer);
    }
  }



/**
 * 
 * Method used to close the window and back to the home page
 */
closeWindow() {
  this.isWindowOpen = !this.isWindowOpen;
  this.router.navigate(['/accueil']);
}

/**
 * 
 * Method used to hide or show the content of the window
 */
toggleWindow() {
  this.isWindowToggled = !this.isWindowToggled;
}

}
