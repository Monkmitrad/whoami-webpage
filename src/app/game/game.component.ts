import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  users: string[] = [
    'User1',
    'User2',
    'User3',
    'User4'
  ];

  gameStarted: boolean = false;
  ownUser: string = "User2";

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(submissionForm: NgForm) {
    if (submissionForm.valid) {
      const entry: string = submissionForm.value.submission;
      console.log(entry);

      // TODO: API Request to Server to submit entry
    }
  }

  onReady(event: any) {
    console.log(event.target.checked);
  }

}
