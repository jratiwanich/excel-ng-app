import { Component, EventEmitter, Output, Input} from '@angular/core';
import { ExSheetComponent } from '../ex-sheet/ex-sheet.component';
import { ExcelNgService, CellLocation} from '../../service/excel-ng.service';


@Component({
  selector: 'ex-toolbar',
  templateUrl: './ex-toolbar.component.html',
  styleUrls: ['./ex-toolbar.component.css']
})
export class ExToolbarComponent {
  //@ViewChild(ExSheetComponent) _sheet: ExSheetComponent;
  @Output() eAddRow: EventEmitter<any> = new EventEmitter();
  @Output() eAddCol: EventEmitter<any> = new EventEmitter();
  @Output() eDelRow: EventEmitter<any> = new EventEmitter();
  @Output() eDelCol: EventEmitter<any> = new EventEmitter();
  @Input() position: CellLocation;

  constructor() { }

  onAddRow(){
    console.debug("ExToolbarComponent.onAddRow()");
    this.eAddRow.emit(true);
  }

  onAddColumn(){
    this.eAddCol.emit(true);
  }

  onDeleteRow(r:number){
    this.eDelRow.emit(r-1);
  }

  onDeleteColumn(c:number){
    this.eDelCol.emit(c-1);
  }
}

export enum TOOLBAR{
  addrow, addcol, delrow, delcol
}
