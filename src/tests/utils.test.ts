import {describe, test, expect} from 'vitest'
import {removeUndefined, when, match} from "../utils"

describe('removeUndefined', () => {
  test('should remove undefined values from object', () => {
    const obj = {
      prop1: null,
      prop2: undefined,
      prop3: 'string',
      prop4: {},
      prop5: undefined
    }

    expect(removeUndefined(obj)).to.deep.equal({
        prop1: null,
        prop3: 'string',
        prop4: {},
    })
  })
})

describe('when', () => {
  test('should return value if condition not boolean', () => {
    expect(when('foo')).toBe('foo')
  })

  test('should return true Value if condition is true', () => {
    expect(when(true, 'foo')).toBe('foo')
  })

  test('should return false Value if condition is false', () => {
    expect(when(false, undefined, 'foo')).toBe('foo')
  })
})

describe('match', () => {
  test('should return first value that is not undefined', () => {
    expect(match(undefined, 'foo')).toBe('foo')
  })

  test('should return undefined if all values are undefined', () => {
    expect(match(undefined, undefined, undefined)).toBe(undefined)
  })
})