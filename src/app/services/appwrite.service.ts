import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

interface APIRES {
  success: boolean;
  message: string;
}

export interface FileUploadRes extends APIRES {
  fileId: string;
}

export interface FileHeaderRes extends APIRES {
  data: string[];
}

export interface FileDataRes extends APIRES {
  data: { [key: string]: string }[];
}

export interface fileDataPayload {
  file_id: string;
  header_row: number;
  headers: string[];
}

@Injectable({
  providedIn: 'root',
})
export class AppwriteService {
  private httpClient = inject(HttpClient);

  private BASE_URL = 'https://csv-parser-ts.koyeb.app';
  private API_VERSION = 'api/v2';
  private URL_ENDPOINTS = {
    FILE_UPLOAD: `${this.BASE_URL}/${this.API_VERSION}/upload-file`,
    FILE_HEADERS: `${this.BASE_URL}/${this.API_VERSION}/get-file-headers`,
    FILE_DATA: `${this.BASE_URL}/${this.API_VERSION}/get-file-data`,
  };

  uploadFile(file: File) {
    let formData = new FormData();
    formData.append('csvfile', file);

    return this.httpClient.post<FileUploadRes>(
      this.URL_ENDPOINTS.FILE_UPLOAD,
      formData
    );
  }

  getFileHeaders(fileId: string) {
    const paylod = {
      file_id: fileId,
      header_row: 1,
    };

    return this.httpClient.post<FileHeaderRes>(
      this.URL_ENDPOINTS.FILE_HEADERS,
      paylod
    );
  }

  getFileData(payload: fileDataPayload) {
    return this.httpClient.post<FileDataRes>(
      this.URL_ENDPOINTS.FILE_DATA,
      payload
    );
  }
}
