import { Component } from '@angular/core';
import {
  ConfirmationService,
  MessageService,
  PrimeNGConfig,
} from 'primeng/api';
import { CodeBlockComponent } from './code-block/code-block.component';
import { FileHeadersComponent } from './file-headers/file-headers.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    CodeBlockComponent,
    FileUploadComponent,
    FileHeadersComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [MessageService, ConfirmationService],
})
export class AppComponent {
  constructor(private primengConfig: PrimeNGConfig) {}

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.primengConfig.inputStyle.set('outlined');
  }
}
