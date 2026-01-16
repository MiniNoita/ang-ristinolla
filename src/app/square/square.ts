import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-square',
  imports: [NgClass],
  templateUrl: './square.html',
  styleUrl: './square.css',
})
export class Square {
  /* input() tarkoittaa, että value-propertyn arvo
     tulee signaalimuotoisena syötteenä sisään 
     äitikomponentilta eli board-komponentilta.
  */
  value = input();

  index = input();

  line = input<number[]>([]);
}
