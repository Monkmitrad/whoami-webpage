import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SocketService } from './../services/socket.service';
import { GameService } from './../services/game.service';
import { ApiService } from './../services/api.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Game } from '../shared/models/game';
import { RouterTestingModule } from '@angular/router/testing';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  gameID: number;
  errorText: string;

  constructor(
    private router: Router,
    private apiService: ApiService,
    private gameService: GameService,
  ) {}

  ngOnInit(): void {
    this.gameID = this.gameService.getGameID();
  }

  onSubmit(loginForm: NgForm): void {
    if (loginForm.valid) {
      const user: string = loginForm.value.name;
      const id: number = loginForm.value.id;

      this.apiService.login(id, user).subscribe((response: any) => {
        switch (response) {
          case 'Username already taken':
            this.errorText = response;
            break;
          case 'Invalid gameID':
            this.errorText = response;
            break;
          case 'Internal server error on login':
            this.errorText = response;
            break;
          case 'Game has already started':
            this.errorText = response;
            break;
          case 'playerName not valid':
            this.errorText = response;
            break;
          default:
            this.gameService.setToken(response.response);
            this.gameService.setGameID(id);
            this.gameService.login(user);
            this.router.navigate(['game']);
            break;
        }
      });
    }
  }
}
