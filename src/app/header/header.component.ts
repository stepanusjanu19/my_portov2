import { Component } from '@angular/core';
import { environment } from '../../environments/environment';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ConfettiService } from '../services/confetti.service';
import { NgClass } from '@angular/common';
import { ClickOutsideDirective } from '../shared/directives/click-outside.directive';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ClickOutsideDirective,RouterLink, RouterLinkActive,NgClass],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(public confettiService: ConfettiService) { }
  baseurl: string = environment.urlApi;
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }
}
