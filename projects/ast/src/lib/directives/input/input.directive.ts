import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';

@Directive({
  selector: '[astInput]',
})
export class InputDirective implements OnInit {
  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.el.nativeElement.style.borderRadius = '6px';
    this.el.nativeElement.style.border = '1px solid #c0c0c0';
    this.el.nativeElement.style.padding = '0.5rem 0.5rem';

    if (this.el.nativeElement.readOnly) {
      this.el.nativeElement.style.backgroundColor = '#F4F7F8';
    }
  }

  @HostListener('focus') onFocus() {
    this.el.nativeElement.style.outline = 'none';
  }
}
