import { Injectable } from '@angular/core';
import { SAMPLE1} from './mock.cell';

@Injectable()
export class ExcelNgService {

  getSheetData(): Promise<SheetData[]> {
    return Promise.resolve(SAMPLE1);
  }

}

//use 2D array for structure the excel sheet grid
export class SheetData{
    constructor(public row:  number,
                public col:  number,
                public val:  any) { }
}
