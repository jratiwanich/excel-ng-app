import { Component, OnInit, ViewChild, Input,
  ChangeDetectionStrategy,AfterContentChecked,AfterViewChecked } from '@angular/core';
import { ExcelNgService,CellData } from './service/excel-ng.service';
import { ExSheetComponent } from './ui/ex-sheet/ex-sheet.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExcelNgApp implements OnInit,AfterContentChecked, AfterContentChecked{
  title = 'Excel Grid application';
  mysheet: CellData;
  pRowCount: number = 0;
  pColCount: number = 0;
  pUserClicked: boolean = false;

  //myrows2: Array<number>;
  @ViewChild(ExSheetComponent) childView: ExSheetComponent;

  constructor(private exService: ExcelNgService) {
    console.log("constructor");

 }
 ngAfterContentChecked() {
   if (typeof this.mysheet != 'undefined' && this.mysheet) {
     console.log("ExcelNgApp.ngAfterContentChecked=" + this.mysheet.row);
     //this.myrows2 = this.mysheet.row;
   }else{
     console.log("ExcelNgApp.ngAfterContentChecked().pRowCount=" + this.pRowCount );

   }

 }
ngAfterViewChecked(){
  this.pUserClicked = false;
  console.log("ExcelNgApp.ngAfterViewChecked().pRowCount=" + this.pRowCount);

}

  ngOnInit(){
    //this.getSheet();
    //console.log("ExcelNgApp.onInit=" + this.mysheet);
  }

  onAddedRow(pressed: boolean){
    this.pUserClicked = pressed;
    console.debug("ExcelNgApp.onAddedRow().pressed="+pressed);
    //console.log("ExcelNgApp.OnAddedRow().mysheet=" + this.mysheet);
    this.pRowCount++;
    //console.log("ExcelNgApp.onAddedRow().pRowCount="+this.pRowCount);
  }

  onAddedColumn(){
    this.pColCount++;
  }

  //update the rowCount
  onRowCounted(i: number){
    //reset the user click state
    //if(this.pUserClicked){
      this.pUserClicked = false;
      this.pRowCount = i;


    console.debug("ExcelNgApp.onRowCounted().pRowCount="+this.pRowCount);
  }

  onColumnCounted(i: number){
    this.pColCount = i;
  }
}
