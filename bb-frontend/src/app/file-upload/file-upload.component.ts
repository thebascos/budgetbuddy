import { Component } from '@angular/core';
import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css'],
})
export class FileUploadComponent {
  fileName: string | null = null;
  selectedFile: File | null = null;
  uploadProgress: number | null = null;
  uploadSub: Subscription | null = null;
  authToken: string | null = null; // New property for the token

  constructor(private http: HttpClient, private authService: AuthService) {
    this.authToken = localStorage.getItem('token'); // Retrieve the token during component initialization
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.fileName = this.selectedFile ? this.selectedFile.name : null;
    this.uploadProgress = null;
  }

  onSubmit() {
    if (this.selectedFile && this.authToken) {
      // Check if the token is available
      const formData = new FormData();
      formData.append('file', this.selectedFile);

      const headers = new HttpHeaders({
        Authorization: `Bearer ${this.authToken}`,
      });

      this.uploadSub = this.http
        .post<any>(`${this.authService.url}/auth/upload-file`, formData, {
          headers,
          reportProgress: true,
          observe: 'events',
        })
        .subscribe((event) => {
          if (event.type === HttpEventType.UploadProgress) {
            if (event.total) {
              this.uploadProgress = Math.round(
                (100 * event.loaded) / event.total
              );
            }
          } else if (event.type === HttpEventType.Response) {
            this.selectedFile = null;
            this.fileName = null;
            this.uploadProgress = null;
          }
        });
    }
  }

  cancelUpload() {
    if (this.uploadSub) {
      this.uploadSub.unsubscribe(); // Cancel the upload
      this.uploadProgress = null; // Reset the progress indicator
    }
  }
}
