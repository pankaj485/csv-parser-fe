import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import hljs from 'highlight.js/lib/core';
import json from 'highlight.js/lib/languages/json';
import 'highlight.js/styles/atom-one-dark.css';
import {
  ConfirmationService,
  MessageService,
  PrimeNGConfig,
} from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CheckboxChangeEvent, CheckboxModule } from 'primeng/checkbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DividerModule } from 'primeng/divider';
import { FieldsetModule } from 'primeng/fieldset';
import { FileUploadHandlerEvent, FileUploadModule } from 'primeng/fileupload';
import { PanelModule } from 'primeng/panel';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { sampleJsonData } from '../../db/samplejson';
import { AccordionModule } from 'primeng/accordion';
hljs.registerLanguage('json', json);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterOutlet,
    ToolbarModule,
    ButtonModule,
    ToastModule,
    FileUploadModule,
    ConfirmDialogModule,
    CheckboxModule,
    PanelModule,
    ScrollPanelModule,
    DividerModule,
    FieldsetModule,
    AccordionModule,
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
  @ViewChild('codeBlock') codeBlockElement!: ElementRef;

  title = 'CSV2JSON-A18';
  uploadedFile?: File;
  maxFileSize: number = 1000000;
  uploadURL = '';
  messageLife: number = 1500;
  fileHeaders: string[] = Array(5)
    .fill('Header ')
    .map((item, i) => item + (i + 1));
  selectedFileHeaders: string[] = [];
  selectAll: boolean = false;

  ngAfterViewInit() {
    const formattedJson = JSON.stringify(sampleJsonData, undefined, 2);
    this.codeBlockElement.nativeElement.innerHTML = formattedJson;

    hljs.highlightElement(this.codeBlockElement.nativeElement);
  }

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.primengConfig.inputStyle.set('outlined');
  }

  uploadHandler(event: FileUploadHandlerEvent) {
    if (event.files[0]) {
      const btn = <HTMLButtonElement>document.getElementById('confirmBtn');
      const confirmationEvent = new Event('click');
      btn.dispatchEvent(confirmationEvent);
      this.triggerFileUploadConfirmation(confirmationEvent);
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
        this.getFileHeaders();
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

  getFileHeaders() {
    this.fileHeaders = Array(50)
      .fill('Header 123')
      .map((_, i) => _ + (i + 1));
  }

  onImageError(event: Event) {
    console.log(event);
  }

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

      const element = <HTMLElement>document.getElementById('codeBlock');
      element.innerHTML = JSON.stringify(sampleJsonData, undefined, 2);
    }
  }

  copyToClipBoard() {
    const data: string = this.codeBlockElement.nativeElement.innerText;
    window.navigator.clipboard.writeText(data).then(() => {
      this.messageService.add({
        severity: 'info',
        summary: 'Success!',
        detail: 'JSON data copied to Clipboard',
        life: this.messageLife,
      });
    });
  }
}
