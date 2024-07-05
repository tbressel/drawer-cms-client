import { Component } from '@angular/core';
import { ArticlesComponent } from '../articles/articles.component';


@Component({
  selector: 'app-documentation',
  standalone: true,
  imports: [ArticlesComponent],
  templateUrl: './documentation.component.html',
  styleUrl: './documentation.component.scss'
})
export class DocumentationComponent {

}
