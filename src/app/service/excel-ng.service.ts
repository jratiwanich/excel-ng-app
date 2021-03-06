import { Injectable } from '@angular/core';
import { GRID1} from './mock.cell';

@Injectable()
export class ExcelNgService {

  getSheetData(): Promise<Grid> {
    return Promise.resolve(GRID1);
  }

}

//Keep data of each cell
export class CellObject{
    public id: string;
    public location: CellLocation;
    public formula: string;
    public data: string;
    constructor(){
      //set the cell location at no where/offset on the grid
      this.location= new CellLocation(-1,-1);
    }
}

//Keeping track of cell position
export class CellLocation{
  constructor(public row: number,
              public col: number
              ) { }
}

//2D Structure grid in array for adding row and column
export class Grid{
    constructor(public row:  Array<number>,
                public col:  Array<any>) { }
}

//size of the english alphabet position in the array
export const ALPHA: number = 25;
export enum ColumnLabel{
  A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z
};
