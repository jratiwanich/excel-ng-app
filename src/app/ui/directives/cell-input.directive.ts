import { Directive ,HostListener} from '@angular/core';

@Directive({
  selector: '[cellinput]'
})
export class CellInputDirective {

@HostListener('focus', ['$event.target'])
onFocus(target) {
  //target.type = 'date';
  console.debug("onFocus");
}
@HostListener('focusout', ['$event.target'])
onFocusout(target) {
  //target.type = 'text';
  console.debug("onFocusout");
}

}
