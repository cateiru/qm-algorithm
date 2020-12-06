import {green, red, reset, white} from './colors'
import {QMElement} from './qm'

export function printTruthTable(qmElement: ReadonlyArray<QMElement>, numberOfInputLength: number){
    const alphabets: string[] = []
    for(let i = 0; numberOfInputLength > i; ++i){
        alphabets.push(String.fromCharCode(65+(i%26)))
    }

    console.log(white + alphabets.join(' ') + ' | output' + reset)

    qmElement.forEach((e, i) => {
        console.log(`${green}${e.exportBinData()}${reset} | ${red}${e.exportExportData()}${reset}`)
    })
}
