import { Component, inject } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FieldsetModule } from 'primeng/fieldset';
import { FileUploadHandlerEvent, FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { StatesService } from '../services/states.service';
import { BackendService } from '../services/backend.service';
import {
  AppwriteService,
  FileDataRes,
  FileHeaderRes,
  FileUploadRes,
} from '../services/appwrite.service';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [FieldsetModule, ToastModule, FileUploadModule, ConfirmDialogModule],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.css',
})
export class FileUploadComponent {
  constructor() {}

  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);
  public statesService = inject(StatesService);
  public backendService = inject(BackendService);
  private appwriteService = inject(AppwriteService);

  chooseLabel: string = 'Choose CSV File';
  uploadLabel: string = 'Get CSV Headers';

  customUploadHandler(e: { files: File[] }): void {
    const uploadedFile = e['files'][0];

    if (!uploadedFile) {
      this.messageService.add({
        severity: 'error',
        summary: 'Rejected',
        detail: 'File parsing aborted. No File uploaded',
        life: this.statesService.messageLife(),
      });
    } else {
      this.confirmationService.confirm({
        message: 'Are you sure that you want to proceed?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        acceptIcon: 'none',
        rejectIcon: 'none',
        rejectButtonStyleClass: 'p-button-text',
        accept: () => {
          this.messageService.add({
            severity: 'info',
            summary: 'Uploading File',
            detail: 'Getting File Headers',
            life: this.statesService.messageLife(),
          });

          this.triggerFileUpload(uploadedFile);
        },
        reject: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Rejected',
            detail: 'File parsing aborted by user',
            life: this.statesService.messageLife(),
          });
        },
      });
    }
  }

  private triggerFileUpload(file: File) {
    this.appwriteService.uploadFile(file).subscribe({
      next: (fileUploadRes: FileUploadRes) => {
        if (fileUploadRes.success) {
          const fileID = fileUploadRes.fileId;
          this.statesService.fileId.set(fileID ? fileID : '');

          this.appwriteService.getFileHeaders(fileID).subscribe({
            next: (fileHeadersRes: FileHeaderRes) => {
              if (fileHeadersRes.success) {
                const headers = fileHeadersRes.data;

                this.statesService.fileHeaders.set(
                  headers ? headers.filter((header) => header) : []
                );
                this.statesService.isFileHeadersReceived.set(true);
                this.statesService.isFileHeadersLoading.set(false);
                this.statesService.collapseFileUploadField.set(true);
                this.statesService.collapseHeadersField.set(false);
              }
            },
            error: (err) => {
              this.messageService.add({
                severity: 'error',
                summary: 'Oops',
                detail: 'Something went wrong while getting file headers',
                life: this.statesService.messageLife(),
              });
              return null;
            },
          });
        }
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Oops',
          detail: 'Something went wrong while uploading file',
          life: this.statesService.messageLife(),
        });
        return null;
      },
    });
  }
}
