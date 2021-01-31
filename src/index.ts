import { Funcao, Iteracao} from './types';
import { funcao, precisao } from './valores';

const resultados: Array<Iteracao> = [];

const calcularModulo = (x: number) => x > 0 ? x : -x;

const calcumarNumeroMedio = (num1: number, num2: number) => {
  return (num1 + num2) / 2;
}

const calcularRaizes = (numMenor: number, numMaior: number, funcao: Funcao) => {
  const funcaoNumMenor = funcao(numMenor);
  const funcaoNumeroMaior = funcao(numMaior);
  const sinalFaFb = funcaoNumMenor * funcaoNumeroMaior;
  if (sinalFaFb < 0){
    const numeroMedio = calcumarNumeroMedio(numMenor, numMaior);
    const funcaoNumerioMedio = funcao(numeroMedio);
    const sinalFaFm = funcaoNumerioMedio * funcaoNumMenor 
    const iteracao: Iteracao = {
      a: numMenor,
      b: numMaior,
      "sinal F(a)*F(m)": sinalFaFm,
      M: numeroMedio,
      "sinal F(a)*f(b)": sinalFaFb,
      'F(M)': funcaoNumerioMedio,
      novoIntervalo: [numeroMedio, numMaior]
    }
    if (sinalFaFm > 0){
      resultados.push(iteracao)
      verificarSeAcabou(resultados, funcao)
    }
    else {
      iteracao.novoIntervalo = [numMenor, numeroMedio];
      resultados.push(iteracao);
      verificarSeAcabou(resultados, funcao)
    }
  }
  else {
    console.log('Não existe raiz para o intervalo especificado');
  }
}

const formatarValoresDecimais = (valor: number) => {
  const casasDecimais = 8;
  return valor.toFixed(casasDecimais);
}

const printarResultados = (resultados: Array<Iteracao>) => {
  const resultadosFormatados = resultados.map(iteracao =>{
    return {
      a: formatarValoresDecimais(iteracao.a),
      b: formatarValoresDecimais(iteracao.b),
      M: formatarValoresDecimais(iteracao.M),
      'F(M)': formatarValoresDecimais(iteracao['F(M)']),
      novoIntervalo: iteracao.novoIntervalo.map(valor => formatarValoresDecimais(valor)),
      "sinal F(a)*F(m)": formatarValoresDecimais(iteracao['sinal F(a)*F(m)']),
      "sinal F(a)*f(b)": formatarValoresDecimais(iteracao['sinal F(a)*f(b)'])
    }
  });
  console.table(resultadosFormatados);
}

const verificarSeAcabou = (resultados: Array<Iteracao>, funcao: Funcao) => {
  if (calcularModulo(resultados[resultados.length - 1]['F(M)']) < precisao){
    printarResultados(resultados);
  }
  else {
    const { novoIntervalo } = resultados[resultados.length - 1];
    const [a, b] = novoIntervalo;
    calcularRaizes(a, b, funcao);
  }
}

calcularRaizes(0, 10, funcao);