import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-public',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './public.component.html',
  styleUrl: './public.component.css',
  encapsulation: ViewEncapsulation.None
})
export class PublicComponent {
  
}
