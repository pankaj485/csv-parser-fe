import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

interface FileHeaderRes {
  success: boolean;
  message: string;
  fielId?: string;
  headers?: string[];
}

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  constructor(private http: HttpClient) {}

  LOCAL_URL = 'http://localhost:8000';
  API_VERSION = 'api/v1';
  URL_ENDPOINTS = {
    FILE_UPLOAD: 'upload-file',
    FILE_PARSE: 'get-csv-data-by-headers',
    LIST_FILES: 'list-files',
  };

  BASE_URL = `${this.LOCAL_URL}/${this.API_VERSION}`;

  getFileHeaders(file: File): Observable<FileHeaderRes> {
    const formData = new FormData();
    formData.append('csvfile', file);

    return this.http
      .post<FileHeaderRes>(
        `${this.BASE_URL}/${this.URL_ENDPOINTS.FILE_UPLOAD}`,
        formData
      )
      .pipe(
        catchError((error) => {
          console.error('Error occurred:', error);
          return throwError(error);
        })
      );
  }
}
