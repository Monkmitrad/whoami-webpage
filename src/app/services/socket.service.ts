import { getTestBed } from '@angular/core/testing';
import { ApiService } from './api.service';
import { Constants } from './../config/constants';
import { Player } from './../shared/models/player';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { GameService } from './game.service';
import { Game } from '../shared/models/game';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socket: Socket;

  players: BehaviorSubject<Player[]> = new BehaviorSubject<Player[]>([]);
  status: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  start: Subject<boolean> = new Subject<boolean>();

  constructor(
    private constants: Constants,
    private apiService: ApiService,
    private gameService: GameService
  ) {
    this.socket = io(this.constants.SOCKET_ENDPOINT, { autoConnect: false });

    this.socket.on('connect', () => {
      // console.log(this.socket.connected);
    });

    this.socket.on('disconnect', (reason: string) => {
      if (reason === 'io server disconnect') {
        // the disconnection was initiated by the server, you need to reconnect manually
        this.socket.connect();
      }
      // else the socket will automatically try to reconnect
    });

    this.socket.on('refresh', () => {
      // trigger ApiService to fetch gameData
      console.log('Refresh');
      this.apiService.getData(this.gameService.getToken()).subscribe((gameData: Game) => {
        this.status.next(gameData.gameStatus);
        this.players.next(gameData.players);
      });
    });

    this.socket.on('start', () => {
      // all players have submitted, notify player that guessing can start
      this.start.next(true);
    });
  }

  public connect(): void {
    this.socket.connect();
  }

  public disconnect(): void {
    if (this.socket) {
      this.socket.close();
    }
  }
  
  setSocket(gameID: number): void {
    this.socket.io.opts.query = { gameID: gameID.toString() };
    this.socket.connect();
  }
}
