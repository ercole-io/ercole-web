import numeral from 'numeral'

export default (number, format, unit = '') => {
  return `${numeral(number).format(format)} ${unit}`
}
