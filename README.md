# ExcelNgApp
Application name is `ExcelNgApp` This app was developed for a coding test for my job interview. All Rights Reserved. All information contained herein is, and remains the property of Jak Ratiwanich. Dissemination of this information or reproduction of this material is strictly forbidden unless prior written permission is obtained
from by me. Write to [jratiwanich@gmail.com](mailto:jratiwanich@gmail.com)


## Features
1) Display the web version of Spreadsheet 'Excel' style

2) Add Row or Column

3) Delete Row or Column

4) Enter the data or value in a cell

5) Enter a formula:
  a. Add
  b. Subtract
  c. Devide
  d. Multiply

6) The cell should be calculated based on the formula and displayed
`(= cell or number [+-/*] cell or number)`

8) When exiting a formula cell the actual value should be displayed

## Test Cases
1) Enter a cell value e.g. `=23`

2) Display the cell value from other cell e.g. `=A1`

3) Enter simple math operation in the formula e.g. `=4+3*20/2` or `=A1+B2-3`

4) Click Add Column or Row

5) Click Delete Column or Row

## Out of Scope (for now)
1) Data only resides in the browser's memory.

2) Data will not be saved into a permanent storage e.g. file, local storage, cookie, or database.

3) When a cell get new value, the Spreadsheet (all cells) will not be refreshed or updated. _This will be in my TO-DO list to use Observable in the future._

## Design Architecture
All the components are separated below
`ExcelNgApp` --> `ExSheetComponent` --> `ExCell`

`ExcelNgApp` --> `ExToolbarComponent` --> `ExSheetComponent`

`ExCell` --> `Observable` and `Regular Expression`
## Environment
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.0-rc.0.

## Development server
Demo online goto:  http://dev.triangleitc.com/excel/index.html

Run locally use `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code
Download from my Github:
https://github.com/jratiwanich/excel-ng-app


## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.


## Further help
Call Jak at `949-346-2989`
or email: `jratiwanich@gmail.com`
