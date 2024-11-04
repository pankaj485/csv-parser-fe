import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  ConfirmationService,
  MessageService,
  PrimeNGConfig,
} from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { FileUploadHandlerEvent, FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    ToolbarModule,
    ButtonModule,
    ToastModule,
    FileUploadModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [MessageService, ConfirmationService],
})
export class AppComponent {
  constructor(private primengConfig: PrimeNGConfig) {}

  title = 'CSV2JSON-A18';
  uploadedFile?: File;
  maxFileSize: number = 1000000;
  uploadURL = '';

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.primengConfig.inputStyle.set('outlined');
  }

  uploadHandler(event: FileUploadHandlerEvent) {
    if (event.files[0]) {
      this.getFileHeaders(event.files[0]);
    }
  }

  getFileHeaders(file: File) {
    console.log(file);
  }

  onImageError(event: Event) {
    console.log(event);
  }
}
