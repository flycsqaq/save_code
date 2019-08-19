const useMemo = (f: Function): Function => {
    const cache: any = {}
    return (n: string | number) => {
        if (cache[n] !== undefined) {
            cache[n] = f(n)
        }
        return cache[n]
    }
}
