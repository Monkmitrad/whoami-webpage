import { GameService } from './../services/game.service';
import { SocketService } from './../services/socket.service';
import { Player } from './../shared/models/player';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit, OnDestroy {

  players: Player[] = [];

  gameStarted = false;
  ownUser: string;
  assignedUser: string;
  gameID: number;

  // Subscriptions
  listPlayersSub: Subscription;
  playerSocketSub: Subscription;
  statusSocketSub: Subscription;

  constructor(
    private apiService: ApiService,
    private socketService: SocketService,
    private gameService: GameService
  ) { }

  ngOnInit(): void {

    this.playerSocketSub = this.socketService.players.subscribe((players: Player[]) => {
      this.players = players;
    });
    this.statusSocketSub = this.socketService.status.subscribe((status: boolean) => {
      this.gameStarted = status;
    });
    // console.log(this.gameService.getGameID());
    /*
    this.listPlayersSub = this.apiService.listPlayers(this.gameService.getGameID()).subscribe((players: Player[]) => {
      // console.log(players);
      this.players = [];
      players.forEach(element => {
        this.players.push(element);
      });
    });
    */

    this.ownUser = this.gameService.getName();
    this.gameID = this.gameService.getGameID();
  }

  ngOnDestroy(): void {
    // this.listPlayersSub.unsubscribe();
    this.playerSocketSub.unsubscribe();
  }

  onReady(event: any): void {
    const status: boolean = event.target.checked;
    // console.log(event.target.checked);

    this.apiService.playerReady(status, this.gameService.getID(), this.gameService.getGameID());
  }

  onSubmit(submissionForm: NgForm): void {
    if (submissionForm.valid) {
      const entry: string = submissionForm.value.submission;
      submissionForm.resetForm();
      // console.log(entry);

      // TODO: API Request to Server to submit entry
      this.assignedUser = this.players.find((player) => player.name === this.ownUser).assignedPlayer;
      this.apiService.submission(entry, this.assignedUser, this.gameService.getGameID()).subscribe((response: boolean) => {
        console.log(response);
      });
    }
  }

}
