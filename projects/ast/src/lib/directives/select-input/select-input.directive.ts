import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  OnInit,
} from '@angular/core';

@Directive({
  selector: '[astSelect]',
})
export class SelectInputDirective implements OnInit {
  constructor(private el: ElementRef) {}

  @HostBinding('class')
  elementClass = 'ast-select';

  ngOnInit(): void {
    this.el.nativeElement.style.borderRadius = '6px';
    this.el.nativeElement.style.fontSize = '14px';
    this.el.nativeElement.style.border = '1px solid #c0c0c0';
    this.el.nativeElement.style.padding = '0.5rem 0.75rem';

    if (this.el.nativeElement.readOnly) {
      this.el.nativeElement.style.backgroundColor = '#F4F7F8';
    }
  }

  @HostListener('focus') onFocus() {
    this.el.nativeElement.style.outline = 'none';
  }
}
