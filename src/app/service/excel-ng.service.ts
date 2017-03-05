import { Injectable } from '@angular/core';
import { GRID1} from './mock.cell';

@Injectable()
export class ExcelNgService {

  getSheetData(): Promise<CellData> {
    return Promise.resolve(GRID1);
  }

}

export class CellData{
    constructor(public row:  Array<number>,
                public col:  Array<any>) { }
}
export const ALPHA: number = 25;
export enum ColumnLabel{
  A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z
};

//use 2D array for structure the excel sheet grid

// export class CellData{
//     constructor(public row:  number,
//                 public col:  number,
//                 public val:  any) { }
// }
