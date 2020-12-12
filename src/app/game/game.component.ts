import { Player } from './../shared/models/player';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {

  players: Player[] = [];

  gameStarted: boolean = false;
  ownUser: string = 'Test';
  assignedUser: string = 'User1';

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.players = [];
    this.apiService.listPlayers().subscribe((players: Player[]) => {
      // console.log(players);
      players.forEach(element => {
        this.players.push(element);
      });
    });
  }

  onReady(event: any): void {
    const status: boolean = event.target.checked;
    // console.log(event.target.checked);
    if (status) {
      this.gameStarted = true;
    }

    // TODO: API Request to Server to make player ready
    this.apiService.playerReady(status, this.ownUser);
  }

  onSubmit(submissionForm: NgForm): void {
    if (submissionForm.valid) {
      const entry: string = submissionForm.value.submission;
      submissionForm.resetForm();
      console.log(entry);

      // TODO: API Request to Server to submit entry
      this.apiService.submission(entry, this.assignedUser);
    }
  }

}
