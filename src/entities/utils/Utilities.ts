import { IIterableInfo } from '@interfaces'

export const extractIterableInfo = (iterableString: string): IIterableInfo => {
    /**
     * iterableString can have only two formats:
     * - 'target in this.source'
     * - 'target in source'
     * In the first case, the 'this' prefix in 'this.source' refers to the 'vars' attribute in the Component that is calling the function
     * In the second case, the abscence of 'this' prefix in 'source' refers to the 'props' attribute in the Component that is calling the function
     *
     * Reasons of invalid syntax, and therefore returning 'isValid: false':
     * - Abscence of 'three-word-lenght' in iterableString (verified via String.split() method)
     * - Abscence of 'in' as second word in iterableString
     * - A 'source' prefix different than 'this'
     */
    let iterableInfo: IIterableInfo = { isValid: false }
    let iterableArr = iterableString.split(' ')
    let sourceArr = iterableArr[2]?.split('.')
    if (
        iterableArr.length != 3 ||
        iterableArr[1] != 'in' ||
        (sourceArr[0] != 'this' && sourceArr[0] != iterableArr[2])
    ) {
        return iterableInfo
    }
    if (sourceArr[0] == 'this') {
        iterableInfo.kind = 'vars'
        iterableInfo.source = sourceArr[1]
    } else {
        iterableInfo.kind = 'props'
        iterableInfo.source = sourceArr[0]
    }
    iterableInfo.target = iterableArr[0]
    iterableInfo.isValid = true
    return iterableInfo
}

export const replaceInString = (
    template: string,
    target: string,
    value: string
): string => {
    let variable = new RegExp(target, 'g')
    return template.replace(variable, value)
}
