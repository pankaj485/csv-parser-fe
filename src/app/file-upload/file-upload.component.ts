import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FieldsetModule } from 'primeng/fieldset';
import { FileUploadHandlerEvent, FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [FieldsetModule, ToastModule, FileUploadModule, ConfirmDialogModule],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.css',
})
export class FileUploadComponent {
  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  messageLife: number = 1500;
  maxFileSize: number = 1000000;
  collapseFileUploadFieldSet: boolean = false;

  uploadHandler(event: FileUploadHandlerEvent) {
    if (event.files[0]) {
      const btn = <HTMLButtonElement>document.getElementById('confirmBtn');
      const confirmationEvent = new Event('click');
      btn.dispatchEvent(confirmationEvent);
      // this.triggerFileUploadConfirmation(confirmationEvent);
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
        this.collapseFileUploadFieldSet = true;
        // this.getFileHeaders();
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
}
