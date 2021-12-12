import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class DataService {
  callsignPhoto: string;

  constructor(private http: HttpClient) {
  }

  fetch(url: string) {
    return this.http.get(url);
  }
}
