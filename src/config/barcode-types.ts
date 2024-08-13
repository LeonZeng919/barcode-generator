export const barcodeTypes = [
    {
        name: 'CODE128',
        types: [
            { name: 'CODE128', value: 'Code128', initData: 'ABC-abc-1234' },
            { name: 'CODE128 A', value: 'Code128A', initData: 'ABC123' },
            { name: 'CODE128 B', value: 'Code128B', initData: 'Hello World!' },
            { name: 'CODE128 C', value: 'Code128C', initData: '123456' },
        ],
    },
    {
        name: 'EAN',
        types: [
            { name: 'EAN-13', value: 'Ean13', initData: '5901234123457' },
            { name: 'EAN-8', value: 'Ean8', initData: '96385074' },
            { name: 'EAN-5', value: 'Ean5', initData: '54495' },
            { name: 'EAN-2', value: 'Ean2', initData: '53' },
            { name: 'UPC (A)', value: 'Upc', initData: '123456789012' },
            { name: 'UPC (E)', value: 'UpcE', initData: '01234565' },
        ],
    },
    {
        name: 'CODE39',
        types: [
            { name: 'CODE39', value: 'Code39', initData: 'CODE 39' },
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
        name: 'MSI',
        types: [
            { name: 'MSI10', value: 'Msi10', initData: '1234567' },
            { name: 'MSI11', value: 'Msi11', initData: '1234567' },
            { name: 'MSI1010', value: 'Msi1010', initData: '1234567' },
            { name: 'MSI1110', value: 'Msi1110', initData: '1234567' },
        ],
    },
    {
        name: 'PHARMACODE',
        types: [
            { name: 'Pharmacode', value: 'Pharmacode', initData: '1234' },
        ],
    },
    {
        name: 'CODABAR',
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
