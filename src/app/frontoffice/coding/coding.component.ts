import { Component } from '@angular/core';
import { ArticlesComponent } from '../articles/articles.component';

@Component({
  selector: 'app-coding',
  standalone: true,
  imports: [ArticlesComponent],
  templateUrl: './coding.component.html',
  styleUrl: './coding.component.scss'
})
export class CodingComponent {

}
