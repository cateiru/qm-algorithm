import {QMElement} from './qm'

export interface Label {
  bin: ReadonlyArray<string>
  dec: number[]
  oneLength: number
}

export function calculate(element: ReadonlyArray<QMElement>, numberOfInputLength: number): ReadonlyArray<Label>{
  const label: Array<Label> = []

  element.forEach((e, i) => {
    const oneLength = e.exportNumberOfOne()

    if(oneLength !== -1){
      label.push({
        bin: e.exportBinOrigenData(),
        dec: [e.exportInputNumberData()],
        oneLength: oneLength
      })
    }
  })

  const term = optimization(label)

  console.log(term)

  let requiredTermDec: number[] = []
  const requiredItems: Label[] = []
  const selectItems: Label[] = []
  const multipleTerms: number[] = []

  for(let i = 0; term.length > i; ++i){
    // 必須項を求める
    let isRequired = false
    for(const termDec of term[i].dec){
      let isMin = true
      for(let j = 0; term.length > j; ++j){
        if(j !== i && term[j].dec.includes(termDec)){
          isMin = false
        }
      }
      if(isMin){
        isRequired = true
      }else{
        if(!multipleTerms.includes(termDec)){
          multipleTerms.push(termDec)
        }
      }
    }
    if(isRequired){
      requiredItems.push(term[i])
      requiredTermDec = requiredTermDec.concat(term[i].dec)
    }else{
      selectItems.push(term[i])
    }
  }

  const needTerm = multipleTerms.filter(i =>requiredTermDec.indexOf(i) == -1);
  const needMax = needTerm.length

  const termTag: {
    needItems: number,
    label: Label
  }[] = []

  // 最簡形を求める
  for(let i = 0; selectItems.length > i; ++i){
    let count = 0
    for(let j = 0; needMax > j; ++j){
      if(selectItems[i].dec.includes(needTerm[j])){
        count++
      }
    }
    termTag.push({
      needItems: count,
      label: selectItems[i]
    })
  }

  termTag.sort().reverse()

  let weight = needMax
  for(const element of termTag){
    requiredItems.push(element.label)

    weight -= element.needItems
    if(0 >= weight){
      break
    }
  }

  return requiredItems
}

/**
* 再帰的に主項を計算します。
* @param label 出力が1のときの入力データ
*/
function optimization(label: ReadonlyArray<Label>): ReadonlyArray<Label> {

  if(label.length <= 0) {
    return []
  }

  const newLabel: Label[] = []
  const mainTerm: Label[] = []
  let flag = Array(label.length-1).fill(false)

  for(let i = 0; label.length > i; ++i){
    for(let j = i+1; label.length > j; ++j){
      if(Math.abs(label[i].oneLength - label[j].oneLength) === 1){
        const parentLabel = label[i].bin
        const childLabel = label[j].bin

        const equalIndex = diffArray(parentLabel, childLabel)

        if(typeof equalIndex !== 'undefined'){
          flag[i] = true
          flag[j] = true
          const newBin = parentLabel.slice()
          newBin.splice(equalIndex, 1, '-')

          const newDec = label[i].dec.concat(label[j].dec).sort()
          let isDuplicate = false

          newLabel.forEach(e=>{
            if(e.dec.join('') === newDec.join('')){
              isDuplicate = true
            }
          })

          if(!isDuplicate){
            newLabel.push({
              bin: newBin,
              dec: newDec,
              oneLength: Math.min(label[i].oneLength, label[j].oneLength)
            })
          }
        }
      }
    }
    if(!flag[i]){
      mainTerm.push(label[i])
    }
  }

  const term = optimization(newLabel)

  return mainTerm.concat(term)
}

/**
* 配列を比較して違う要素のインデックスを返します。
* @param first Array element
* @param second Array element
*/
function diffArray(first: ReadonlyArray<string>, second: ReadonlyArray<string>): (number|undefined) {
  if(first.length !== second.length){
    throw new Error('引数の配列は同じ長さである必要があります。')
  }

  let elementIndex = 0
  let count = 0

  for(let i = 0; first.length > i; ++i){
    if(first[i] !== second[i]){
      elementIndex = i
      count++
    }
  }

  if(count === 1){
    return elementIndex
  }
  return
}
