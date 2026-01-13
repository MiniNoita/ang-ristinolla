/*score.service.ts sisältää metodit localstoragen käsittelyyn.
Tämä service otetaan käyttöön Board -komponetin konstruktorissa
seuravasti: constructor(private scoreService: ScoreService)
*/

import { Injectable } from '@angular/core';
import { Score } from './score';

@Injectable({
  providedIn: 'root',
})
export class ScoreService {
  // huomaa että nollan sijasta avaimena on iso O
  scoreobj: Score = { X: 0, O: 0 };

  public initScores() {
    localStorage.setItem('scores', JSON.stringify(this.scoreobj));
  }

  public getScores() {
    // jos itemiä ei ole localStoragessa, palautetaan tyhjä olio
    return JSON.parse(localStorage.getItem('scores') || '{}');
  }

  public addScore(winner: string) {
    const scores = this.getScores();
    console.log(winner);
    if (winner === 'X') {
      scores.X++;
    } else {
      scores.O++;
    }
    localStorage.setItem('scores', JSON.stringify(scores));
  }
}
