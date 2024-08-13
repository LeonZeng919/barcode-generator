export const barcodeTypes = [
    {
        name: 'Code 128',
        types: [
            { name: 'Code 128', value: 'Code128', initData: 'ABC-abc-1234' },
            { name: 'Code 128A', value: 'Code128A', initData: 'ABC123' },
            { name: 'Code 128B', value: 'Code128B', initData: 'Hello World!' },
            { name: 'Code 128C', value: 'Code128C', initData: '123456' },
        ],
    },
    {
        name: 'EAN / UPC',
        types: [
            { name: 'EAN-13', value: 'Ean13', initData: '5901234123457' },
            { name: 'EAN-8', value: 'Ean8', initData: '96385074' },
            { name: 'EAN-5', value: 'Ean5', initData: '54495' },
            { name: 'EAN-2', value: 'Ean2', initData: '53' },
            { name: 'UPC-A', value: 'Upc', initData: '123456789012' },
            { name: 'UPC-E', value: 'UpcE', initData: '01234565' },
        ],
    },
    {
        name: 'Code 39',
        types: [
            { name: 'Code 39', value: 'Code39', initData: 'CODE 39' },
        ],
    },
    {
        name: 'ITF',
        types: [
            { name: 'ITF', value: 'Itf', initData: '1234567890' },
            { name: 'ITF-14', value: 'Itf14', initData: '15400141288763' },
        ],
    },
    {
        name: 'MSI Plessey',
        types: [
            { name: 'MSI Plessey (Mod 10)', value: 'Msi10', initData: '1234567' },
            { name: 'MSI Plessey (Mod 11)', value: 'Msi11', initData: '1234567' },
            { name: 'MSI Plessey (Mod 1010)', value: 'Msi1010', initData: '1234567' },
            { name: 'MSI Plessey (Mod 1110)', value: 'Msi1110', initData: '1234567' },
        ],
    },
    {
        name: 'Pharmacode',
        types: [
            { name: 'Pharmacode', value: 'Pharmacode', initData: '1234' },
        ],
    },
    {
        name: 'Codabar',
        types: [
            { name: 'Codabar', value: 'Codabar', initData: 'A1234B' },
        ],
    },
];

export function findBarcodeCategory(value: string): string | undefined {
    for (const category of barcodeTypes) {
        const matchingType = category.types.find(type => type.value.toUpperCase() === value.toUpperCase());
        if (matchingType) {
            return category.name;
        }
    }
    return undefined;
}
