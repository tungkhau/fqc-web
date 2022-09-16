import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';

@Directive({
  selector: '[astButtonIcon]',
})
export class ButtonIconDirective implements OnInit {
  @Input() backgroundColor: string | null = 'transparent';
  @Input() color: string | null = '#56717e';
  @Input() size: string | null = 'md';

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.el.nativeElement.style.padding = '0';
    this.el.nativeElement.style.border = 'none';
    this.el.nativeElement.style.borderRadius = '50%';

    this.el.nativeElement.style.backgroundColor = this.backgroundColor;
    this.el.nativeElement.style.color = this.color || '#56717e';

    this.el.nativeElement.style.fontSize = '22px';

    // if (this.size == 'lg') {
    //   this.el.nativeElement.style.fontSize = '32px';
    // } else {
    // }
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.el.nativeElement.style.cursor = 'pointer';
    this.el.nativeElement.style.opacity = 0.9;
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.el.nativeElement.style.opacity = 1;
  }
}
