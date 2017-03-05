import { Component, EventEmitter, Output} from '@angular/core';
import { ExSheetComponent } from '../ex-sheet/ex-sheet.component';
import { ExcelNgService,CellData } from '../../service/excel-ng.service';

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

  constructor() { }

  onAddRow(){
    console.debug("ExToolbarComponent.onAddRow()");
    this.eAddRow.emit(true);
  }

  onAddColumn(){
    this.eAddCol.emit(true);
  }

  onDeleteRow(r:number){
    this.eDelRow.emit(r);
  }

  onDeleteColumn(c:number){
    this.eDelCol.emit(c);
  }
}
