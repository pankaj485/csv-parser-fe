import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CheckboxChangeEvent, CheckboxModule } from 'primeng/checkbox';
import { DividerModule } from 'primeng/divider';
import { FieldsetModule } from 'primeng/fieldset';
import { ScrollPanelModule } from 'primeng/scrollpanel';

@Component({
  selector: 'app-file-headers',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    FieldsetModule,
    ScrollPanelModule,
    CheckboxModule,
    DividerModule,
    ButtonModule,
  ],
  templateUrl: './file-headers.component.html',
  styleUrl: './file-headers.component.css',
})
export class FileHeadersComponent {
  constructor(private messageService: MessageService) {}

  selectAll: boolean = false;
  messageLife: number = 1500;
  selectedFileHeaders: string[] = [];
  collapseFileHeadersFieldSet: boolean = true;
  fileHeaders: string[] = Array(5)
    .fill('Header ')
    .map((item, i) => item + (i + 1));

  toggleSelectAll(event: CheckboxChangeEvent) {
    if (event.checked) {
      this.selectedFileHeaders = [...this.fileHeaders];
    } else {
      this.selectedFileHeaders = [];
    }
  }

  checkAllHeadersSelected() {
    this.selectAll =
      this.fileHeaders.length === this.selectedFileHeaders.length;
  }

  triggerFileParsing() {
    if (!this.selectedFileHeaders.length) {
      this.messageService.add({
        severity: 'error',
        summary: 'Rejected',
        detail: 'At least 1 header should be selected',
        life: this.messageLife,
      });
    } else {
      this.messageService.add({
        severity: 'info',
        summary: 'Confirmed',
        detail: 'Getting JSON data',
        life: this.messageLife,
      });

      this.collapseFileHeadersFieldSet = true;
      // this.collapseCodeBlockFieldSet = false;
    }
  }
}
