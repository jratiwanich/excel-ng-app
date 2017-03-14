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
          let val = this.cell.data.match(/(([A-Z]+[0-9]+)|\++|\-+|\*+|\/+|\.\d+|\d+(\.\d+)?)/g)||[];
          //let val = this.cell.data.match(/(([A-Z]\d+)C(\d+)(.*)/g)||[];
          console.debug("data = "+ JSON.stringify(val));

          if(typeof this.sheetData!='undefined' && this.sheetData){
            //let co3 = this.findCellbyLocation(this.cell.location);
            //console.debug("FOUND!! ExCellComponent.CellObject() LOCATION=" + JSON.stringify(co3));
            //need to read the formula with pattern e.g. A1+a2+3-b3 (ignore case)
            let values = this.cell.data.match(/([A-Z][0-9]|\++|\-+|\*+|\/+|\.\d+|\d+(\.\d+)?)/gi)||[];
             console.debug("data values= "+ JSON.stringify(values));
             let parsedVals= []; //keep track of values in array, not used
             let parsedFormula = "";//concat values in this string
             while(values.length){
                //locate cell value from other cells by ID
                let v = values.shift();
                let co = this.findCellbyID(v);
                if(typeof co!='undefined' && co){
                  parsedVals.push(co.data);
                  parsedFormula += co.data;
                   //check for number
                  //  let x = parseFloat(co.data);
                  //  if(!isNaN(x)){
                  //    parsedVals.push(x);
                  // }
                }else{
                  parsedFormula += v;
                  parsedVals.push(v);
                }
             }

             console.debug("converted values="+ JSON.stringify(parsedVals));
             let tot = this.calculateFormula(parsedFormula);
             console.debug("onFormula() total="+ tot);
             //display the value in the Cell
             this.cell.data = tot.toString();
          }


        }
        //only print out the current cell data when not empty
        console.debug("ExCellComponent.onExitCell() cell=" + JSON.stringify(this.cell));
        //emit output data if not empty
        this.cellNotifier.emit(this.cell);

      }else
        if ( this.cell.formula==""){
          this.cell.data =""; //when user delete the value, just empty the data field for now
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
    const reg = /(\++|\-+|\*+|\/+|\.\d+|\d+(\.\d+)?)/g;
    //my test cases - not used
    let val1 = ins.match(/(\++|\-+|\*+|\/+|\.\d+|\d+(\.\d+)?)/g)||[];
    //split only the number in the array - not used
    let val2 = ins.split(/[+\-\*\/]*(\.\d+|\d+(\.\d+)?)/g);
    //find only math operators in the array - not used
    let operators = ins.match(/[\+\-\/\*]*/g);

    let found = ins.match(reg)||[];
    let v=0;

    console.debug("found="+ found);

    while(found.length){

         let m:string = found.shift();
         //checking for the operator
         if (/(\.\d+|\d+(\.\d+)?)/g.test(m)) {
           console.debug("n="+m);
           v = parseFloat(m);
           total = v;
           console.debug("total="+total);
         }else
          if (/\+/.test(m)) {
            total += parseFloat(found.shift());
            console.debug("+ total="+total);
          }else
          if (/\-/.test(m)) {
            total -= parseFloat(found.shift());
            console.debug("- total="+total);
          }else
          if (/\*/.test(m)) {
            total *= parseFloat(found.shift());
            console.debug("* total="+total);
          }else
          if (/\//.test(m)) {
            total /= parseFloat(found.shift());
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
