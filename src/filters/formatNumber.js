import numeral from 'numeral'

export default (number, format, unit = null, pos = null) => {
  const numFormat = `${numeral(number).format(format)}`
  if (!pos) {
    return `${numFormat} ${unit}`
  } else {
    return `${unit} ${numFormat}`
  }
}
