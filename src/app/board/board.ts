/*
Board on ns. toiminnallinen eli "älykäs" komponentti joka sisältää
sovelluslogiikan.
*/

import { Component, OnInit } from '@angular/core';
import { Square } from '../square/square';
import { ScoreService } from '../score.service';
import { Score } from '../score';

@Component({
  selector: 'app-board',
  imports: [Square],
  templateUrl: './board.html',
  styleUrl: './board.css',
})
export class Board implements OnInit {
  constructor(private scoreService: ScoreService) {}
  /*Voidaan luottaa siihen, että propertyt eivät ole undefined (!-merkintä), 
    koska ne alustetaan newGame()-metodissa aina kun peli alkaa. Niitä on siis 
    turha alustaa konstruktorissa. 
  */
  squares!: string[]; // Taulukko jossa on pelin tila, eli arvoja: '', 'X', '0'
  xIsNext!: boolean; // Kertoo kumpi on seuraavaksi vuorossa
  winner!: string; // Kertoo voittajan '', 'X' tai '0'
  moves!: number; // Kertoo, montako siirtoa on tehty
  noWinner!: string; //käytetään tasapeli tilanteessa näyttämään "tasapeli"
  scores!: Score;

  ngOnInit() {
    this.newGame(); // newGame suoritetaan aina kun komponentti latautuu muistiin
    this.scores = this.scoreService.getScores();
  }
  // newGame() -metodin suoritus käynnistää uuden pelin
  newGame() {
    /*
    if (this.winner == 'X') {
      this.xIsNext == false;
    } else {
      this.xIsNext == true;
    }*/
    this.xIsNext = this.winner === 'X' ? false : true;

    // Kun uusi peli alkaa, pelin muuttujat alustetaan.
    // Squares-taulukkoon laitetaan 9 tyhjää paikkaa
    this.squares = Array(9).fill('');
    this.winner = '';
    this.moves = 0;
    this.noWinner = '';
  }

  /*
   Tässä on sovelluksen model eli tietomalli. Se muodostuu
   risteistä ja nollista jotka välitetään ruutuihin player-
   get propertyn kautta. Get property joka on TS:n piirre,
   tarjoilee vuorotellen ristin tai nollan.
   */
  get player() {
    // ternäärinen operaattori joka korvaa if-elsen
    return this.xIsNext ? 'X' : '0';
    /*
        if (this.xIsNext) {
            return 'X';
        } else {
            return '0';
        }
        */
  }

  // makeMove(index: number) laittaa ristin tai nollan squares -taulukkoon indeksiin index
  makeMove(index: number) {
    // if lause katsoo, onko winner olemassa
    if (this.winner) {
      return;
    }

    // Paikan johon risti tai nolla laitetaan pitää olla tyhjä, eli ''
    if (!this.squares[index]) {
      // splice-metodi poistaa indeksistä alkion ja laittaa
      // tilalle yhden alkion joka tulee this.player -get propertyltä
      this.squares.splice(index, 1, this.player);
      this.xIsNext = !this.xIsNext; // Vaihdetaan vuoroa
      this.moves += 1; // lisätään siirtoihin yksi lisää, kun ruutua klikataan
    }
    // Yritetään määritellä voittaja. Metodi tuottaa 'X', '0' tai ''
    // tilanteesta riippuen. Jos voittaja on olemassa, se näytetään templaatissa.
    this.winner = this.calculateWinner();

    if (this.moves === 9 && this.winner === '') {
      this.noWinner = 'Peli päättyi tasan';
    }
  }

  // Metodi joka määrittää pelin voittajan
  calculateWinner() {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (const line of lines) {
      const [a, b, c] = line;
      if (
        this.squares[a] &&
        this.squares[a] === this.squares[b] &&
        this.squares[a] === this.squares[c]
      ) {
        this.scoreService.addScore(this.squares[a]);
        this.scores = this.scoreService.getScores();
        return this.squares[a]; // palautetaan 'X' tai '0'
      }
    }
    return ''; // ei voittajaa
  }

  reset() {
    this.scoreService.initScores();
    this.scores = this.scoreService.getScores();
    this.newGame();
  }
}
