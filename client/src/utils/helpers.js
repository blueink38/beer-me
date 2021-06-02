export function formatPhone(number) {
    const newnum = number.slice(0,3) + "-" + number.slice(3,6) + "-" + number.slice(6,10)
    return newnum
}