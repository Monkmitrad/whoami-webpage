import { getTestBed } from '@angular/core/testing';
import { ApiService } from './api.service';
import { Constants } from './../config/constants';
import { Player } from './../shared/models/player';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { GameService } from './game.service';
import { Game } from '../shared/models/game';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  players: BehaviorSubject<Player[]> = new BehaviorSubject<Player[]>([]);
  status: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private socket: Socket;

  constructor(
    private constants: Constants,
    private apiService: ApiService,
    private gameService: GameService
  ) {
    const gameID = this.gameService.getGameID();
    if (gameID) {
      this.socket = io(this.constants.SOCKET_ENDPOINT, {query: {gameID: gameID}});
      this.connect();
    } else {
      this.socket = io(this.constants.SOCKET_ENDPOINT, {query: {gameID: 0}});
      this.connect();
    }

    this.socket.on('connect', () => {
      // console.log('Connected: ', this.socket.connected);
    });

    this.socket.on('disconnect', (reason: string) => {
//      console.log('Disconnected');
      if (reason === 'io server disconnect') {
        // the disconnection was initiated by the server, you need to reconnect manually
        this.socket.connect();
      }
      // else the socket will automatically try to reconnect
    });

    this.socket.on('refresh', () => {
      // trigger ApiService to fetch gameData
      this.apiService.getData(this.gameService.getToken()).subscribe((gameData: Game) => {
        this.status.next(gameData.gameStatus);
        this.players.next(gameData.players);
      });
    });
  }

  public connect(): void {
    // console.log('Connect socket ', this.socket);
    this.socket.connect();
  }

  public disconnect(): void {
    // console.log('Initiate disconnect');
    if (this.socket) {
      this.socket.close();
      this.socket = io(this.constants.SOCKET_ENDPOINT, {query: {gameID: 0}});
    }
  }

  public setSocket(gameID: number): void {
    this.socket = io(this.constants.SOCKET_ENDPOINT, {query: {gameID: gameID}});
  }
}
