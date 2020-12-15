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
      // console.log(user, id);
      let userID = '';

      this.apiService.checkID(id).subscribe((valid: boolean) => {
        if (valid) {
          this.gameService.setGameID(id);
          this.apiService
            .addPlayer(user, id)
            .subscribe((responseId: { response: string }) => {
              userID = responseId.response;

              // send userName to GameService
              this.gameService.login(user);

              // login succesful and user registered for game
              // save userID in localStorage and send to game

              localStorage.setItem('userID', userID);
              localStorage.setItem('userName', user);
              this.router.navigate(['/game']);
            });
        } else {
          console.log('GameID ', id, ' is not valid!');
        }
      });
    }
  }
}
