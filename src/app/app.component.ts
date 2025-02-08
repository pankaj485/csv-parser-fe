import { Component } from '@angular/core';
import {
  ConfirmationService,
  MessageService,
  PrimeNGConfig,
} from 'primeng/api';
import { HeaderComponent } from './header/header.component';
import { StatesService } from './services/states.service';
import { FileParserComponent } from './file-parser/file-parser.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, FileParserComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [MessageService, ConfirmationService],
})
export class AppComponent {
  constructor(
    private primengConfig: PrimeNGConfig,
    public statesService: StatesService
  ) {}

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.primengConfig.inputStyle.set('outlined');
  }
}
