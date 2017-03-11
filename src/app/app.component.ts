import { Component, OnInit, ViewChild, Input,
  ChangeDetectionStrategy,AfterViewChecked } from '@angular/core';
import { ExcelNgService, CellLocation} from './service/excel-ng.service';
import { ExSheetComponent } from './ui/ex-sheet/ex-sheet.component';
import { TOOLBAR } from './ui/ex-toolbar/ex-toolbar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExcelNgApp implements OnInit{
  title = 'Excel Grid application';

  pRowCount: number = 0;
  pColCount: number = 0;
  pGrid = new CellLocation(-1,-1);
  //pGrid: CellLocation;
  pUserClicked: string;
  pRowSelected: number;
  pColSelected: number;

  //myrows2: Array<number>;
  @ViewChild(ExSheetComponent) childView: ExSheetComponent;

  constructor(private exService: ExcelNgService) {
    console.log("constructor");

 }
 // ngAfterContentChecked() {
 //   if (typeof this.mysheet != 'undefined' && this.mysheet) {
 //     console.log("ExcelNgApp.ngAfterContentChecked=" + this.mysheet.row);
 //     //this.myrows2 = this.mysheet.row;
 //   }else{
 //     console.log("ExcelNgApp.ngAfterContentChecked().pRowCount=" + this.pGrid.row );
 //
 //   }
 //
 // }
ngAfterViewChecked(){

  console.debug("ExcelNgApp.ngAfterViewChecked().pGrid TOTAL=" + JSON.stringify(this.pGrid));

}

  ngOnInit(){
    //this.getSheet();
    //console.log("ExcelNgApp.onInit=" + this.mysheet);
  }

  onAddedRow(pressed: boolean){
    this.pUserClicked = TOOLBAR[TOOLBAR.addrow];
    console.debug("ExcelNgApp.onAddedRow().pressed="+pressed);
    //console.log("ExcelNgApp.OnAddedRow().mysheet=" + this.mysheet);
    this.pGrid.row++;
    //console.log("ExcelNgApp.onAddedRow().pRowCount="+this.pGrid.row);
  }

  onAddedColumn(pressed: boolean){
    this.pUserClicked = TOOLBAR[TOOLBAR.addcol];
    this.pGrid.col++;
  }

  onDeletedRow(row: number){
    this.pUserClicked = TOOLBAR[TOOLBAR.delrow];
    this.pRowSelected = row;
    this.pGrid.row--;
  }

  onDeletedColumn(col: number){
    this.pUserClicked = TOOLBAR[TOOLBAR.delcol];
    this.pColSelected = col;
    this.pGrid.col--;
  }
  //update the rowCount
  onRowCounted(i: number){
    //reset the user click state
    //this.pUserClicked = false;
    this.pGrid.row = i;
    console.debug("ExcelNgApp.onRowCounted().pRowCount="+this.pGrid.row);
  }

  onColumnCounted(i: number){
    this.pGrid.col = i;
  }
}
