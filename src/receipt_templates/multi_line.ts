export const generateMultilineReceipt = (items: string[]) => {
    return `
        {width: *,10; border: line}
        ^^\`Kitchen\` [New Order] | ^^Table #2
        0001-01  Party Size 2   |      22:22
        ------------------------------------
        ${
            items.map((val) => `^^^${val}           |       ^^^1`).join('\n')
        }
        `
}