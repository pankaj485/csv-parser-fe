import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  ConfirmationService,
  MessageService,
  PrimeNGConfig,
} from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
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
    ConfirmDialogModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [MessageService, ConfirmationService],
})
export class AppComponent {
  constructor(
    private primengConfig: PrimeNGConfig,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  title = 'CSV2JSON-A18';
  uploadedFile?: File;
  maxFileSize: number = 1000000;
  uploadURL = '';
  messageLife: number = 1500;

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.primengConfig.inputStyle.set('outlined');
  }

  uploadHandler(event: FileUploadHandlerEvent) {
    if (event.files[0]) {
      this.getFileHeaders(event.files[0]);
    }
  }

  triggerFileUploadConfirmation(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: 'none',
      rejectIcon: 'none',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Confirmed',
          detail: 'Getting file headers',
          life: this.messageLife,
        });
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Rejected',
          detail: 'File parsing aborted',
          life: this.messageLife,
        });
      },
    });
  }

  getFileHeaders(file: File) {
    console.log(file);
    const btn = <HTMLButtonElement>document.getElementById('confirmBtn');
    const event = new Event('click');
    btn.dispatchEvent(event);
    this.triggerFileUploadConfirmation(event);
  }

  onImageError(event: Event) {
    console.log(event);
  }
}
