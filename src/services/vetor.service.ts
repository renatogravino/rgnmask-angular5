import { Injectable } from '@angular/core';

@Injectable()
export class VetorService {

  constructor() { }

  /** 
   * @description clona um array.  
   * @param {array} array que sera clonado.  
   * @return {array}  array
   */
  clone(x: Array<any>) {
    return [...x];
  }

  /** 
   * @description Adiciona um valor no final do array.  
   * @param {any} any Valor que sera adiconado
   * @param {array} array original que recebera o valor no final.  
   * @return {array}  array
   */
  push(y: any, x: Array<any>) {
    return [...x, y];
  }

  /** 
   * @description remove o ultimo elemento do array.  
   * @param {array} array original.  
   * @return {array}  array 
   */
  pop(x: Array<any>) {
    return x.slice(0, -1);
  }

  /** 
   * @description Adiciona elemento no inicio do array.  
   * @param {any} any Valor que sera adicionado no final
   * @param {array} array original.  
   * @return {array}  array
   */
  unshift(y: any, x: Array<any>) {
    return [y, ...x];
  }

  /** 
   * @description remove elemento no inicio do array.  
   * @param {array} array original.  
   * @return {array}  array
   */
  shift(x: Array<any>) {
    return x.slice(1);
  }


  /** 
   * @description Ordena o array.  
   * @param {array} array original.  
   * @param {string} string nome do campo (opcional)
   * @return {array}  array
   */
  sort(x: Array<any>, campo: string = null) {
    if (campo) {
      let ordem = (a, b) => {
        if (a[campo] > b[campo]) {
          return 1;
        }
        if (a[campo] < b[campo]) {
          return -1;
        }
        return 0;
      }
      return [...x].sort(ordem);
    } else {
      return [...x].sort();
    }
  }
  /** 
   * @description Ordena o array do tipo numerico ascendente.
   * @param {array} array original.  
   * @return {array}  array
   */
  sortNumber(x:  Array<any>){
    return [...x].sort((a,b) => a - b);
  }

  /** 
   * @description Ordena o array do tipo numerico Descendente.
   * @param {array} array original.  
   * @return {array}  array
   */
  sortNumberDesc(x:  Array<any>){
    return [...x].sort((a,b) => b - a);
  }
  /** 
   * @description Apaga um elemento do array.  
   * @param {number} number elemento a ser apagado.  
   * @param {array} array original.
   * @returns {array}  array 
   */
  delete(idx: number, x: Array<any>) {
    return [...x.slice(0, idx), ...x.slice(idx + 1)];
  }

  /** 
   * @description Verifica se existe o elemento dentro de um array.  
   * @param {any} any elemento a ser pesquisado.  
   * @param {array} array original.
   * @returns {boolean}  boolean se o elemento existe 
   */
  exist(el:any, x: Array<any>){
    return x.includes(el);
  }


  /** 
   * @description splice retornando o array posicao inical que vai inserir, quantos elementos vao remover
   * e array a ser inserido  segundo parametro array que vai pegar
   * 
   * 
   */
  //->  splice = (s,c,...y) => x => [...x.slice(0,s), ...y, ...x.slice(s+c)]

}
