import { Component, inject } from '@angular/core';
import { FileUploadComponent } from '../file-upload/file-upload.component';
import { FileHeadersComponent } from '../file-headers/file-headers.component';
import { CodeBlockComponent } from '../code-block/code-block.component';
import { StatesService } from '../services/states.service';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';

@Component({
  selector: 'app-file-parser',
  standalone: true,
  imports: [
    FileUploadComponent,
    FileHeadersComponent,
    CodeBlockComponent,
    MessagesModule,
  ],
  templateUrl: './file-parser.component.html',
  styleUrl: './file-parser.component.css',
  providers: [ConfirmationService, MessageService],
})
export class FileParserComponent {
  statesService = inject(StatesService);

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
}
