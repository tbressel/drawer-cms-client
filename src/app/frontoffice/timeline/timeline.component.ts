///////////////////////////////////////////////////////
////////////////////  IMPORTATIONS   //////////////////
///////////////////////////////////////////////////////

// Angular modules
import { Component, Input, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

// Service
import { CertificateService } from '../../services/certificate.service';
import { NotificationsService } from '../../services/notifications.service';

// Components
import { NotificationsComponent } from '../notifications/notifications.component';

// Configuration
import { CONFIG } from '../../../config';



@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [NotificationsComponent, RouterModule, CommonModule],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.scss'
})




export class TimelineComponent implements OnInit {

  // Inputs
  @Input() wholeArticle: any | undefined;

  // COnfig Attributes
  baseUrl = CONFIG.baseUrl;

  //page consultation attributes
  consultationStates: { [key: string]: boolean } = {};
  savedStates: any;

  // Certificate Attributes
  // isCertificate: boolean = false;
  id_articles: number | undefined = 0;

  token: string | null = '';

  // Notification Attributes
  isNotificationWindow = false;         // default value for the notification window
  notificationMessage: string = '';     // default value for the notification message


  // Constructor
  constructor(
    private router: Router,
    private certificateService: CertificateService,
    private notificationServices: NotificationsService,

    @Inject(PLATFORM_ID) private platformId: Object
  ) { }


  /**
   * 
   * Method used to initialize the component. Initialized after the creation of the component
   */
  ngOnInit(): void {
    // Get the consultation states from the local storage only client side
    if (isPlatformBrowser(this.platformId)) {
      const savedStates = localStorage.getItem('consultationStates');
      if (savedStates) {
        this.consultationStates = JSON.parse(savedStates);
      }
    }
  }


  /**
   * 
   * Method used to get the pages array
   */
  getPagesArray() {
    const maxPage = this.wholeArticle[0]?.max_page || 0;
    return new Array(maxPage).fill(null).map((_, index) => index + 1);
  }


  /**
   * 
   * Methode to manage every chaging of page / chapter
   * When max page is reached, we await for the token validity
   * If the token is valid, we get the new certificate
   * 
   * @param id_article 
   * @param page 
   * @param maxPage 
   */
  goToNextChapter(id_article: number, page: number, maxPage: number): void {

    // Create a unique id with the article id and the page number
    const uniqueId: string = `${id_article}_${page}`;

    // Save the consultation state in the consultationStates object
    this.consultationStates[uniqueId] = true;

    // save consultation into the local storage
    localStorage.setItem('consultationStates', JSON.stringify(this.consultationStates));

    // check if the user has visited all the pages
    if (this.getTotalVisitedPages(uniqueId) >= maxPage) {
      this.router.navigate([`/article-content/${id_article}/0`]);

    
    } else {
      this.router.navigate([`/article-content/${id_article}/${page + 1}`]);
    }
  }






  isPageVisited(id: number, page: number): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const uniqueId = `${id}_${page}`;
      const savedStates = localStorage.getItem('consultationStates');
      if (savedStates) {
        const consultationStates = JSON.parse(savedStates);
        return !!consultationStates[uniqueId];
      }
    }
    return false;
  }






  getTotalVisitedPages(uniqueId: string): number {

    // get the  current article id
    const leftId: string = uniqueId.split('_')[0];

    // turn the Object into an array
    const consultationStatesArray = Object.keys(this.consultationStates);

    // filter the array to get the pages of the current article
    const count: number = consultationStatesArray.filter(element => element.startsWith(leftId)).length;
    return count;
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

}