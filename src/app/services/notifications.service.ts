///////////////////////////////////////////////////////
////////////////////  IMPORTATIONS   //////////////////
///////////////////////////////////////////////////////

// Modules
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

// Decorator
import { Injectable } from '@angular/core';

// Type model for async data
import { NotificationsModel } from '../models/notifications.model';

// Configuration
import { CONFIG } from '../../config';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  // Attributs
  notificationMessages: NotificationsModel =
    {
      'alert-success': 'Notification de succès OK',
      'alert-failure': 'Notification d\'erreur OK'
    }

  // Constructor
  constructor(
    private http: HttpClient
  ) { }


  /**
   * 
   * Method to get the notification message
   * 
   * @param type the key of the notification message to get
   * @returns 
   */
  getNotificationMessage(type: string): string {
    return this.notificationMessages[type];
  }


}