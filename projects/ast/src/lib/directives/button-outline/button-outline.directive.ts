import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';

@Directive({
  selector: '[astButtonOutline]',
})
export class ButtonOutlineDirective implements OnInit {
  @Input() backgroundColor: string = 'transparent';
  @Input() color: string = '#56717e';
  @Input() size: string = 'md';

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.el.nativeElement.style.border = 'none';
    this.el.nativeElement.style.borderRadius = '6px';
    this.el.nativeElement.style.fontWeight = '600';

    this.el.nativeElement.style.backgroundColor = this.backgroundColor;
    this.el.nativeElement.style.color = this.color;
    this.el.nativeElement.style.border = '2px solid ' + this.color;

    if (this.size == 'sm') {
      this.el.nativeElement.style.padding =
        'calc(0.375rem - 2px) calc(0.625rem - 2px)';
      this.el.nativeElement.style.fontSize = '0.875rem';
    } else {
      this.el.nativeElement.style.padding =
        'calc(0.5rem - 2px) calc(1rem - 2px)';
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
