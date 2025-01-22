import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { StatesService } from '../services/states.service';
import Prism from 'prismjs';
import 'prismjs/components/prism-json';
import { CardComponent } from '../shared/card/card.component';

@Component({
  selector: 'app-code-block',
  standalone: true,
  imports: [ButtonModule, ScrollPanelModule, CardComponent],
  templateUrl: './code-block.component.html',
  styleUrl: './code-block.component.css',
})
export class CodeBlockComponent implements AfterViewInit, AfterViewChecked {
  constructor(
    private messageService: MessageService,
    public statesService: StatesService
  ) {}
  @ViewChild('codeBlock') codeBlockElement!: ElementRef;

  ngAfterViewInit(): void {
    Prism.highlightElement(this.codeBlockElement.nativeElement);
  }

  ngAfterViewChecked(): void {
    Prism.highlightElement(this.codeBlockElement.nativeElement);
  }

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
