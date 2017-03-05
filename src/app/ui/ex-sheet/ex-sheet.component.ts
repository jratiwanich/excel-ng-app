import { Component, OnChanges, OnInit, Input, Output, DoCheck, EventEmitter, SimpleChanges, ChangeDetectorRef, ChangeDetectionStrategy} from '@angular/core';
import { ExcelNgService,CellData,ColumnLabel, ALPHA} from '../../service/excel-ng.service';

@Component({
  selector: 'ex-sheet',
  templateUrl: './ex-sheet.component.html',
  styleUrls: ['./ex-sheet.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExSheetComponent implements  OnChanges, OnInit {
  public columns = ['A', 'B', 'C'];
  public rows : Array<number>;

  @Output() colCounted: EventEmitter<number> = new EventEmitter();
  @Output() rowCounted: EventEmitter<number> = new EventEmitter();
  @Input() colCount: number;
  @Input() rowCount: number;
  @Input() userClicked: boolean = false;

  sheet1: CellData;

  alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  eLabel = ColumnLabel;

  constructor(private exService: ExcelNgService,
              private ref: ChangeDetectorRef) {
    this.ref.markForCheck();
 }

  // _userClicked: boolean;
  // set userClicked(value:boolean) {
  //   this._userClicked = value;
  //
  // }
  // get userClicked() {
  //   return this._userClicked;
  // }

 ngOnInit(){
   //this.myrows = this.rows[this.rows.length-1];
    this.getSheet();
    console.debug("ExSheetComponent.OnInit -> myrows="+ this.rowCount)

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
         this.sheet1 = cells;
         if (typeof this.sheet1 != 'undefined' && this.sheet1) {
           console.debug("getSheet().row="+this.sheet1.row);
           console.debug("getSheet().col="+this.sheet1.col);
           this.rows = this.sheet1.row;
           this.rowCount = this.rows.length;
           this.columns = this.sheet1.col;
           this.colCount = this.columns.length;
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
if (typeof this.sheet1 != 'undefined' && this.sheet1) {
   for (let propName in changes) {
     console.debug("ExSheetComponent.ngOnChanges sheet1="
     + this.sheet1 + " propName=" + propName);
     let chng = changes[propName];
     let cur  = JSON.stringify(chng.currentValue);
     let prev = JSON.stringify(chng.previousValue);
     console.debug(`${propName}: currentValue = ${cur}, previousValue = ${prev}`);
     console.log("ngOnChanges().rowCount="+ this.rowCount + ", colCount=" + this.colCount);

     if(propName==='userClicked')
         this.userClicked = chng.currentValue;
//&&  this.userClicked
     if(propName==='rowCount' )
        this.AddRow(this.rowCount);

    if(propName==='colCount' )
        this.AddColumn(this.colCount);

     //console.debug("mysheet="+JSON.stringify(this.myrows));
   }
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
   console.debug("AddColumn()=>Last column="+ this.columns[this.columns.length-1]);
  //  this.myValue = ColumnLabel[this.columns[this.columns.length-1]];
  //  console.debug("myvalue"+ this.myValue);
  //  console.debug("previous ColumnLabel=" + ColumnLabel[this.columns.length-1]);
  //  console.debug("test ColumnLabel=" + (Math.floor(52/25)));
    console.debug("BEFORE AddColumn().colCount="+newcol+ ", length="+this.columns.length);

   let label = this.getColumnLabel(this.columns.length);
   this.columns.push(label);
   console.debug("AFTER AddColumn().colCount="+this.columns.length);
   this.userClicked = false;
   //update the Column count in the Parent
   this.colCounted.emit(newcol);
 }

 public AddRow(newrow: number){
   console.debug("AddRow().rowCount="+newrow + ", length="+this.rows.length);
   //make sure row is not repeated
   if(newrow!=this.rows[this.rows.length-1])
      this.rows.push(newrow);

   console.debug("AddRow().rows.length="+this.rows.length);
    this.userClicked = false;
   //update the Row count in the Parent
   this.rowCounted.emit(newrow);

  }

}
