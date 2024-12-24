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

  uploadHandler(event: FileUploadHandlerEvent) {
    if (event.files[0]) {
      const btn = <HTMLButtonElement>document.getElementById('confirmBtn');
      const confirmationEvent = new Event('click');
      btn.dispatchEvent(confirmationEvent);
      this.statesService.uploadedFile.set(event.files[0]);
    }
  }

  triggerV2APIS(uploadedFile: File) {
    this.appwriteService.uploadFile(uploadedFile).subscribe({
      next: (fileUploadRes: FileUploadRes) => {
        if (fileUploadRes.success) {
          console.log('file uplod res: ', fileUploadRes);
          this.appwriteService.getFileHeaders(fileUploadRes.fileId).subscribe({
            next: (fileHeadersRes: FileHeaderRes) => {
              if (fileHeadersRes.success) {
                console.log('file headers: ', fileHeadersRes);

                this.appwriteService
                  .getFileData({
                    file_id: fileUploadRes.fileId,
                    header_row: 1,
                    headers: fileHeadersRes.data,
                  })
                  .subscribe({
                    next: (fileDataRes: FileDataRes) => {
                      if (fileDataRes.success) {
                        console.log('file data: ', fileDataRes.data);
                      }
                    },
                  });
              }
            },
            error: (err) => {
              console.error('File upload failed:', err);
              return null;
            },
          });
        }
      },
      error: (err) => {
        console.error('File upload failed:', err);
        return null;
      },
    });
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
        const uploadedFile = this.statesService.uploadedFile();
        if (uploadedFile) {
          this.statesService.resetUIstates();
          this.statesService.isFileHeadersLoading.set(true);

          // this.triggerV2APIS(uploadedFile);

          this.backendService.getFileHeaders(uploadedFile).subscribe((res) => {
            if (res.success) {
              const { fileId: fielId, headers } = res;
              this.statesService.fileId.set(fielId ? fielId : '');
              this.statesService.fileHeaders.set(
                headers ? headers.filter((header) => header) : []
              );
              this.statesService.isFileHeadersReceived.set(true);
              this.statesService.isFileHeadersLoading.set(false);
              this.statesService.collapseFileUploadField.set(true);
              this.statesService.collapseHeadersField.set(false);
            }
          });
        }
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
