import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  constructor(private http: HttpClient) { }
  
  async getPhotos() {
    let response = await this.http.get("https://jsonplaceholder.typicode.com/photos").toPromise();
    //console.log(response);
    return response;
  }

}
