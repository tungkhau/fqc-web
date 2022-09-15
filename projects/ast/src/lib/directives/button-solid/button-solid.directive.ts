import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';

@Directive({
  selector: '[astButtonSolid]',
})
export class ButtonSolidDirective implements OnInit {
  @Input() backgroundColor: string | null = '#56717e';
  @Input() color: string | null = '#fff';
  @Input() size: string | null = 'md';

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.el.nativeElement.style.border = 'none';
    this.el.nativeElement.style.borderRadius = '6px';
    this.el.nativeElement.style.fontWeight = '600';

    this.el.nativeElement.style.backgroundColor = this.backgroundColor;
    this.el.nativeElement.style.color = this.color;

    if (this.size == 'sm') {
      this.el.nativeElement.style.padding = '0.375rem 0.625rem';
      this.el.nativeElement.style.fontSize = '0.875rem';
    } else {
      this.el.nativeElement.style.padding = '0.5rem 1rem';
      this.el.nativeElement.style.fontSize = '1rem';
    }
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.el.nativeElement.style.cursor = 'pointer';
    this.el.nativeElement.style.opacity = 0.9;
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.el.nativeElement.style.opacity = 1;
  }
}
