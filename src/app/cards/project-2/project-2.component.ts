import { Component } from '@angular/core';
import { assetUrl } from '../../shared/asset-url';

@Component({
  selector: 'app-project-2',
  standalone: true,
  imports: [],
  templateUrl: './project-2.component.html',
  styleUrl: './project-2.component.css'
})
export class Project2Component {
  readonly assetUrl = assetUrl;

}
