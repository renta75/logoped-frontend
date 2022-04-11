import { Component } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { GenerateWordsDTO } from './domain/generateWordsDTO';
import { GeneratorService } from './service/generator.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'wg-ng';

  wordLength: number = 3;
  columns: number = 6;
  rows: number = 25;
  fontSizeSelected: SelectItem;

  textCaseSelected: SelectItem;

  textCases!: SelectItem[];

  fontSizes!: SelectItem[];
  syllables: string = "BA, BE, BI, BO, BU, CA, CE, CI, CO, CU, DA, DE, DI, DO, DU, FA, FE, FI, FO, FU, GA, GE, GI, GO, GU, HA, HE, HI, HO, HU, JA, JE, JI, JO, JU, KA, KE, KI, KO, KU, LA, LE, LI, LO, LU, MA, ME, MI, MO, MU, NA, NE, NI, NO, NU, PA, PE, PI, PO, PU, RA, RE, RI, RO, RU, SA, SE, SI, SO, SU, TA, TE, TI, TO, TU, VA, VE, VI, VO, VU, ZA, ZE, ZI, ZO, ZU"


  cols!: any[];
  words!: string[][];






  constructor(private generatorService: GeneratorService) {
    this.textCases = [
      { label: 'All Lower', value: 'al' },
      { label: 'All Upper', value: 'au' },
      { label: 'First Upper', value: 'fu' }
    ];

    this.fontSizes = [
      { label: 'small', value: { 'font-size': 'small' } },
      { label: 'medium', value: { 'font-size': 'medium' } },
      { label: 'large', value: { 'font-size': 'large' } },
      { label: 'x-large', value: { 'font-size': 'x-large' } },
      { label: 'xx-large', value: { 'font-size': 'xx-large' } }
    ];
    this.textCaseSelected = this.textCases[0];
    this.fontSizeSelected = this.fontSizes[0];


  }

  transformData() {

    switch (this.textCaseSelected.value) {
      case "au":
        var data: any = [];
        for (var i = 0; i < this.rows; i++) {
          data[i] = [];
          for (var j = 0; j < this.columns; j++) {
            data[i][j] = this.words[i][j].toUpperCase();
          }
        }
        this.words = data;
        break;
      case "al":
        var data: any = [];
        for (var i = 0; i < this.rows; i++) {
          data[i] = [];
          for (var j = 0; j < this.columns; j++) {
            data[i][j] = this.words[i][j].toLowerCase();
          }
        }
        this.words = data;
        break;
      case "fu":

        var data: any = [];
        for (var i = 0; i < this.rows; i++) {
          data[i] = [];
          for (var j = 0; j < this.columns; j++) {
            var tmpResult = "";

            for (var k = 0; k < this.words[i][j].length; k++) {
              if (k == 0) {
                tmpResult += this.words[i][j][k].toUpperCase();
              }
              else {
                tmpResult += this.words[i][j][k].toLowerCase();
              }
            }
            data[i][j] = tmpResult;
          }

        }
        this.words = data;
        break;

    }


  }


  generateData() {

    this.cols=[];
    for (var i = 0; i < this.columns; i++) {
      this.cols.push(i);
    }
    var params = new GenerateWordsDTO();
    params.Columns = this.columns;
    params.Rows = this.rows;
    params.Syllables = this.syllables;
    params.WordLength = this.wordLength;

    this.generatorService.post(params).subscribe(data => { this.words= data; this.transformData()});

  }



}
