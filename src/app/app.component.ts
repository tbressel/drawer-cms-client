import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from './frontoffice/navigation/navigation.component';
import { UnitsComponent } from './frontoffice/units/units.component';
import { BannerComponent } from './frontoffice/banner/banner.component';
import { SideBarComponent } from './frontoffice/side-bar/side-bar.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SideBarComponent, NavigationComponent, UnitsComponent, BannerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'drawer-client';
}
