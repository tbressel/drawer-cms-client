////////////////////////////////////////////////
////////////   Angular Importations  ///////////
////////////////////////////////////////////////
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Router } from '@angular/router';
////////////////////////////////////////////////
//////////   Components Importations  //////////
////////////////////////////////////////////////
import { CertificateCardModel } from '../../models/certificate.models';

import { CertificateService } from '../../services/certificate.service';
import { CONFIG } from '../../../config';



@Component({
  selector: 'app-certifi-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './certifi-card.component.html',
  styleUrl: './certifi-card.component.scss'
})
export class CertifiCardComponent implements OnInit {

  baseUrl = CONFIG.baseUrl;

  @Input() certification!: CertificateCardModel;

  medalType: string = '';
  medalColour: string = '';
  courseLevel: number = 1;
  medalUrl: string = '';

  
  constructor(  private certificateService: CertificateService,
                private router: Router) { }
  
ngOnInit(): void {
  if (this.certification.note <= 15) {
      this.medalType = 'bronze';
    } else if (this.certification.note >= 16 && this.certification.note <= 18) {
      this.medalType = 'silver';
    } else if (this.certification.note >= 19) {
      this.medalType = 'gold';
    }

    switch (this.courseLevel) {
      case this.courseLevel = 1: {
      this.medalColour = 'green';
      break;
    }
    case this.courseLevel = 2: {
      this.medalColour = 'yellow';
      break;
    }
    case this.courseLevel = 3: {
      this.medalColour = 'orange';
      break;
    }
    case this.courseLevel = 4: {
      this.medalColour = 'cyan';
      break;
    }
    case this.courseLevel = 5: {
      this.medalColour = 'blue';
      break;
    }
    case this.courseLevel = 6: {
      this.medalColour = 'red';
      break;
    }

    
  }
  this.medalUrl = `${this.medalType}-${this.medalColour}.webp`;
}

  selectCertification(id: number): void {
    this.router.navigate(['/certificate', id]);
  }
}
