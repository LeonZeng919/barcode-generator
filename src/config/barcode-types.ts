export const barcodeTypes = [
  {
    name: 'Linear Codes',
    types: [
      { name: 'Code 11', value: 'code11', initData: '12345678901' },
      { name: 'Code 128', value: 'code128', initData: 'ABC-abc-1234' },
      { name: 'Code 16K', value: 'code16k', initData: 'ABCD1234abcd' },
      { name: 'Code 25', value: 'code2of5', initData: '1234567890' },
      { name: 'Code 39', value: 'code39', initData: 'CODE 39' },
      { name: 'Code 39 Extended', value: 'code39ext', initData: 'Code39 Ext' },
      { name: 'Code 93', value: 'code93', initData: 'CODE 93' },
      { name: 'Code 93 Extended', value: 'code93ext', initData: 'Code93 Ext' },
      { name: 'COOP 2 of 5', value: 'coop2of5', initData: '12345678' },
      { name: 'Flattermarken', value: 'flattermarken', initData: '11099' },
      { name: 'Datalogic 2 of 5', value: 'datalogic2of5', initData: '1234567' },
      {
        name: 'Industrial 2 of 5',
        value: 'industrial2of5',
        initData: '12345678',
      },
      {
        name: 'Interleaved 2 of 5',
        value: 'interleaved2of5',
        initData: '1234567890',
      },
      { name: 'IATA 2 of 5', value: 'iata2of5', initData: '123456789' },
      { name: 'Matrix 2 of 5', value: 'matrix2of5', initData: '12345678' },
      { name: 'MSI Modified Plessey', value: 'msi', initData: '123456' },
      { name: 'Plessey UK', value: 'plessey', initData: '12345678' },
      { name: 'Codabar', value: 'rationalizedCodabar', initData: 'A12345B' },
      { name: 'Telepen', value: 'telepen', initData: 'ABCD1234' },
      {
        name: 'Telepen Numeric',
        value: 'telepennumeric',
        initData: '12345678',
      },
    ],
  },
  {
    name: 'Postal Codes',
    types: [
      {
        name: 'AusPost 4 State Customer Code',
        value: 'auspost',
        initData: '5956439111ABA 9',
      },
      {
        name: 'Japan Post 4 State Customer Code',
        value: 'japanpost',
        initData: '6540123789-A-K-Z',
      },
      {
        name: 'Royal Dutch TPG Post KIX',
        value: 'kix',
        initData: '1231FZ13XHS',
      },
      {
        name: 'Royal Mail Mailmark',
        value: 'mailmark',
        initData: '1100000000000XY1A',
      },
      {
        name: 'USPS Intelligent Mail',
        value: 'onecode',
        initData: '0123456709498765432101234567891',
      },
      { name: 'USPS PLANET', value: 'planet', initData: '01234567890' },
      { name: 'USPS POSTNET', value: 'postnet', initData: '12345' },
      {
        name: 'Royal Mail 4 State Customer Code',
        value: 'royalmail',
        initData: 'LE28HS9Z',
      },
    ],
  },
  {
    name: 'GS1 DataBar',
    types: [
      {
        name: 'GS1 DataBar Expanded',
        value: 'databarexpanded',
        initData: '(01)98898765432106(3202)012345(15)991231',
      },
      {
        name: 'GS1 DataBar Expanded Composite',
        value: 'databarexpandedcomposite',
        initData: '(01)98898765432106(3202)012345(15)991231',
      },
      {
        name: 'GS1 DataBar Expanded Stacked',
        value: 'databarexpandedstacked',
        initData: '(01)98898765432106(3202)012345(15)991231',
      },
      {
        name: 'GS1 DataBar Expanded Stacked Composite',
        value: 'databarexpandedstackedcomposite',
        initData: '(01)98898765432106(3202)012345(15)991231',
      },
      {
        name: 'GS1 DataBar Limited',
        value: 'databarlimited',
        initData: '(01)15012345678907',
      },
      {
        name: 'GS1 DataBar Limited Composite',
        value: 'databarlimitedcomposite',
        initData: '(01)15012345678907',
      },
      {
        name: 'GS1 DataBar Omnidirectional',
        value: 'databaromni',
        initData: '(01)24012345678905',
      },
      {
        name: 'GS1 DataBar Omnidirectional Composite',
        value: 'databaromnicomposite',
        initData: '(01)24012345678905',
      },
      {
        name: 'GS1 DataBar Stacked',
        value: 'databarstacked',
        initData: '(01)24012345678905',
      },
      {
        name: 'GS1 DataBar Stacked Composite',
        value: 'databarstackedcomposite',
        initData: '(01)24012345678905',
      },
      {
        name: 'GS1 DataBar Stacked Omnidirectional',
        value: 'databarstackedomni',
        initData: '(01)24012345678905',
      },
      {
        name: 'GS1 DataBar Stacked Omnidirectional Composite',
        value: 'databarstackedomnicomposite',
        initData: '(01)24012345678905',
      },
      {
        name: 'GS1 DataBar Truncated',
        value: 'databartruncated',
        initData: '(01)24012345678905',
      },
      {
        name: 'GS1 DataBar Truncated Composite',
        value: 'databartruncatedcomposite',
        initData: '(01)24012345678905',
      },
    ],
  },
  {
    name: 'EAN / UPC',
    types: [
      { name: 'EAN-13', value: 'ean13', initData: '5901234123457' },
      {
        name: 'EAN-13 Composite',
        value: 'ean13composite',
        initData: '5901234123457',
      },
      { name: 'GS1-14', value: 'ean14', initData: '12345678901231' },
      { name: 'EAN-2 (2 digit addon)', value: 'ean2', initData: '42' },
      { name: 'EAN-5 (5 digit addon)', value: 'ean5', initData: '54495' },
      { name: 'EAN-8', value: 'ean8', initData: '96385074' },
      { name: 'EAN-8 Composite', value: 'ean8composite', initData: '96385074' },
      { name: 'UPC-A', value: 'upca', initData: '123456789012' },
      {
        name: 'UPC-A Composite',
        value: 'upcacomposite',
        initData: '123456789012',
      },
      { name: 'UPC-E', value: 'upce', initData: '06543217' },
      { name: 'UPC-E Composite', value: 'upcecomposite', initData: '06543217' },
      { name: 'ITF-14', value: 'itf14', initData: '15400141288763' },
    ],
  },
  {
    name: '2D Codes',
    types: [
      { name: 'Aztec Code', value: 'azteccode', initData: 'Aztec Code' },
      {
        name: 'Compact Aztec Code',
        value: 'azteccodecompact',
        initData: 'Compact Aztec',
      },
      { name: 'Aztec Runes', value: 'aztecrune', initData: '1' },
      { name: 'Codablock F', value: 'codablockf', initData: 'Codablock F 123' },
      { name: 'Code 49', value: 'code49', initData: 'CODE 49' },
      { name: 'Code One', value: 'codeone', initData: 'Code One' },
      { name: 'Data Matrix', value: 'datamatrix', initData: 'Data Matrix' },
      {
        name: 'Data Matrix Rectangular',
        value: 'datamatrixrectangular',
        initData: 'DM Rectangle',
      },
      {
        name: 'Data Matrix Rectangular Extension',
        value: 'datamatrixrectangularextension',
        initData: 'DM Rect Ext',
      },
      { name: 'DotCode', value: 'dotcode', initData: 'Dot Code' },
      { name: 'Han Xin Code', value: 'hanxin', initData: 'Han Xin Code' },
      { name: 'MaxiCode', value: 'maxicode', initData: 'MaxiCode' },
      { name: 'MicroPDF417', value: 'micropdf417', initData: 'MicroPDF417' },
      { name: 'Micro QR Code', value: 'microqrcode', initData: 'MicroQR' },
      { name: 'PDF417', value: 'pdf417', initData: 'PDF417' },
      {
        name: 'Compact PDF417',
        value: 'pdf417compact',
        initData: 'Compact PDF417',
      },
      { name: 'QR Code', value: 'qrcode', initData: 'QR Code' },
      {
        name: 'Rectangular Micro QR Code',
        value: 'rectangularmicroqrcode',
        initData: 'RectMicroQR',
      },
      { name: 'Ultracode', value: 'ultracode', initData: 'Ultracode' },
    ],
  },
  {
    name: 'GS1 2D Barcodes',
    types: [
      { name: 'GS1-128', value: 'gs1-128', initData: '(01)12345678901231' },
      {
        name: 'GS1-128 Composite',
        value: 'gs1-128composite',
        initData: '(01)12345678901231',
      },
      {
        name: 'GS1 Composite 2D Component',
        value: 'gs1-cc',
        initData: '(00)123456789012345678',
      },
      {
        name: 'GS1 Data Matrix',
        value: 'gs1datamatrix',
        initData: '(01)04012345678901',
      },
      {
        name: 'GS1 Data Matrix Rectangular',
        value: 'gs1datamatrixrectangular',
        initData: '(01)04012345678901',
      },
      {
        name: 'GS1 Digital Link Data Matrix',
        value: 'gs1dldatamatrix',
        initData: 'https://id.gs1.org/01/9506000134352',
      },
      {
        name: 'GS1 Digital Link QR Code',
        value: 'gs1dlqrcode',
        initData: 'https://id.gs1.org/01/9506000134352',
      },
      {
        name: 'GS1 DotCode',
        value: 'gs1dotcode',
        initData: '(01)03453120000011(17)191125(10)ABCD1234',
      },
      {
        name: 'GS1 North American Coupon',
        value: 'gs1northamericancoupon',
        initData: '(8110)106141416543213500110000310123196000',
      },
      {
        name: 'GS1 QR Code',
        value: 'gs1qrcode',
        initData: '(01)04012345678901',
      },
    ],
  },
  {
    name: 'Banking and Payments',
    types: [
      { name: 'BC412', value: 'bc412', initData: 'BC412' },
      { name: 'PosiCode', value: 'posicode', initData: 'PosiCode' },
    ],
  },
  {
    name: 'Healthcare Codes',
    types: [
      { name: 'Italian Pharmacode', value: 'code32', initData: '12345678' },
      {
        name: 'HIBC Aztec Code',
        value: 'hibcazteccode',
        initData: '+A123BJC5D6E71',
      },
      {
        name: 'HIBC Codablock F',
        value: 'hibccodablockf',
        initData: '+A123BJC5D6E71',
      },
      {
        name: 'HIBC Code 128',
        value: 'hibccode128',
        initData: '+A123BJC5D6E71',
      },
      { name: 'HIBC Code 39', value: 'hibccode39', initData: '+A123BJC5D6E71' },
      {
        name: 'HIBC Data Matrix',
        value: 'hibcdatamatrix',
        initData: '+A123BJC5D6E71',
      },
      {
        name: 'HIBC Data Matrix Rectangular',
        value: 'hibcdatamatrixrectangular',
        initData: '+A123BJC5D6E71',
      },
      {
        name: 'HIBC MicroPDF417',
        value: 'hibcmicropdf417',
        initData: '+A123BJC5D6E71',
      },
      { name: 'HIBC PDF417', value: 'hibcpdf417', initData: '+A123BJC5D6E71' },
      { name: 'HIBC QR Code', value: 'hibcqrcode', initData: '+A123BJC5D6E71' },
      {
        name: 'Pharmaceutical Binary Code',
        value: 'pharmacode',
        initData: '123456',
      },
      { name: 'Two-track Pharmacode', value: 'pharmacode2', initData: '12345' },
      { name: 'Pharmazentralnummer (PZN)', value: 'pzn', initData: '12345678' },
    ],
  },
  {
    name: 'ISBN Codes',
    types: [
      { name: 'ISBN', value: 'isbn', initData: '978-3-16-148410-0' },
      { name: 'ISMN', value: 'ismn', initData: '979-0-2600-0043-8' },
      { name: 'ISSN', value: 'issn', initData: '2049-3630' },
    ],
  },
  {
    name: 'Other Codes',
    types: [
      { name: 'Channel Code', value: 'channelcode', initData: '3493' },
      { name: 'Marks & Spencer', value: 'mands', initData: 'X34B1' },
      { name: 'Custom 4 state symbology', value: 'daft', initData: 'DAFTDAFT' },
      {
        name: 'Custom 1D symbology',
        value: 'raw',
        initData: '331132131313411',
      },
      { name: 'Miscellaneous symbols', value: 'symbol', initData: 'fima' },
    ],
  },
  {
    name: 'Postal and Logistics',
    types: [
      {
        name: 'Deutsche Post Identcode',
        value: 'identcode',
        initData: '12345678901234',
      },
      {
        name: 'Deutsche Post Leitcode',
        value: 'leitcode',
        initData: '1234567890123',
      },
      { name: 'SSCC-18', value: 'sscc18', initData: '123456789012345675' },
    ],
  },
  {
    name: 'Country Specific',
    types: [
      {
        name: 'Swiss QR Code',
        value: 'swissqrcode',
        initData:
          'SPC\n0200\n1\nCH4431999123000889012\nS\nMax Muster & Söhne\nMusterstrasse\n123\n8000\nSeldwyla\nCH\n\n\n\n\n\n\n\n\n1949.75\nCHF\nS\nMax Mustermann\nMusterstrasse 1\n8000\nSeldwyla\nCH\nQRR\n210000000003139471430009017\nOrder from 15.10.2020\nEPD\n',
      },
    ],
  },
]

export function findBarcodeCategory(value: string): string | undefined {
  for (const category of barcodeTypes) {
    const matchingType = category.types.find(
      (type) => type.value.toUpperCase() === value.toUpperCase(),
    )
    if (matchingType) {
      return category.name
    }
  }
  return undefined
}
