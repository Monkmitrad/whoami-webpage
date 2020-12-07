import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(loginForm: NgForm) {
    if (loginForm.valid) {
      const user: string = loginForm.value.name;
      const id: string = loginForm.value.id;
      console.log(user, id);

      // TODO: API Request to Server to validate Game-ID and register User for game

      const apiResponse: boolean = true;
      const userID: number = 1337;
      if (apiResponse) {
        // login succesful and user registered for game
        // save userID in localStorage and send to game
        localStorage.setItem('userID', userID.toString());
        this.router.navigate(['/game']);
      }
    }
  }

}
