import { Component, OnInit } from '@angular/core';
import { ExcelNgService,SheetData } from '../../service/excel-ng.service';

@Component({
  selector: 'ex-sheet',
  templateUrl: './ex-sheet.component.html',
  styleUrls: ['./ex-sheet.component.css'],
    providers: [ExcelNgService]
})
export class ExSheetComponent implements OnInit {
  public columns = ['A', 'B', 'C'];
  public rows = [1, 2, 3, 4,5,6];
  public cells: SheetData[];
  constructor(private exService: ExcelNgService) { }

  getSheet(): void {
    this.exService.getSheetData().then(cells => this.cells = cells);
  }

 onAdd(){
   console.log(this.cells);
 }

  ngOnInit() {
    this.getSheet();
  }

}
