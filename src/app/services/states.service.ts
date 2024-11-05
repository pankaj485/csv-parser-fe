import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StatesService {
  constructor() {}

  messageLife: WritableSignal<number> = signal(100);
  maxFileSize: WritableSignal<number> = signal(1000000);

  uploadedFile!: WritableSignal<File>;
  fileHeaders: WritableSignal<string[]> = signal([]);
  selectedHeaders: WritableSignal<string[]> = signal([]);
  collapseFileUploadField: WritableSignal<boolean> = signal(false);

  setUploadedFile(file: File) {
    this.uploadedFile.set(file);
  }

  setFileHeaders(newHeaders: string[]) {
    this.fileHeaders.set(newHeaders);
  }

  setSelectedHeaders(newHeaders: string[]) {
    this.selectedHeaders.set(newHeaders);
  }
}
