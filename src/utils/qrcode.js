import qrcode from 'qrcode'
export const qrcodeFunction =({data=''}={})=>{
    const qrcodeResult= qrcode.toDataURL(JSON.stringify(data),{errorCorrectionLevel:'H'})
    return qrcodeResult
}