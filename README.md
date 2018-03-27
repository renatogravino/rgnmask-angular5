# rgnmask-angular5 
##Em directive tem 3 diretivas
dinheiro, trabalha com valores financeiros em real
inteiro, trabalha com valores inteiros
rgnmascara, trabalha com diversos tipos de valores


modelo {
  mask: string;  //   Mascara
  len: number;  // tamanho em caracteres
  person: boolean; // cpf ou cnpj
  phone: boolean;  // telefone no formato brasileiro 
  money: boolean;   // dinheiro
  number: boolean;   // numerico apenas
  cnpj: boolean;     // apenas cnpj
}

exemplos
CEP
<input type="text" [rgnmascara]="{mask:'00000-000', len:9, number:true}" autocomplete="off">
Telefone
<input type="text" [rgnmascara]="{phone:true}"  autocomplete="off">



##Em services temos 1 servico para trablhar com vetores

  /** 
   * @description clona um array.  
   * @param {array} array que sera clonado.  
   * @return {array}  array
   */
  clone(x: Array<any>) 
  
  /** 
   * @description Adiciona um valor no final do array.  
   * @param {any} any Valor que sera adiconado
   * @param {array} array original que recebera o valor no final.  
   * @return {array}  array
   */
  push(y: any, x: Array<any>)
  
  /** 
   * @description remove o ultimo elemento do array.  
   * @param {array} array original.  
   * @return {array}  array 
   */
  pop(x: Array<any>)

  /** 
   * @description Adiciona elemento no inicio do array.  
   * @param {any} any Valor que sera adicionado no final
   * @param {array} array original.  
   * @return {array}  array
   */
  unshift(y: any, x: Array<any>)

  /** 
   * @description remove elemento no inicio do array.  
   * @param {array} array original.  
   * @return {array}  array
   */
  shift(x: Array<any>)

  /** 
   * @description Ordena o array.  
   * @param {array} array original.  
   * @param {string} string nome do campo (opcional)
   * @return {array}  array
   */
  sort(x: Array<any>, campo: string = null)

  /** 
   * @description Ordena o array do tipo numerico ascendente.
   * @param {array} array original.  
   * @return {array}  array
   */
  sortNumber(x:  Array<any>)

  /** 
   * @description Ordena o array do tipo numerico Descendente.
   * @param {array} array original.  
   * @return {array}  array
   */
  sortNumberDesc(x:  Array<any>)

  /** 
   * @description Apaga um elemento do array.  
   * @param {number} number elemento a ser apagado.  
   * @param {array} array original.
   * @returns {array}  array 
   */
  delete(idx: number, x: Array<any>)

  /** 
   * @description Verifica se existe o elemento dentro de um array.  
   * @param {any} any elemento a ser pesquisado.  
   * @param {array} array original.
   * @returns {boolean}  boolean se o elemento existe 
   */
  exist(el:any, x: Array<any>)