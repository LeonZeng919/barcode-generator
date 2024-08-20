import React from 'react'
import { Button } from '@/components/ui/button'
import { Upload } from 'lucide-react'
import { useCSVReader } from 'react-papaparse'
// import * as XLSX from 'xlsx'

interface ImportDataProps {
  setInput: (input: string) => void
}

const ImportData: React.FC<ImportDataProps> = ({ setInput }) => {
  const { CSVReader } = useCSVReader()

  const handleCSVImport = (data: any) => {
    const importedData = data.data
      .map((row: string[]) => row.join('\t'))
      .join('\n')
    setInput(importedData)
  }

  //   const handleExcelImport = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     const file = e.target.files?.[0]
  //     if (file) {
  //       const reader = new FileReader()
  //       reader.onload = (evt) => {
  //         const bstr = evt.target?.result
  //         const wb = XLSX.read(bstr, { type: 'binary' })
  //         const wsname = wb.SheetNames[0]
  //         const ws = wb.Sheets[wsname]
  //         const data = XLSX.utils.sheet_to_json(ws, { header: 1 }) as unknown[][]
  //         const importedData = data
  //           .map((row) => (row as any[]).join('\t'))
  //           .join('\n')
  //         setInput(importedData)
  //       }
  //       reader.readAsBinaryString(file)
  //     }
  //   }

  return (
    <div className="flex gap-2">
      <CSVReader onUploadAccepted={handleCSVImport}>
        {({ getRootProps }: any) => (
          <div className="flex  items-center ">
            <span className="text-xs">Import CSV</span>
            <Button
              {...getRootProps()}
              size="icon"
              variant="ghost"
              title="Import CSV"
            >
              <Upload className="h-5 w-5" />
            </Button>
          </div>
        )}
      </CSVReader>
      {/* <Button
        size="icon"
        variant="ghost"
        title="Import Excel"
        onClick={() => document.getElementById('excel-upload')?.click()}
      >
        <Upload className="h-5 w-5" />
        <input
          id="excel-upload"
          type="file"
          accept=".xlsx, .xls"
          onChange={handleExcelImport}
          style={{ display: 'none' }}
        />
      </Button> */}
    </div>
  )
}

export default ImportData
