import {
  Directive,
  HostListener,
  Input,
  OnInit,
  ElementRef,
  Renderer2
} from '@angular/core';

import {
  NG_VALUE_ACCESSOR
  , ControlValueAccessor
} from '@angular/forms';


@Directive({
  selector: '[inteiro]'
  , providers: [{
    provide: NG_VALUE_ACCESSOR
    , useExisting: InteiroDirective
    , multi: true
  }]
})
export class InteiroDirective implements ControlValueAccessor, OnInit  {
  onTouched: any;
  onChange: any;
  tamMaximo = 0; 

  // @Input('inteiro') tamanho: any;


  constructor(
    private el: ElementRef
    , private renderer: Renderer2
  ) {
    this.renderer.setStyle(this.el.nativeElement, 'text-align', 'right');
  }

  ngOnInit() {
    // console.log('Iniciou inteiroDirective');
  }

  writeValue(value: any): void {
    if (value) {
      if (!isNaN(value)) {
        value = + value;
        value = value.toFixed(0);
      }
      this.el.nativeElement.value = this.aplicarMascara(String(value));

    } else {
      this.el.nativeElement.value = 0;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  @HostListener('keyup', ['$event'])
  onKeyup($event: any) {
    const valor: string = this.aplicarMascara($event.target.value);

    if (valor === '') {
      this.onChange('');
      $event.target.value = '';
      return;
    }
    $event.target.value = valor;
    this.onChange(valor);

  }

  // @HostListener('blur', ['$event'])
  // onBlur($event: any) {
  //   // this.onChange('12');
  //   // $event.target.value = '34';
  // }

  aplicarMascara(valorConverter: string): string {
    let valorNum = parseInt(valorConverter.replace(/\D/g, ''), 10);

    if (isNaN(valorNum)) {
      return '';
    }
    return valorNum.toString();
  }
}
