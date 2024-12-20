import {CommonModule} from "@angular/common";
import {Component, OnInit} from "@angular/core";
import {CardService} from "../services/card.service";
import * as data from "../../faces.json";

@Component({
  selector: "app-tombola-card",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./tombola-card.component.html",
  styleUrl: "./tombola-card.component.css",
})
export class TombolaCardComponent implements OnInit {
  title = "Tombola";
  public uuid: any;
  public card: any = [];
  public cardWithFaces: any = [];
  private checkedForFirstRow = 0;
  private checkedForSecondRow = 0;
  private checkedForThirdRow = 0;
  public isAmboAvailable = true;
  public isTernaAvailable = true;
  public isQuaternaAvailable = true;
  public isCinquinaAvailable = true;

  constructor(private cardService: CardService) {}

  ngOnInit() {
    if (localStorage.getItem("card") === null) {
      this.card = this.cardService.generateCard();
    } else {
      const card = localStorage.getItem("card")!;
      this.card = card.split(",");
      this.card = this.card.map((n: any) => parseInt(n));
    }
    this.getFaces();
  }

  getFaces() {
    this.card.forEach((number: number) => {
      if (number === 0) {
        this.cardWithFaces.push(0);
      } else {
        let obj = data.faces.find((f) => f.number === number);
        this.cardWithFaces.push({...obj, checked: false});
      }
    });
  }

  generateNewCard() {
    this.checkedForFirstRow = 0;
    this.checkedForSecondRow = 0;
    this.checkedForThirdRow = 0;
    this.isAmboAvailable = true;
    this.isTernaAvailable = true;
    this.isQuaternaAvailable = true;
    this.isCinquinaAvailable = true;
    this.card = this.cardService.generateCard();
    this.cardWithFaces = [];
    this.getFaces();
  }

  handleClick(n: number) {
    const index = this.cardWithFaces.findIndex((cell: any) => cell.number === n);
    const checked = this.cardWithFaces[index].checked;
    if (checked === false) {
      this.cardWithFaces[index].checked = !checked;
      const positionIndex = this.card.findIndex((number: number) => number === n);
      const row = this.cardService.findRow(positionIndex);
      switch (row) {
        case 0:
          checked === false ? this.checkedForFirstRow++ : this.checkedForFirstRow--;
          break;
        case 1:
          checked === false ? this.checkedForSecondRow++ : this.checkedForSecondRow--;
          break;
        case 2:
          checked === false ? this.checkedForThirdRow++ : this.checkedForThirdRow--;
          break;
        default:
          break;
      }
      setTimeout(() => {
        this.checkForPrizes();
      }, 0);
    }
  }

  checkForPrizes() {
    if (
      this.isAmboAvailable &&
      (this.checkedForFirstRow === 2 || this.checkedForSecondRow === 2 || this.checkedForThirdRow === 2)
    ) {
      this.isAmboAvailable = false;
      alert("Ambo!");
    }
    if (
      this.isTernaAvailable &&
      (this.checkedForFirstRow === 3 || this.checkedForSecondRow === 3 || this.checkedForThirdRow === 3)
    ) {
      this.isTernaAvailable = false;
      alert("Terna!");
    }
    if (
      this.isQuaternaAvailable &&
      (this.checkedForFirstRow === 4 || this.checkedForSecondRow === 4 || this.checkedForThirdRow === 4)
    ) {
      this.isQuaternaAvailable = false;
      alert("Quaterna!");
    }
    if (
      this.isCinquinaAvailable &&
      (this.checkedForFirstRow === 5 || this.checkedForSecondRow === 5 || this.checkedForThirdRow === 5)
    ) {
      this.isCinquinaAvailable = false;
      alert("Cinquina!");
    }
    if (this.checkedForFirstRow + this.checkedForSecondRow + this.checkedForThirdRow === 15) {
      alert("TOMBOLA!");
    }
  }

  /**
   * implementare:
   * https://www.npmjs.com/package/random-seedable (con seed)
   */
}
