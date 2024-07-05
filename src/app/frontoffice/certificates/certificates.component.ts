import { Component } from '@angular/core';

import { CertificatesListComponent } from '../certificates-list/certificates-list.component';

@Component({
  selector: 'app-certificates',
  standalone: true,
  imports: [CertificatesListComponent],
  templateUrl: './certificates.component.html',
  styleUrl: './certificates.component.scss'
})
export class CertificatesComponent {

}
