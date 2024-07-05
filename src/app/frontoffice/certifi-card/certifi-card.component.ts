////////////////////////////////////////////////
////////////   Angular Importations  ///////////
////////////////////////////////////////////////
import { Component, Input } from '@angular/core';
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
export class CertifiCardComponent {

  baseUrl = CONFIG.baseUrl;

  @Input() certification!: CertificateCardModel;
  
  constructor(  private certificateService: CertificateService,
                private router: Router) { }
  

  
  selectCertification(id: number): void {
    this.router.navigate(['/certificate', id]);
  }
}
