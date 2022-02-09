function adicaoSubtracao(numero, outroNumero, operacao) {
  if (operacao === '+') {
    return numero + outroNumero
  } else if (operacao === '-') {
    return numero - outroNumero
  } else {
    return 0
  }
}

//console.log(AdicaoSubtracao(2, 3, '+'))

function tripleTheChances(chances) {
  let arr = []
  for (let index = 0; index < chances.length; index++) {
    arr.push(chances[index] * 3)
  }
  return arr
}

//console.log(tripleTheChances([5,2,3,5,8,10]))

function vezesLetraAparece(frase, letra) {
  let letras = frase.split('')
  let count = 0
  for (index = 0; index <= letras.length; index++) {
    if (letras[index] === letra) {
      count++
    }
  }
  return count
}

//console.log(vezesLetraAparece('eu gosto muito de comer', 'o'))
