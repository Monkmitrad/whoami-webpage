import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../config/constants';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
    private constants: Constants
  ) { }

  // default methods

  public get(url: string, options?: any) {
    return this.http.get(this.constants.API_ENDPOINT + url, options);
  }
  
  public post(url: string, data?: any, options?: any) {
    return this.http.post(this.constants.API_ENDPOINT + url, data, options);
  }

  public put(url: string, data?: any, options?: any) {
    return this.http.put(this.constants.API_ENDPOINT + url, data, options);
  }

  public delete(url: string, options?: any) {
    return this.http.delete(this.constants.API_ENDPOINT + url, options);
  }

  // special methods
  
  /**
   * playerReady
   */
  public playerReady(status: boolean, playerName: string) {
    // send POST request to api with playerReady status
    this.post('ready', {
      name: playerName,
      status: status
    });
  }

}