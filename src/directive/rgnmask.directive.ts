// filhote do brmask4  com adaptacoes minhas
// https://www.npmjs.com/package/brmasker4
// aumentei o number para exibir somente numeros na mascara

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

export class BrModel {
  mask: string;
  len: number;
  person: boolean;
  phone: boolean;
  money: boolean;
  number: boolean;
  cnpj: boolean;
}

@Directive({
  selector: '[rgnmascara]'
  , providers: [{
    provide: NG_VALUE_ACCESSOR
    , useExisting: RgnMaskDirective
    , multi: true
  }]
})

export class RgnMaskDirective implements ControlValueAccessor, OnInit {
  onTouched: any;
  onChange: any;

  @Input('rgnmascara') parametros: BrModel = new BrModel();

  constructor(
    private el: ElementRef
    , private renderer: Renderer2
  ) {
    // this.renderer.setStyle(this.el.nativeElement, 'border', '1px solid red');
  }

  ngOnInit() {
    this.parametros.mask = this.parametros.mask || '';
    this.parametros.len = this.parametros.len || 99999999999;
    if (this.parametros.money) {
      this.parametros.number = true;
    }
  }

  writeValue(value: any): void {
    if (value) {
      this.el.nativeElement.value = this.aplicarMascara(String(value));
    } else {
      this.el.nativeElement.value = '';
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


  aplicarMascara(valor: string): string {
    if (!this.parametros.mask) {
      this.parametros.mask = '';
    }

    if (valor) {
      if (this.parametros.phone) {
        return this.phoneMask(valor);
      }
      if (this.parametros.person) {
        return this.peopleNumber(valor);
      }

      if (this.parametros.cnpj) {
        return this.cnpjNumber(valor);
      }

      if (this.parametros.money) {
        this.parametros.number = true;
        return this.moneyMask(this.formataCampo(valor));
      }
      return this.formataCampo(valor);
    } else {
      return '';
    }
  }


  private formataCampo(campo: string): any {
    const Mascara = this.parametros.mask;

    let boleanoMascara;
    const exp = /\-|\.|\/|\(|\)|\,|\*|\+|\@|\#|\$|\&|\%|\ /g;
    let campoSoNumeros = campo.toString().replace(exp, '');
    // RGN -> Limpando tudo que nao e digito aqui
    if (this.parametros.number) {
      campoSoNumeros = campoSoNumeros.replace(/\D/g, '');
    }
    let posicaoCampo = 0;
    let NovoValorCampo = '';
    let TamanhoMascara = campoSoNumeros.length;
    for (let i = 0; i < TamanhoMascara; i++) {
      if (i < this.parametros.len) {
        if (Mascara.charAt(i) === ' ') {
          boleanoMascara = true;
        } else {
          boleanoMascara = exp.test(Mascara.charAt(i));
        }


        if (boleanoMascara) {
          NovoValorCampo += Mascara.charAt(i);
          TamanhoMascara++;
        } else {
          let letra = campoSoNumeros.charAt(posicaoCampo);
          //  switch (Mascara.charAt(i)) {
          //     case '9':  //-> Apenas números
          //       if(/[0-9]/.test(letra)){
          //         NovoValorCampo += campoSoNumeros.charAt(posicaoCampo);
          //         posicaoCampo++;
          //       }
          //       break;

          //     default:
          NovoValorCampo += campoSoNumeros.charAt(posicaoCampo);
          posicaoCampo++;
          //  }
        }
      }
    }
    return NovoValorCampo;
  }

  private phoneMask(v: any) {
    let n = v;
    if (v.length > 14) {
      this.parametros.len = 15;
      this.parametros.mask = '(99) 99999-9999';
      n = n.replace(/\D/g, '');
      n = n.replace(/(\d{2})(\d)/, '$1 $2');
      n = n.replace(/(\d{5})(\d)/, '$1-$2');
      n = n.replace(/(\d{4})(\d)/, '$1$2');
    } else {
      this.parametros.len = 14;
      this.parametros.mask = '(99) 9999-9999';
      n = n.replace(/\D/g, '');
      n = n.replace(/(\d{2})(\d)/, '$1 $2');
      n = n.replace(/(\d{4})(\d)/, '$1-$2');
      n = n.replace(/(\d{4})(\d)/, '$1$2');
    }
    return this.formataCampo(n);
  }

  private peopleNumber(v: any) {
    let n = v;
    if (v.length > 14) {
      this.parametros.len = 18;
      this.parametros.mask = '99.999.999/9999-99';
      n = n.replace(/\D/g, '');
      n = n.replace(/(\d{2})(\d)/, '$1.$2');
      n = n.replace(/(\d{3})(\d)/, '$1.$2');
      n = n.replace(/(\d{3})(\d)/, '$1/$2');
      n = n.replace(/(\d{4})(\d{1,4})$/, '$1-$2');
      n = n.replace(/(\d{2})(\d{1,2})$/, '$1$2');
    } else {
      this.parametros.len = 14;
      this.parametros.mask = '999.999.999-99';
      n = n.replace(/\D/g, '');
      n = n.replace(/(\d{3})(\d)/, '$1.$2');
      n = n.replace(/(\d{3})(\d)/, '$1.$2');
      n = n.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    }
    return this.formataCampo(n);
  }

  private cnpjNumber(v: any) {
    let n = v;
    this.parametros.len = 18;
    this.parametros.mask = '99.999.999/9999-99';
    n = n.replace(/\D/g, '');
    n = n.replace(/(\d{2})(\d)/, '$1.$2');
    n = n.replace(/(\d{3})(\d)/, '$1.$2');
    n = n.replace(/(\d{3})(\d)/, '$1/$2');
    n = n.replace(/(\d{4})(\d{1,4})$/, '$1-$2');
    n = n.replace(/(\d{2})(\d{1,2})$/, '$1$2');
    return this.formataCampo(n);
  }
  
  private moneyMask(v: any): string {
    let tmp = v;
    tmp = tmp.replace(/([0-9]{2})$/g, ',$1');
    return tmp;
  }

} // fim RGNMASKDIRECTIVE
