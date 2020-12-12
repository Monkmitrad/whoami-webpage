import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../config/constants';
import { tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Player } from '../shared/models/player';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
    private constants: Constants
  ) { }

  // default methods

  public get(url: string, options?: any): any {
    return this.http.get(this.constants.API_ENDPOINT + url, options).pipe(tap((response: any) => response));
  }

  public post(url: string, data?: any, options?: any): Observable<any> {
    return this.http.post(this.constants.API_ENDPOINT + url, data, options);
  }

  public put(url: string, data?: any, options?: any): any {
    return this.http.put(this.constants.API_ENDPOINT + url, data, options);
  }

  public delete(url: string, options?: any): any {
    return this.http.delete(this.constants.API_ENDPOINT + url, options);
  }

  // special methods

  // registers player and return unique id of player
  public addPlayer(playerName: string, gameID: number): any {
    return this.post('add', {
      playerName,
      gameID
    }).pipe(map((response: {
      response: number
    }) => {
      return response.response;
    }));
  }

  public listPlayers(): Observable<Player[]> {
    return this.get('players');
  }

  public playerReady(status: boolean, playerName: string): void {
    // send POST request to api with playerReady status
    this.post('ready', {
      name: playerName,
      status
    }).subscribe((response) => console.log(response));
  }

  public submission(submissionText: string, playerName: string): void {
    this.post('submission', {
      playerName,
      submissionText
    }).subscribe((response) => console.log(response));
  }

}
