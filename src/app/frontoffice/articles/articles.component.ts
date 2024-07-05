///////////////////////////////////////////////////////
////////////////////  IMPORTATIONS   //////////////////
///////////////////////////////////////////////////////

import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

// Subcomponents
import { CardComponent } from '../card/card.component';

// Model
import { CardModel } from '../../models/card.model';

// Service
import { ArticleService } from '../../services/article.service';
import { NotificationsService } from '../../services/notifications.service';



@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.scss'
})
export class ArticlesComponent  implements OnInit {

// Inputs
@Input() title: string = '';
@Input() idCategory: number = 0;

// Attributes
dataArticles: CardModel[] = [];            
isWindowOpen = true;
isWindowToggled = false;

// Notification
isNotificationWindow: Boolean = false;
notificationMessage: string = '';

// Loading
isLoading: Boolean = false;


// Constructor
constructor ( private articleService: ArticleService,
  private notificationsService: NotificationsService,
              private router: Router) {}  


/**
 * 
 * Method used to fetch the data menu. Initialized after the creation of the component
 */              
ngOnInit(): void {
  this.articleService.getLastCoding(this.idCategory).subscribe({
    next: (data: any) => {
      this.dataArticles = data.body;
    },
    error: (error: any) => {
      const message: string = error.error.message;
      // Display a notification with the error message
      this.notificationsService.displayNotification(this, message, 2000, null, 'server', false);    }
  });
}
/**
 * 
 * Method used to close the window
 */
closeWindow() {
  this.isWindowOpen = !this.isWindowOpen;
  this.router.navigate(['/accueil']);
}

/**
 * 
 * Method used to toggle the window
 */
toggleWindow() {
  this.isWindowToggled = !this.isWindowToggled;
}

}
