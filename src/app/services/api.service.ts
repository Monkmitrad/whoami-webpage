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
    return this.http.get(this.constants.API_ENDPOINT + url, options);
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

  // creates a new game and returns gameID
  public createGame(): Observable<number> {
    return this.post('create').pipe(map((response: {response: number}) => response.response));
  }

  // registers player and return unique id of player
  public addPlayer(playerName: string, gameID: number, playerID?: string): any {
    return this.post('add', {
      playerName,
      gameID,
      playerID
    });
  }

  // returns all players
  public listPlayers(gameID: number): Observable<Player[]> {
    return this.post('players', {gameID});
  }

  public playerReady(status: boolean, id: string, gameID: number): void {
    // send POST request to api with playerReady status
    this.post('ready', {
      id,
      status,
      gameID
    }).subscribe((response) => response);
  }

  public submission(submissionText: string, playerName: string, gameID: number): Observable<boolean> {
    return this.post('submission', {
      playerName,
      submissionText,
      gameID
    }).pipe(map((response: {response: boolean}) => response.response));
  }

  public checkID(id: number): Observable<boolean> {
    return this.post('id', {gameID: id}).pipe(map((response: {response: boolean}) => response.response));
  }
}
