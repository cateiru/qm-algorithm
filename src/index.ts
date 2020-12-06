import inputQM from './input'
import {question} from 'readline-sync'
import {printTruthTable} from './printData'


function main() {
  const numberOfInputLength = parseInt(question('入力の数を入力してください: '))
  const qms = inputQM(numberOfInputLength)

  printTruthTable(qms, numberOfInputLength)
}

main()
