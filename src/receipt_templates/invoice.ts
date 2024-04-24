export const generateInvoiceReceipt = () => {
    return `
        |CREDIT CARD RECEIPT
        {width:10 *}
        AMOUNT |^123.45
        ACCOUNT# |XXXXXXXXXXXX7890
        DATE | ${ new Date().toLocaleDateString() }
        APPROVAL |0123456
        {width:auto}
        CUSTOMER COPY|
    `
}



