const range = (start: number, end: number, step: number = 1): number[] => {
    const arr: number[] = []
    for (let i = start; i < end; i += step) {
        arr.push(i)
    }
    return arr
}

const removeDuplicate = function<T>(arr: T[], keys: (string | number)[]): T[] {
    const len: number = keys.length
    if (len === 0) {
        return Array.from(new Set(arr))
    } else {

    }
}

const findParam = (obj: Object, keys: (string | number)[]): any => {
    keys.reduce((obj, key) => {
        
    }, obj)
}