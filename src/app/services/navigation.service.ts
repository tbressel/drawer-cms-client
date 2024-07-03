///////////////////////////////////////////////////////
////////////////////  IMPORTATIONS   //////////////////
///////////////////////////////////////////////////////

// Modules
import { HttpClient } from '@angular/common/http';

// Decorator
import { Injectable } from '@angular/core';

// Type model for async data
import { Observable, of, BehaviorSubject } from 'rxjs';

// Model
import { NavigationModel } from './../models/navigation.model';
import { MenuRightStates } from './../models/navigation.model';

// Configuration
import { CONFIG } from '../../config';

// Decorator to inject the service in all components that need it
@Injectable({
  providedIn: 'root',
})


export class NavigationService {


  // État par défaut pour le menu de droite
  private defaultMenuRightStates: MenuRightStates = {
    isLogin: true,
    isSignin: true,
    isLogout: false,
    isAdmin: false
  };

  private menuRightStatesSubject = new BehaviorSubject<MenuRightStates>(this.defaultMenuRightStates);
  menuRightStates$ = this.menuRightStatesSubject.asObservable();

  // Constructor to inject the HttpClient
  constructor(private http: HttpClient) {}

  getNavigationItems(): Observable<NavigationModel[]> {
    return this.http.get<NavigationModel[]>(`${CONFIG.baseUrl}/navigation/get-menu-items`);
  }

  getMenuRightStates(): Observable<MenuRightStates> {
    // Retourne les états par défaut pour cet exemple
    return of(this.defaultMenuRightStates);
  }

  updateMenuRightStates(newStates: MenuRightStates): void {
    console.log('Updating Menu Right States:', newStates); // Log avant mise à jour
    this.menuRightStatesSubject.next(newStates);
    console.log('Menu Right States Subject Value:', this.menuRightStatesSubject.getValue()); // Log après mise à jour
  }

}