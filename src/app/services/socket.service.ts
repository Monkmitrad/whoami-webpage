import { Player } from './../shared/models/player';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  players: BehaviorSubject<Player[]> = new BehaviorSubject<Player[]>([]);

  constructor(private socket: Socket) {
    // this.connect();

    this.socket.on('disconnect', () => {
      console.log('Disconnected');
    });

    this.socket.on('refresh', (players: Player[]) => {
      this.players.next(players);
    });
  }

  connect(): void {
    this.socket.connect();
  }
}
