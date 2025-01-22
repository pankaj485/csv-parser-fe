import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CheckboxChangeEvent, CheckboxModule } from 'primeng/checkbox';
import { DividerModule } from 'primeng/divider';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import {
  AppwriteService,
  fileDataPayload,
  FileDataRes,
} from '../services/appwrite.service';
import { StatesService } from '../services/states.service';
import { CardComponent } from '../shared/card/card.component';

@Component({
  selector: 'app-file-headers',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ScrollPanelModule,
    CheckboxModule,
    DividerModule,
    ButtonModule,
    CardComponent,
  ],
  templateUrl: './file-headers.component.html',
  styleUrl: './file-headers.component.css',
})
export class FileHeadersComponent {
  constructor() {}
  private messageService = inject(MessageService);
  public statesService = inject(StatesService);
  private appwriteService = inject(AppwriteService);
  selectAll: boolean = false;
  selectedFileHeaders!: string[];

  ngOnInit() {
    this.selectedFileHeaders = this.statesService.selectedHeaders();
  }

  updateSelectedHeaders(newHeaders: string[]) {
    this.statesService.selectedHeaders.set(newHeaders);
    this.selectAll =
      this.statesService.fileHeaders().length ===
      this.statesService.selectedHeaders().length;
  }

  toggleSelectAll(event: CheckboxChangeEvent) {
    if (event.checked) {
      this.selectedFileHeaders = this.statesService.fileHeaders();
      this.statesService.selectedHeaders.set(this.statesService.fileHeaders());
    } else {
      this.selectedFileHeaders = [];
      this.statesService.selectedHeaders.set([]);
    }
  }

  triggerFileParsing() {
    if (!this.statesService.selectedHeaders().length) {
      this.messageService.add({
        severity: 'error',
        summary: 'Rejected',
        detail: 'Please select at least 1 Header',
        life: this.statesService.messageLife(),
      });
    } else {
      this.statesService.isParsedDataLoading.set(true);

      const payload: fileDataPayload = {
        file_id: this.statesService.fileId(),
        headers: this.statesService.selectedHeaders(),
        header_row: 1,
      };

      this.appwriteService.getFileData(payload).subscribe({
        next: (fileDataRes: FileDataRes) => {
          if (fileDataRes.success) {
            this.statesService.parsedJson.set(
              JSON.stringify(fileDataRes.data, undefined, 2)
            );

            this.statesService.collapseHeadersField.set(true);
            this.statesService.collapseCodeField.set(false);
            this.statesService.isParsedDataReceived.set(true);
            this.statesService.isParsedDataLoading.set(false);
          }
        },
      });
    }
  }
}
