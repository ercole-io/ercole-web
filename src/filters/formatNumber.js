import numeral from 'numeral'

export default (number, format) => {
  return numeral(number).format(format)
}
