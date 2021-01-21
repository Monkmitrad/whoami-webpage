import { GameService } from './../services/game.service';
import { SocketService } from './../services/socket.service';
import { Player } from './../shared/models/player';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit, OnDestroy, AfterViewInit {

  players: Player[] = [];

  gameStarted = false;
  playerName: string;
  assignedUser: string;
  gameID: number;

  // Subscriptions
  listPlayersSub: Subscription;
  playerSocketSub: Subscription;
  statusSocketSub: Subscription;

  constructor(
    private apiService: ApiService,
    private socketService: SocketService,
    private gameService: GameService,
    private router: Router
  ) {
    this.socketService.connect();
  }

  ngOnInit(): void {
    const jwt: string = localStorage.getItem('jwt');
    if (jwt) {
      // check if token valid and game still exists
      this.apiService.rejoin(jwt).subscribe((status: boolean) => {
        if (status) {
          // game still exists
        } else {
          
          
        }
      });
    }
    this.gameID = this.gameService.getGameID();
    
    if (!this.gameID) {
      this.router.navigate(['login']);
      return;
    }

    this.playerName = this.gameService.getName();

    this.playerSocketSub = this.socketService.players.subscribe((players: Player[]) => {
      this.players = players;
    });
    this.statusSocketSub = this.socketService.status.subscribe((status: boolean) => {
      this.gameStarted = status;
    });
  }
  
  ngAfterViewInit(): void {
    this.socketService.connect();
  }

  ngOnDestroy(): void {
    if (this.playerSocketSub) {
      this.playerSocketSub.unsubscribe();
    }
    this.socketService.disconnect();
  }

  onReady(event: any): void {
    const status: boolean = event.target.checked;

    this.apiService.playerReady(this.gameService.getGameID(), this.playerName, status, this.gameService.getToken());
  }

  onSubmit(submissionForm: NgForm): void {
    if (submissionForm.valid) {
      const entry: string = submissionForm.value.submission;
      submissionForm.resetForm();

      // TODO: API Request to Server to submit entry
      this.assignedUser = this.players.find((player) => player.name === this.playerName).assignedPlayer;
      this.apiService.submission(this.gameID, this.assignedUser, entry, this.gameService.getToken()).subscribe((response: boolean) => console.log(response));
    }
  }
}
