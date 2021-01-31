export type Funcao = (x: number) => number;

export interface Iteracao {
  a: number,
  b: number,
  'sinal F(a)*f(b)': number,
  M: number,
  'sinal F(a)*F(m)': number,
  'F(M)': number,
  novoIntervalo: [number, number]
}