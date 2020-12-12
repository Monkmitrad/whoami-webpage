import { ApiService } from './../services/api.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
  }

  onSubmit(loginForm: NgForm): void {
    if (loginForm.valid) {
      const user: string = loginForm.value.name;
      const id: number = loginForm.value.id;
      console.log(user, id);
      let userID: number = 0;
      // TODO: API Request to Server to validate Game-ID and register User for game
      this.apiService.addPlayer(user, id).subscribe((test) => userID = test);
      if (userID) {
        console.log(userID);
      }
      const apiResponse: boolean = true;
      if (apiResponse) {
        // login succesful and user registered for game
        // save userID in localStorage and send to game
        localStorage.setItem('userID', userID.toString());
        this.router.navigate(['/game']);
      }
    }
  }

}
