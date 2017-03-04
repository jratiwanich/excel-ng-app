import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { ExcelNgApp } from './app.component';
import { ExSheetComponent } from './ui/ex-sheet/ex-sheet.component';
import { ExCellComponent } from './ui/ex-cell/ex-cell.component';
import { ExToolbarComponent } from './ui/ex-toolbar/ex-toolbar.component';
import { ExcelNgService } from './service/excel-ng.service';

@NgModule({
  declarations: [
    ExcelNgApp,
    ExSheetComponent,
    ExCellComponent,
    ExToolbarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [ExcelNgService],
  bootstrap: [ExcelNgApp]
})
export class AppModule { }
