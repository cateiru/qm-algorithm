import inputQM from './input'
import {question} from 'readline-sync'
import {printTruthTable} from './printData'
import {calculate, Label} from './calculate'
import {magenta, reset} from './colors'


function main() {
  let numberOfInputLength = parseInt(question('入力の数を入力してください: '))
  while(isNaN(numberOfInputLength)){
    numberOfInputLength = parseInt(question('入力の数を入力してください: '))
  }

  const qms = inputQM(numberOfInputLength)

  printTruthTable(qms, numberOfInputLength)

  const result = calculate(qms, numberOfInputLength)
  let text = magenta + 'f = '

  for(let i = 0; result.length > i; ++i){
    // const resultBin = result[i].bin.filter(e => {
    //   return e !== '-'
    // })
    const resultBin = result[i].bin

    resultBin.forEach((e, j) => {
      if(e === '0'){
        text += `\^${String.fromCharCode(65+(j%26))}`
      }else if(e === '1'){
        text += `${String.fromCharCode(65+(j%26))}`
      }else if(e === '-'){
        text += '1'
      }

      if(j !== (resultBin.length-1)){
        text += ' * '
      }
    })
    if(i !== (result.length-1)){
      text += ' + '
    }
  }

  console.log(text + reset)
}

main()
