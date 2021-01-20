import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private playerName: string;
  private gameID: number;
  private jwt: string;

  constructor() { }

  public login(playerName: string): void {
    this.playerName = playerName;
  }

  public getName(): string {
    return this.playerName;
  }

  public getGameID(): number {
    if (this.gameID) {
      return this.gameID;
    }
  }

  public setGameID(gameID: number): void {
    this.gameID = gameID;
  }

  getToken(): string {
    return this.jwt;
  }
  
  setToken(token: string): void {
    this.jwt = token;
    localStorage.setItem('jwt', token);
  }
}
