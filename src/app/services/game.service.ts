import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private ownName: string;
  private gameID: number;

  constructor() { }

  public login(playerName: string): void {
    this.ownName = playerName;
  }

  public getName(): string {
    if (this.ownName) {
      return this.ownName;
    } else {
      return localStorage.getItem('userName');
    }
  }

  public getID(): string {
    return localStorage.getItem('userID');
  }

  public getGameID(): number {
    if (this.gameID) {
      return this.gameID;
    } else {
      return;
    }
  }

  public setGameID(gameID: number): void {
    this.gameID = gameID;
  }
}
