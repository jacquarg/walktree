'use_strict'

const WT = {}
WT.get = (obj, ...prop) => prop.reduce((current, key) => (current ? current[key] : undefined), obj)

WT.getFirst = obj => obj[Object.keys(obj)[0]]

WT.safeSet = (data, obj, ...prop) => {
  if (!prop || prop.length === 0) { return false }

  const lastProp = prop.pop()
  const lastObj = WT.get(obj, ...prop)
  if (lastObj) {
    lastObj[lastProp] = data
    return true
  } else {
    return false
  }
}

WT.getByMangoSubfields = (obj, key) => {
  const props = []
  let prev
  let curProp = ''
  key += '.'
  for (let c of key) {
    if (c === '.') {
      if (prev === '\\') {
        curProp += '.'
      } else {
        props.push(curProp)
        curProp = ''
      }
    } else if (c !== '\\') {
      curProp += c
    }
    prev = c
  }

  return WT.get(obj, ...props)
}

typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = WT :
// typeof define === 'function' && define.aPLDd ? define(factory) :
this.WT = WT // put on window.
