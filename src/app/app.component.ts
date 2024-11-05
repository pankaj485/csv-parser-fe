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
import { HeaderComponent } from './header/header.component';
import { CodeBlockComponent } from './code-block/code-block.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { FileHeadersComponent } from './file-headers/file-headers.component';
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

    HeaderComponent,
    CodeBlockComponent,
    FileUploadComponent,
    FileHeadersComponent,
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
  @ViewChild('fileUploadBlock') fileUploadElement!: ElementRef;

  title = 'CSV2JSON-A18';
  uploadedFile?: File;
  // maxFileSize: number = 1000000;
  uploadURL = '';
  messageLife: number = 1500;
  fileHeaders: string[] = Array(5)
    .fill('Header ')
    .map((item, i) => item + (i + 1));
  selectedFileHeaders: string[] = [];
  selectAll: boolean = false;
  collapseFileUploadFieldSet: boolean = false;
  collapseFileHeadersFieldSet: boolean = true;
  collapseCodeBlockFieldSet: boolean = true;

  ngAfterViewInit() {
    const formattedJson = JSON.stringify(sampleJsonData, undefined, 2);
    this.codeBlockElement.nativeElement.innerHTML = formattedJson;

    hljs.highlightElement(this.codeBlockElement.nativeElement);
  }

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.primengConfig.inputStyle.set('outlined');
  }

  getFileHeaders() {
    this.collapseFileUploadFieldSet = true;
    this.collapseFileHeadersFieldSet = false;

    this.fileHeaders = Array(50)
      .fill('Header 123')
      .map((_, i) => _ + (i + 1));
  }

  onImageError(event: Event) {
    console.log(event);
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
