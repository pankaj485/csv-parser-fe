import { Injectable, signal, WritableSignal } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class StatesService {
  constructor(private sanitizer: DomSanitizer) {}

  messageLife: WritableSignal<number> = signal(1500);
  maxFileSize: WritableSignal<number> = signal(1000000);

  collapseFileUploadField: WritableSignal<boolean> = signal(false);
  collapseHeadersField: WritableSignal<boolean> = signal(true);
  collapseCodeField: WritableSignal<boolean> = signal(true);

  uploadedFile: WritableSignal<File | null> = signal(null);
  fileId: WritableSignal<string> = signal('');
  fileHeaders: WritableSignal<string[]> = signal([]);
  selectedHeaders: WritableSignal<string[]> = signal([]);

  parsedJson: WritableSignal<string> = signal('');

  isFileHeadersReceived: WritableSignal<boolean> = signal(false);
  isParsedDataReceived: WritableSignal<boolean> = signal(false);
  isFileHeadersLoading: WritableSignal<boolean> = signal(false);
  isParsedDataLoading: WritableSignal<boolean> = signal(false);

  getSanitizedHTML(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(this.parsedJson());
  }

  getParsedData() {
    return this.parsedJson();
  }

  resetUIstates() {
    // loader configurations
    this.isFileHeadersReceived.set(false);
    this.isParsedDataReceived.set(false);

    // fields collapse configurations
    this.collapseCodeField.set(true);
    this.collapseHeadersField.set(true);

    // header data and code data configurations
    this.selectedHeaders.set([]);
    this.fileHeaders.set([]);
    this.parsedJson.set('');
  }
}
