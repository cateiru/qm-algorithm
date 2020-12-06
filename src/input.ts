import {question} from 'readline-sync'
import {green, reset} from './colors'
import {QMElement} from './qm'

export default function inputQM(numberOfInputLength: number): ReadonlyArray<QMElement>{
  const allElement = Math.pow(2, numberOfInputLength)
  const qmElement = Array(numberOfInputLength)

  for(let i = 0; allElement > i; ++i){
    qmElement[i] = new QMElement(i, numberOfInputLength)
    let out = question(`${green}${qmElement[i].exportBinData()}${reset} の出力を入力してください: `)
    if(out === ''){
      out = '0'
    }
    while(out !== '0' && out !== '1' && out !== ''){
      out = question(`${green}${qmElement[i].exportBinData()}${reset} 0または1を入力してください: `)
    }
    qmElement[i].inputExport(out)
  }

  return qmElement

}
