import { Component } from '@angular/core';
import {
  ConfirmationService,
  Message,
  MessageService,
  PrimeNGConfig,
} from 'primeng/api';
import { Messages, MessagesModule } from 'primeng/messages';
import { CodeBlockComponent } from './code-block/code-block.component';
import { FileHeadersComponent } from './file-headers/file-headers.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { HeaderComponent } from './header/header.component';
import { StatesService } from './services/states.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    CodeBlockComponent,
    FileUploadComponent,
    FileHeadersComponent,
    MessagesModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [MessageService, ConfirmationService],
})
export class AppComponent {
  constructor(
    private primengConfig: PrimeNGConfig,
    public statesService: StatesService
  ) {}

  fileHeadersLoadingMessage: Message[] = [
    {
      detail: 'Getting File Headers',
      severity: 'info',
    },
  ];

  parsedDataLoadingMessage: Message[] = [
    {
      detail: 'Getting Parsed Data',
      severity: 'info',
    },
  ];

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.primengConfig.inputStyle.set('outlined');
  }
}
