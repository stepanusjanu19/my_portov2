import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ConfettiService } from '../services/confetti.service';
import { NgClass } from '@angular/common';
import { ClickOutsideDirective } from '../shared/directives/click-outside.directive';
import { assetUrl } from '../shared/asset-url';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ClickOutsideDirective,RouterLink, RouterLinkActive,NgClass],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(public confettiService: ConfettiService) { }
  resumeUrl: string = assetUrl('uploads/resume.pdf');
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }
}
