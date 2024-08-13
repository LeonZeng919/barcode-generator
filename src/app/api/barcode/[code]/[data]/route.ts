import { NextRequest, NextResponse } from 'next/server'
import JsBarcode from 'jsbarcode'
import { DOMImplementation, XMLSerializer } from 'xmldom'

export async function GET(
    request: NextRequest,
    { params }: { params: { code: string; data: string } }
) {
    console.log('API route hit:', request.url); // 添加日志
    console.log('Received parameters:', params); // 添加日志

    const { code, data } = params

    if (!code || !data) {
        return NextResponse.json({ error: 'Invalid parameters' }, { status: 400 })
    }

    try {
        const document = new DOMImplementation().createDocument('http://www.w3.org/1999/xhtml', 'html', null)
        const svgNode = document.createElementNS('http://www.w3.org/2000/svg', 'svg')

        JsBarcode(svgNode, data, {
            xmlDocument: document,
            format: code.toLowerCase(),
            width: 2,
            height: 100,
            displayValue: true,
        })

        const svgString = new XMLSerializer().serializeToString(svgNode)

        console.log('Barcode generated successfully'); // 添加日志

        return new NextResponse(svgString, {
            headers: {
                'Content-Type': 'image/svg+xml',
                'Cache-Control': 'public, max-age=31536000, immutable',
            },
        })
    } catch (error) {
        console.error('Error generating barcode:', error)
        return NextResponse.json({ error: 'barcode not fond' }, { status: 404 })
    }
}