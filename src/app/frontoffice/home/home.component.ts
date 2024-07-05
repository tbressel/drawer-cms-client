import { Component } from '@angular/core';

import { FacebookComponent } from '../facebook/facebook.component';
import { DiscordComponent } from '../discord/discord.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FacebookComponent, DiscordComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
