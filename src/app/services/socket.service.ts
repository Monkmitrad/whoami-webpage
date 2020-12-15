import { Constants } from './../config/constants';
import { Player } from './../shared/models/player';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  players: BehaviorSubject<Player[]> = new BehaviorSubject<Player[]>([]);
  status: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private socket;

  constructor(
    private constants: Constants
  ) {
    this.socket = io(this.constants.SOCKET_ENDPOINT);
    this.connect();

    this.socket.on('connect', () => {
      // console.log('Connected: ', this.socket.connected);
    });

    this.socket.on('disconnect', (reason: string) => {
      if (reason === 'io server disconnect') {
        // the disconnection was initiated by the server, you need to reconnect manually
        this.socket.connect();
      }
      // else the socket will automatically try to reconnect
    });

    this.socket.on('players', (players: Player[]) => {
      this.players.next(players);
    });

    this.socket.on('status', (status: boolean) => {
      this.status.next(status);
    });
  }

  connect(): void {
    this.socket.connect();
  }
}
