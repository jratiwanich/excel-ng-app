import { Component, OnChanges, OnInit, Input, Output, DoCheck, EventEmitter, SimpleChanges, ChangeDetectorRef, ChangeDetectionStrategy} from '@angular/core';
import { ExcelNgService,Grid,ColumnLabel, CellLocation, CellObject, ALPHA} from '../../service/excel-ng.service';
import { TOOLBAR } from '../ex-toolbar/ex-toolbar.component';
import { CellInputDirective } from '../directives/cell-input.directive';

@Component({
  selector: 'ex-sheet',
  templateUrl: './ex-sheet.component.html',
  styleUrls: ['./ex-sheet.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExSheetComponent implements  OnChanges, OnInit {
  //send the output to the main parent app for current row and column count
  @Output() colCounted: EventEmitter<number> = new EventEmitter();
  @Output() rowCounted: EventEmitter<number> = new EventEmitter();
  //taking input from user interaction
  @Input() colCount: number;
  @Input() rowCount: number;
  @Input() userClicked: string;
  @Input() rowSelected: number;
  @Input() colSelected: number;

  private sheet: Grid; //keeping track from row and columns on the grid spreadsheet
  private cellData: Array<CellObject>;
  //private cells: Array<CellLocation>;

  constructor(private exService: ExcelNgService,
              private ref: ChangeDetectorRef) {
    this.cellData = [];
    this.ref.markForCheck();
 }

 ngOnInit(){
   //this.myrows = this.rows[this.rows.length-1];
    this.getSheet();
    console.debug("ExSheetComponent.OnInit -> myrows="+ this.rowCount)

 }

 calculateFormula(){
   console.debug("ExSheetComponent.calculateFormula() row=");
 }

 // ngDoCheck(){
 //   //if (typeof this.myrows != 'undefined' && this.myrows) {
 //     console.debug("ExSheetComponent.ngDoCheck, rowCount=" + this.rowCount)
 //     if(this.userClicked){
 //       this.rowCounted.emit(this.rowCount);
 //       this.colCounted.emit(this.colCount);
 //    }else{
 //       this.userClicked = false;
 //     }
 // }

 getSheet(): void {
     this.exService.getSheetData().then(
       cells => {
         this.sheet = cells;
         if (typeof this.sheet != 'undefined' && this.sheet) {
           console.debug("getSheet().row="+this.sheet.row);
           console.debug("getSheet().col="+this.sheet.col);
           //start keeping track of initial row x col from mock data
           this.rowCount = this.sheet.row.length;
           this.colCount = this.sheet.col.length;

          //  this.rows = this.sheet.row;
          //  this.rowCount = this.rows.length;
          //  this.columns = this.sheet.col;
          //  this.colCount = this.columns.length;
           console.debug("getSheet().rowCount="+ this.rowCount);
           this.rowCounted.emit(this.rowCount);
           this.colCounted.emit(this.colCount);
          //this.ref.detectChanges();
          this.ref.markForCheck();
         }
       }
     );
 }
//{[propName: string]: SimpleChange}
ngOnChanges(changes: SimpleChanges) {
if (typeof this.sheet != 'undefined' && this.sheet) {

   for (let propName in changes) {
     console.debug("ExSheetComponent.ngOnChanges sheet="
     + this.sheet + " propName=" + propName);
     let chng = changes[propName];
     let cur  = JSON.stringify(chng.currentValue);
     let prev = JSON.stringify(chng.previousValue);
     console.debug(`${propName}: currentValue = ${cur}, previousValue = ${prev}`);
     console.debug("ngOnChanges().rowCount="+ this.rowCount + ", colCount=" + this.colCount);
     console.debug("ngOnChanges().userClicked="+ this.userClicked);

     switch(TOOLBAR[this.userClicked]){
       default:
          console.debug("NOTHING SELECTED");
          break;

          case TOOLBAR.addrow:
              if(propName==='rowCount')
                  this.AddRow(this.rowCount);
              break;

          case TOOLBAR.addcol:
              if(propName==='colCount' )
                  this.AddColumn(this.colCount);
              break;

          case TOOLBAR.delrow:
              if(propName==='rowSelected')
                this.DeleteRow(this.rowSelected);
              break;

          case TOOLBAR.delcol:
              if(propName==='colSelected')
                this.DeleteColumn(this.colSelected);
              break;
     }//end switch
   }//end for loop
 }
}

//Print unique column label in the array
private getColumnLabel(len: number): string{
  let label: string = '';
  let modulo: number = len;
  let step: number;
  modulo %= ALPHA;
  step = Math.floor(len/ALPHA)
  //displaying a proper column label in alpha
  if(len>ALPHA){
    //if(modulo>(ALPHA-1)) modulo++;
    label = ColumnLabel[step-1].toString() +
            ColumnLabel[modulo].toString();
  }else{
    label = ColumnLabel[len].toString();
  }
  return label;
}

 AddColumn(newcol: number){
   console.debug("AddColumn()=>Last column="+ this.sheet.col[this.sheet.col.length-1]);
  //  this.myValue = ColumnLabel[this.columns[this.columns.length-1]];
  //  console.debug("myvalue"+ this.myValue);
  //  console.debug("previous ColumnLabel=" + ColumnLabel[this.columns.length-1]);
  //  console.debug("test ColumnLabel=" + (Math.floor(52/25)));
    console.debug("BEFORE AddColumn().colCount="+newcol+ ", length="+this.sheet.col.length);
   //get nice label on the column header
   let label = this.getColumnLabel(this.sheet.col.length);
   this.sheet.col.push(label);
   console.debug("AFTER AddColumn().colCount="+this.sheet.col.length);

   //update the Column count in the Parent
   this.colCounted.emit(newcol);
 }

 public AddRow(newrow: number){
   console.debug("AddRow().rowCount="+newrow + ", length="+this.sheet.row.length);
   //make sure row is not repeated
   if(newrow!=this.sheet.row[this.sheet.row.length-1])
      this.sheet.row.push(newrow);
   //print the row count in the console
   console.debug("AddRow().rows.length="+this.sheet.row.length);

   //update the Row count in the Parent
   this.rowCounted.emit(newrow);

  }

  DeleteRow(row: number){
    this.sheet.row.splice(row,1);
  }

  DeleteColumn(col: number){
    this.sheet.col.splice(col,1);
  }

  onCellClick(r:number, c: number){
    console.debug("ExSheetComponent.onCellClick() row="+r+", col="+c);
  }

  //save data here on the cell exiting (out of focus)
  onCellExited(cellnow: CellObject){
      console.debug("ColumnLabel="+ this.getColumnLabel(cellnow.location.col));
      cellnow.id = this.getColumnLabel(cellnow.location.col) + (cellnow.location.row+1).toString();
      console.debug("ExSheetComponent.onCellExited() cell=" + JSON.stringify(cellnow));
      this.cellData.push(cellnow);
  }
}
