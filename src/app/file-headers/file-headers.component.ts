import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CheckboxChangeEvent, CheckboxModule } from 'primeng/checkbox';
import { DividerModule } from 'primeng/divider';
import { FieldsetModule } from 'primeng/fieldset';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { StatesService } from '../services/states.service';
import { BackendService } from '../services/backend.service';

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
  constructor(
    private messageService: MessageService,
    public statesService: StatesService,
    private backendService: BackendService
  ) {}

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
        detail: 'At least 1 header should be selected',
        life: this.statesService.messageLife(),
      });
    } else {
      this.messageService.add({
        severity: 'info',
        summary: 'Confirmed',
        detail: 'Getting JSON data',
        life: this.statesService.messageLife(),
      });

      this.backendService
        .getParsedJSON({
          fileId: this.statesService.fileId(),
          headers: this.statesService.selectedHeaders(),
        })
        .subscribe((res) => {
          const { data, success } = res;
          if (success) {
            this.statesService.parsedJson.set(
              JSON.stringify(data, undefined, 2)
            );
          }
        });

      this.statesService.collapseHeadersField.set(true);
      this.statesService.collapseCodeField.set(false);
    }
  }
}
