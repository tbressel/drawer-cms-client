///////////////////////////////////////////////////////
////////////////////  IMPORTATIONS   //////////////////
///////////////////////////////////////////////////////

// Angular modules
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

// Services
import { ArticleService } from '../../services/article.service';
import { NotificationsService } from '../../services/notifications.service';

// Models
import { CardModel } from '../../models/card.model';
import { TagsModel } from '../../models/tags.model';

// Components
import { TagComponent } from '../tag/tag.component';

// Config
import { CONFIG } from '../../../config';



@Component({
  selector: 'app-card',
  standalone: true,
  imports: [TagComponent, CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {

    // Inputs Props
    @Input() article!: CardModel;
    @Input() tag!: TagsModel;
  
    // Config Attributes
    baseUrl = CONFIG.baseUrl;



  // Notification Attributes
  isNotificationWindow = false;         // default value for the notification window
  notificationMessage: string = '';     // default value for the notification message


  // Constructor
  constructor(private articleService: ArticleService,
    private notificationServices: NotificationsService,
    private router: Router) { }

  /**
   * 
   * Methode used to select an article
   * 
   * @param id 
   * @param page 
   */
  selectArticle(id: number, page: number): void {

    this.articleService.getArticle(id, page).subscribe({
      next: (data: any) => {
        const page: number = data.body[0].page;
        this.router.navigate([`/article-content/${id}/${page}`]);
      },
      error: (error: any) => {
        const message: string = error.error.message;

        // Display a notification with the error message
        this.notificationServices.displayNotification(this, message, 2000, '/login', 'server', false);
      }
    });
  }

}
