import { SocketService } from './../services/socket.service';
import { GameService } from './../services/game.service';
import { ApiService } from './../services/api.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

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
    private socketService: SocketService
  ) {}

  ngOnInit(): void {
    this.gameID = this.gameService.getGameID();
  }

  onSubmit(loginForm: NgForm): void {
    if (loginForm.valid) {
      const user: string = loginForm.value.name;
      const id: number = loginForm.value.id;

      let userID = this.gameService.getID();

      this.apiService.checkID(id).subscribe((valid: boolean) => {
        if (valid) {
          this.apiService
            .addPlayer(user, id, userID)
            .subscribe((responseId: { response: any }) => {
              if (responseId.response === false) {
                this.errorText = 'UserName already taken, please chose antother!';
              } else {
                userID = responseId.response;

                // send userName to GameService
                this.gameService.login(user);
                this.gameService.setGameID(id);

                // login succesful and user registered for game
                // save userID in localStorage and send to game

                localStorage.setItem('userID', userID);
                localStorage.setItem('userName', user);
                this.router.navigate(['/game']);
              }
            });
        } else {
          // console.log('GameID ', id, ' is not valid!');
          this.errorText = 'Game ID ' + id + ' is not valid!';
        }
      });
    }
  }
}
