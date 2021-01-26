import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../config/constants';
import { tap, map, catchError } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import { Player } from '../shared/models/player';
import { Game } from '../shared/models/game';
import { errorMonitor } from 'events';

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
    return this.http.post(this.constants.API_ENDPOINT + url, data, options).pipe(
      catchError((err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.error.response) {
            // Error created by the game logic
            return of(err.error.response);  
          }
        }
        console.log(err);

        return throwError(err);    //Rethrow it back to component
      })
    );
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
  public login(gameID: number, playerName: string): any {
    return this.post('login', {
      gameID,
      playerName
    });
  }

  // returns all players
  public listPlayers(gameID: number): Observable<Player[]> {
    return this.post('players', {gameID});
  }

  public playerReady(gameID: number, playerName: string, status: boolean, token: string): void {
    // send POST request to api with playerReady status
    this.post('ready', {
      gameID,
      playerName,
      status,
    }, {headers: new HttpHeaders().set('Authorization', token)}).subscribe((response) => response);
  }

  public submission(gameID: number, playerName: string, entry: string, token: string): Observable<boolean> {
    return this.post('submit', {
      gameID,
      playerName,
      entry
    }, {headers: new HttpHeaders().set('Authorization', token)}).pipe(map((response: {response: boolean}) => response.response));
  }

  public checkID(id: number): Observable<boolean> {
    return this.post('id', {gameID: id}).pipe(map((response: {response: boolean}) => response.response));
  }

  // get current gameData
  public getData(token: string): Observable<Game> {
    return this.get('data', {headers: new HttpHeaders().set('Authorization', token)}).pipe(map((response: {response: Game}) => response.response));
  }

  public rejoin(token: string): Observable<boolean> {
    return of(true);
  }

  disconnect(gameID: number, playerName: string, token: string): void {
    this.post('disconnect', {gameID, playerName}, {headers: new HttpHeaders().set('Authorization', token)}).subscribe((response) => console.log(response));
  }
}
