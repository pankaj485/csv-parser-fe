import { Component, ElementRef, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { FieldsetModule } from 'primeng/fieldset';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { StatesService } from '../services/states.service';

@Component({
  selector: 'app-code-block',
  standalone: true,
  imports: [ButtonModule, FieldsetModule, ScrollPanelModule],
  templateUrl: './code-block.component.html',
  styleUrl: './code-block.component.css',
})
export class CodeBlockComponent {
  constructor(
    private messageService: MessageService,
    public statesService: StatesService
  ) {}
  @ViewChild('codeBlock') codeBlockElement!: ElementRef;

  copyToClipBoard() {
    const data: string = this.codeBlockElement.nativeElement.innerText;
    window.navigator.clipboard.writeText(data).then(() => {
      this.messageService.add({
        severity: 'info',
        summary: 'Success!',
        detail: 'JSON data copied to Clipboard',
        life: this.statesService.messageLife(),
      });
    });
  }
}
