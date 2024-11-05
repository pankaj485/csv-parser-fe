import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FieldsetModule } from 'primeng/fieldset';
import { FileUploadHandlerEvent, FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { StatesService } from '../services/states.service';

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
    private messageService: MessageService,
    public statesService: StatesService
  ) {}

  uploadHandler(event: FileUploadHandlerEvent) {
    if (event.files[0]) {
      const btn = <HTMLButtonElement>document.getElementById('confirmBtn');
      const confirmationEvent = new Event('click');
      btn.dispatchEvent(confirmationEvent);
      this.statesService.uploadedFile.set(event.files[0]);
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
          life: this.statesService.messageLife(),
        });

        this.statesService.collapseFileUploadField.set(true);
        this.statesService.collapseHeadersField.set(false);
        this.statesService.getFileHeaders();
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Rejected',
          detail: 'File parsing aborted',
          life: this.statesService.messageLife(),
        });
      },
    });
  }
}
