import { Component } from '@angular/core';

@Component({
  selector: 'app-welcome-banner',
  standalone: true,
  imports: [],
  templateUrl: './welcome-banner.component.html',
  styleUrl: './welcome-banner.component.css'
})
export class WelcomeBannerComponent {
  name:string = "Krishna";
}
