import React, { CSSProperties } from 'react'
import { describe, test } from 'vitest'
import {Stack} from '../'
import { matchesSnapshot } from './utils'

describe('Stack', () => {
  test('should render Stack with defaults', () => {
    matchesSnapshot(<Stack />)
  })

  test('should allow using style prop', () => {
    matchesSnapshot(<Stack style={{ color: 'red' }} />)
  })

  test('should be polymorhic component', () => {
    matchesSnapshot(<Stack as="main"/>)
    matchesSnapshot(<Stack component="footer"/>)
  })

  test('should render Stack as inline', () => {
    matchesSnapshot(<Stack inline />)
  })

  test('should render Stack as row', () => {
    matchesSnapshot(<Stack />)
    matchesSnapshot(<Stack direction='row' />)
    matchesSnapshot(<Stack flexDirection='row' />)
    matchesSnapshot(<Stack row />)
  })

  test('should render Stack as column', () => {
    matchesSnapshot(<Stack flexDirection='column' />)
    matchesSnapshot(<Stack direction='column' />)
    matchesSnapshot(<Stack column />)
  })

  test('should render with gap',() => {
    matchesSnapshot(<Stack gap='8px' />)
    matchesSnapshot(<Stack columnGap='8px'/>)
    matchesSnapshot(<Stack rowGap='8px'/>)
  })

  test('should render with justified content',() => {
    matchesSnapshot(<Stack main="flex-start" />)
    matchesSnapshot(<Stack justify="flex-end" />)
    matchesSnapshot(<Stack justifyContent="center" />)
    matchesSnapshot(<Stack justifyContentCenter />)
    matchesSnapshot(<Stack justifyContentStart />)
    matchesSnapshot(<Stack justifyContentEnd/>)
    matchesSnapshot(<Stack justifyContentSpaceBetween/>)
    matchesSnapshot(<Stack justifyContentSpaceAround/>)
  })

  test('should allow overriding styles', () => {
    const handleOverride = (style: CSSProperties) => {
      const scale = ["16px", "32px"]
      if (style.gap) {
        style.gap = scale[style.gap as number];
      }
    
      return style;
    }
    matchesSnapshot(<Stack gap={1} onOverrideStyles={handleOverride}/>)
  })
})