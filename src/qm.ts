export class QMElement {
  private inputData: number
  private label: number
  private inputBinData: ReadonlyArray<'0'|'1'>
  private exportData: string

  constructor(inputData: number, label: number){
    this.inputData = inputData
    this.label = label
    this.inputBinData = (this.inputData.toString(2).padStart(this.label, '0')).split('') as ('0'|'1')[]
    this.exportData = '0'
  }

  inputExport(exportData: string){
    this.exportData = exportData
  }

  exportBinData(): string {
    return this.inputBinData.join(' ')
  }

  exportBinOrigenData(): ReadonlyArray<'0' | '1'>{
    return this.inputBinData
  }

  exportInputNumberData(): number {
    return this.inputData
  }

  exportExportData(): string {
    return this.exportData
  }

  exportNumberOfOne(): number {
    if(this.exportData === '1'){
      return this.inputBinData.filter(x => x==='1').length
    }else{
      return -1
    }
  }

  exportLabel(): number {
    return this.label
  }
}
