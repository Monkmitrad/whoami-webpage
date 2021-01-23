import { GameService } from './../services/game.service';
import { ApiService } from './../services/api.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-startup',
  templateUrl: './startup.component.html',
  styleUrls: ['./startup.component.css']
})
export class StartupComponent implements OnInit {

  constructor(
    private apiService: ApiService,
    private gameService: GameService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  create(): void {
    this.apiService.createGame().subscribe((gameID: number) => {
      this.gameService.setGameID(gameID);
      this.router.navigate(['login']);
    });
  }

}
