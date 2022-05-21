import React, { ReactElement } from 'react'
import renderer from 'react-test-renderer'

export const matchesSnapshot = (component: ReactElement<any, string | React.JSXElementConstructor<any>>, inlineSnapshot?: string) => {
  const rendered =renderer.create(component)
  const result = rendered.toJSON()
  expect(result).toBeDefined()
  expect(result).not.toBeInstanceOf(Array)
  if (inlineSnapshot) {
    expect(result).toMatchInlineSnapshot(inlineSnapshot)
  } else {
    expect(result).toMatchSnapshot()
  }
}