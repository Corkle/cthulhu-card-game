import React from 'react'
import { create } from 'react-test-renderer'
import JoinGamePage from './JoinGamePage'
jest.mock('../socket')

const createComponent = () => {
  return create(<JoinGamePage />)
}

describe('Nickname selection view', () => {
  describe('initial load', () => {
    test('should render component', () => {
      const component = createComponent() 
      expect(component).toMatchSnapshot()
    })

    test('should render nickname text input', () => {
      const component = createComponent() 
      const input = component.root.findByType('input')
      expect(input.props.placeholder).toEqual('Nickname')
      expect(input.props.type).toEqual('text')
      expect(input.props.className).toEqual('input is-large')
      expect(input.props.onChange).toBeDefined()
      expect(input.props.onKeyDown).toBeDefined()
    })

    test('should render Next button', () => {
      const component = createComponent() 
      const button = component.root.findByType('button')
      expect(button.props.children).toEqual('Next')
      expect(button.props.onClick).toBeDefined()
    })
  })

  describe('clicking Next button', () => {
    test('when nickname is blank, should show error text', () => {
      const component = createComponent()
      const input = component.root.findByType('input')
      const button = component.root.findByType('button')
      input.props.onChange({target: {value: ''}})
      button.props.onClick()
      const errorText = component.root.findByType('p')
      expect(errorText.props.children).toEqual('Please enter a valid nickname')
    })
  })
})
