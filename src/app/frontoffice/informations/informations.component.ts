import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-informations',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './informations.component.html',
  styleUrl: './informations.component.scss'
})
export class InformationsComponent {

  showAbout: boolean = true;

  constructor(private router: Router) { }
  
    toggleAbout() {
      this.showAbout = !this.showAbout;
  
      if (!this.showAbout) {
        this.router.navigate(['/accueil']);
  
      }
    }
}
