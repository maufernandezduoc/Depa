import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GoogleDriveService {
  private API_URL = 'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart';

  constructor(private http: HttpClient) { }

  uploadFile(formData: FormData): Observable<any> {
    try {
      const accessToken = this.getAccessToken();
      const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
      return this.http.post(this.API_URL, formData, { headers });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  

  private getAccessToken(): string {
    // Código para obtener el token de acceso
    const accessToken = {
      "kind": "drive#startPageToken",
      "startPageToken": "64749"
    }; // Obtén el token de acceso de alguna manera
    return accessToken.startPageToken;
  }
  
}
