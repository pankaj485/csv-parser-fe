import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { FileUploadHandlerEvent, FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { SplitButtonModule } from 'primeng/splitbutton';
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
    SplitButtonModule,
    InputTextModule,
    ToastModule,
    FileUploadModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [MessageService],
})
export class AppComponent {
  constructor(
    private primengConfig: PrimeNGConfig,
    private messageService: MessageService
  ) {}

  title = 'CSV2JSON-A18';
  uploadedFile?: File;
  maxFileSize: number = 1000000;

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.primengConfig.inputStyle.set('outlined');
  }

  uploadHandler(event: FileUploadHandlerEvent) {
    const file = event.files[0];
    if (file && file.size <= this.maxFileSize) {
      this.uploadedFile = file;
      this.messageService.add({
        severity: 'info',
        summary: 'File Added',
        detail: file.name,
        life: 1500,
      });
    }
  }

  onImageError(event: Event) {
    console.log(event);
  }
}
