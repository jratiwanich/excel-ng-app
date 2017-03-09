import { Component, OnInit, Input } from '@angular/core';
//import expressions from '../../../../node_modules/angular-expressions/lib/main.js';
//import {ngParser} from '../../../../node_modules/ng-parser/dist/ngParser';

import { CellObject} from '../../service/excel-ng.service';
import { CellInputDirective } from '../directives/cell-input.directive';

@Component({
  selector: 'ex-cell',
  templateUrl: './ex-cell.component.html',
  styleUrls: ['./ex-cell.component.css']
})
export class ExCellComponent implements OnInit {
  @Input() cell: CellObject;
  @Input() row: number;
  @Input() col: number;
  @Input() cellvalue: string;

  constructor() {
    this.cell = new CellObject();
  }

  ngOnInit() {
  }

//let expressions = require("angular-expressions");

  calculateFormula(){
    console.debug("ExCellComponent.calculateFormula() row="+this.row+", col="+this.col);
    //check if the cell is not empty
    if (typeof this.cell.formula!= 'undefined' && this.cell.formula) {
      let index = this.cell.formula.indexOf('=');
      console.debug("ExCellComponent indexOf="+index);
      if(index==-1){
        this.cell.data = this.cell.formula;
      }else{
        //start parsing formula here
        //let s = expressions()
        //need to write RegExpression to parse out math function
        this.cell.data = this.cell.formula.slice(1,this.cell.formula.length);
        let tot = this.addbits(this.cell.data);
        console.debug("addbits total="+ tot);
        this.cell.data = tot.toString();
      }

    }
  }

  addbits(ins: string){
    let total: number =0;
    let s: Array<number>;
    const reg = '/[+\-]*(\.\d+|\d+(\.\d+)?)/g';
    let val = ins.match(/[+\-]*(\.\d+|\d+(\.\d+)?)/g)||[];
    let found = ins.match(reg)||[];
    console.debug("found="+ found);
     while(val.length){
         total+= parseFloat(val.shift());
     }
    return total;
}
  onCellClick(){
    //cell.data = "X";
    console.debug("row="+this.row+", col="+this.col);
  }

}
