import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }

}
