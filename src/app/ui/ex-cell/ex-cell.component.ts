import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Observable} from 'rxjs/Rx';

import { CellObject, CellLocation} from '../../service/excel-ng.service';
import { CellInputDirective } from '../directives/cell-input.directive';

@Component({
  selector: 'ex-cell',
  templateUrl: './ex-cell.component.html',
  styleUrls: ['./ex-cell.component.css']
})
export class ExCellComponent implements OnInit {
  @Input() cell: CellObject;
  @Input() sheetData: Array<CellObject>;
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
          let val = this.cell.data.match(/([a-z]|\++|\-+|\*+|\/+|\.\d+|\d+(\.\d+)?)/g)||[];
          console.debug("data = "+ JSON.stringify(val));

          if(typeof this.sheetData!='undefined' && this.sheetData){
            //let co3 = this.findCellbyLocation(this.cell.location);
            //console.debug("FOUND!! ExCellComponent.CellObject() LOCATION=" + JSON.stringify(co3));
            //need to read the formula
            let val = this.cell.data.match(/([A-Z0-9]|\++|\-+|\*+|\/+|\.\d+|\d+(\.\d+)?)/g)||[];
             console.debug("data = "+ JSON.stringify(val));

            let co4 = this.findCellbyID(this.cell.data);
            if(typeof co4!='undefined' && co4){

              console.debug("FOUND!! ExCellComponent.CellObject() ID=" + JSON.stringify(co4));
              this.cell.data = co4.data;
            }else{
              let tot = this.calculateFormula(this.cell.data);
              console.debug("onFormula() total="+ tot);
              //display the value in the Cell
              this.cell.data = tot.toString();
            }
          }


        }
        //only print out the current cell data when not empty
        console.debug("ExCellComponent.onExitCell() cell=" + JSON.stringify(this.cell));
        //emit output data if not empty
        this.cellNotifier.emit(this.cell);

      }else
        if ( this.cell.formula==""){
          this.cell.data ="";
      }
    }
  }

  //find by location and return CellObject
  findCellbyLocation(lc: CellLocation): CellObject{
    let foundCell: any;
    //this will work also and returning array
    //let xxs = this.sheetData.filter(co1 => (co1.location.row == co.location.row && co1.location.col == co.location.col ));
     Observable.from(this.sheetData)
      .filter((cells) =>
               (cells.location.row == lc.row && cells.location.col == lc.col ))
      .subscribe(x => foundCell=x);

    console.debug("FOUND! ExCellComponent.findCellbyLocation()=" + JSON.stringify(foundCell));
    return foundCell;
  }

  //find by ID and return CellObject
  findCellbyID(id: string): CellObject{
    let foundCell: any;
    //make sure to compare in uppercase
    id = id.toUpperCase();
     Observable.from(this.sheetData)
      .filter((cells) => cells.id == id)
      .subscribe(x => foundCell=x);

    console.debug("FOUND! ExCellComponent.findCellbyID()=" + JSON.stringify(foundCell));
    return foundCell;
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
         //checking for the operator
         if (/(\.\d+|\d+(\.\d+)?)/g.test(m)) {
           console.debug("n="+m);
           v = parseFloat(m);
           total = v;
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
    console.debug("ExCellComponent.onCellClick() row="+this.row+", col="+this.col);
  }

}
