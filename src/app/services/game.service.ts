import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private ownName: string;

  constructor() { }

  public login(playerName: string): void {
    this.ownName = playerName;
  }

  public getName(): string {
    return this.ownName;
  }
}
