import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

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
  //@Input() cellvalue: string;
  @Output() cellNotifier: EventEmitter<CellObject> = new EventEmitter();

  constructor() {
    this.cell = new CellObject();
  }

  ngOnInit() {
  }

  onExitCell(){
    if (typeof this.cell!= 'undefined' && this.cell) {
      //getting cell location from @input
      this.cell.location.row = this.row;
      this.cell.location.col = this.col;
      //check if the formula cell is not empty
      if (typeof this.cell.formula!= 'undefined' && this.cell.formula) {
        //check if the cell starts with "=" or just plain old data
        let index = this.cell.formula.indexOf('=');
        console.debug("ExCellComponent formula.indexOf="+index);
        if(index==-1){
          //do nothing - just displaying the data on the cell
          this.cell.data = this.cell.formula;
        }else{
          //strip out "=" from the formula and calculate the math
          this.cell.data = this.cell.formula.slice(1,this.cell.formula.length);
          let tot = this.calculateFormula(this.cell.data);
          console.debug("onFormula() total="+ tot);
          //display the value in the Cell
          this.cell.data = tot.toString();
        }
        //only print out the current cell data when not empty
        console.debug("ExCellComponent.onExitCell() cell=" + JSON.stringify(this.cell));
        //emit output data if not empty
        this.cellNotifier.emit(this.cell);

      }
    }
  }

  //calculate the formular from string using Reg. Expression
  //this will exclude parenthesis "()" for this version
  //basic math operation only "+,-,*,/"
  calculateFormula(ins: string){
    let total: number =0;
    let s: Array<number>;
    const reg = "/[+\\-]*(\\.\\d+|\\d+(\\.\\d+)?)/g";
    let val0 = ins.match(/[\+\-\*\/]*(\.\d+|\d+(\.\d+)?)/g)||[];
    let val = ins.match(/(\++|\-+|\*+|\/+|\.\d+|\d+(\.\d+)?)/g)||[];
    let val2 = ins.split(/[+\-\*\/]*(\.\d+|\d+(\.\d+)?)/g);
    let operators = ins.match(/[\+\-\/\*]*/g);
    let num = ins.split(/[+\-\/\*]*/g);
    let val5 = ins.split("");
    let found = ins.match(reg)||[];
    let v=0;

    console.debug("found="+ found);
     while(val.length){
         //total+= parseFloat(val5.shift());
         //switch(val5){
         let m:string = val.shift();
         let ok = /\+/.test(m);

         if (/(\.\d+|\d+(\.\d+)?)/g.test(m)) {
           console.debug("n="+m);
           v = parseFloat(m);
           total = v;
           //checking for the operator
          //  if (/\+/.test(m.charAt(0))) {
          //    total = v+ parseFloat(val.shift());
          //    console.debug("+ total="+total);
          //  }else
          //  if (/\-/.test(m.charAt(0))) {
          //    total = v- parseFloat(val.shift());
          //    console.debug("- total="+total);
          //  }else
          //  if (/\*/.test(m.charAt(0))) {
          //    total = v* parseFloat(val.shift());
          //    console.debug("* total="+total);
          //  }else
          //  if (/\//.test(m.charAt(0))) {
          //    total= v/ parseFloat(val.shift());
          //    console.debug("\/ total="+total);
          //  }



           console.debug("total="+total);
         }else
          if (/\+/.test(m)) {
            total += parseFloat(val.shift());
            console.debug("+ total="+total);
          }else
          if (/\-/.test(m)) {
            total -= parseFloat(val.shift());
            console.debug("- total="+total);
          }else
          if (/\*/.test(m)) {
            total *= parseFloat(val.shift());
            console.debug("* total="+total);
          }else
          if (/\//.test(m)) {
            total /= parseFloat(val.shift());
            console.debug("\/ total="+total);
          }
     }
    return total;
}
  onCellClick(){
    //cell.data = "X";
    console.debug("row="+this.row+", col="+this.col);
  }

}
