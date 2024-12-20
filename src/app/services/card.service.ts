import {Injectable} from "@angular/core";
import random from "random-seedable";
import {XORShift} from "random-seedable";
import {v6 as uuidv6} from "uuid";

@Injectable({
  providedIn: "root",
})
export class CardService {
  constructor() {}

  public uuid: any;
  public card: any = [];

  private intervals = [
    [1, 9],
    [10, 19],
    [20, 29],
    [30, 39],
    [40, 49],
    [50, 59],
    [60, 69],
    [70, 79],
    [80, 90],
  ];

  private intervalPositions = [
    [0, 9, 18],
    [1, 10, 19],
    [2, 11, 20],
    [3, 12, 21],
    [4, 13, 22],
    [5, 14, 23],
    [6, 15, 24],
    [7, 16, 25],
    [8, 17, 26],
  ];

  private availablePositions: number[] = [];

  generateCard() {
    this.uuid = uuidv6();
    for (let i = 0; i < 27; i++) {
      this.card[i] = 0;
      this.availablePositions.push(i);
    }

    while (this.cardNumberCount() !== 15) {
      const randomPosition = this.generatePosition();

      const row = this.findRow(randomPosition);

      const index = this.intervalPositions.findIndex((p) => p.includes(randomPosition));
      const intervals = this.intervals[index];

      const numbersPerRow = this.countNumbersInRow(row);

      const element = this.card[randomPosition];

      if (element === 0 && numbersPerRow < 5) {
        const number = this.generateNumber(intervals[0], intervals[1]);
        this.card[randomPosition] = number;
      }
    }
    this.sortNumbers();
    localStorage.setItem("card", this.card);
    return this.card;
  }

  generateNumber(min: number, max: number) {
    let availableNumbers = [];
    for (let i = min; i <= max; i++) {
      let index = this.card.indexOf(i);
      if (index === -1) {
        availableNumbers.push(i);
      }
    }
    const number = random.choice(availableNumbers);
    return number;
  }

  generatePosition() {
    const position = random.choice(this.availablePositions);
    let index = this.availablePositions.indexOf(position);
    this.availablePositions.splice(index, 1);
    return position;
  }

  countNumbersInRow(row: any) {
    let numbers = 0;
    this.intervalPositions.forEach((element) => {
      if (this.card[element[row]] !== 0) {
        numbers++;
      }
    });
    return numbers;
  }

  findEmptyColumn() {
    
  }

  countNumbersInColumn(column: any) {
    let numbers = 0;
    const positions = this.intervalPositions[column];
    positions.forEach((position) => {
      if (this.card[position] !== 0) {
        numbers++;
      }
    });
    return numbers;
  }

  findRow(positionIndex: any): any {
    let row;
    this.intervalPositions.forEach((position) => {
      if (position.includes(positionIndex)) {
        const index = position.indexOf(positionIndex);
        row = index;
      }
    });
    return row;
  }

  findColumn(positionIndex: any): any {
    let column;
    this.intervalPositions.forEach((position) => {
      if (position.includes(positionIndex)) {
        const index = this.intervalPositions.indexOf(position);
        column = index;
      }
    });
    return column;
  }

  cardNumberCount(): number {
    let count = 0;
    this.card.forEach((element: number) => {
      element !== 0 ? count++ : null;
    });
    return count;
  }

  sortNumbers() {
    for (let i = 0; i < 9; i++) {
      const positions = this.intervalPositions[i];
      let numbers: number[] = [];

      positions.forEach((p) => {
        const number = this.card[p];
        if (number !== 0) {
          numbers.push(number);
        }
      });

      numbers.sort((a, b) => a - b);

      let numbersIndex = 0;
      positions.forEach((p) => {
        if (this.card[p] !== 0) {
          this.card[p] = numbers[numbersIndex];
          numbersIndex++;
        }
      });
    }
  }
}
