import { Injectable, signal, WritableSignal } from '@angular/core';
import { sampleJsonData } from '../../../db/samplejson';

@Injectable({
  providedIn: 'root',
})
export class StatesService {
  constructor() {}

  messageLife: WritableSignal<number> = signal(1500);
  maxFileSize: WritableSignal<number> = signal(1000000);

  collapseFileUploadField: WritableSignal<boolean> = signal(false);
  collapseHeadersField: WritableSignal<boolean> = signal(true);
  collapseCodeField: WritableSignal<boolean> = signal(true);

  uploadedFile: WritableSignal<File | null> = signal(null);
  fileHeaders: WritableSignal<string[]> = signal([]);
  selectedHeaders: WritableSignal<string[]> = signal([]);

  parsedJson: WritableSignal<string> = signal(
    JSON.stringify(sampleJsonData, undefined, 2)
  );

  setSelectedHeaders(value: string[]) {
    this.selectedHeaders.set(value);
  }

  getFileHeaders() {
    this.fileHeaders.set(
      Array(10)
        .fill('')
        .map((_, i) => String('header ' + (i + 1)))
    );
  }

  getParsedData() {
    return this.parsedJson();
  }
}
