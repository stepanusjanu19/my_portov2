import { Component } from '@angular/core';
import { assetUrl } from '../../shared/asset-url';

@Component({
  selector: 'app-project-1',
  standalone: true,
  imports: [],
  templateUrl: './project-1.component.html',
  styleUrl: './project-1.component.css'
})
export class Project1Component {
  readonly assetUrl = assetUrl;

}
