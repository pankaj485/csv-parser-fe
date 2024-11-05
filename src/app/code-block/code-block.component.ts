import { Component, ElementRef, ViewChild } from '@angular/core';
import hljs from 'highlight.js';
import json from 'highlight.js/lib/languages/json';
import 'highlight.js/styles/atom-one-dark.css';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { FieldsetModule } from 'primeng/fieldset';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { sampleJsonData } from '../../../db/samplejson';
import { StatesService } from '../services/states.service';

hljs.registerLanguage('json', json);
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

  messageLife: number = 1500;
  collapseCodeBlockFieldSet: boolean = true;

  ngAfterViewInit() {
    const formattedJson = JSON.stringify(sampleJsonData, undefined, 2);
    this.codeBlockElement.nativeElement.innerHTML = formattedJson;

    hljs.highlightElement(this.codeBlockElement.nativeElement);
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
