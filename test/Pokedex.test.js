import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import App from '../src/App'

jest.mock('axios', () => ({
  get: jest.fn().mockResolvedValue({ data: [] })
}))

describe('Pokedex App', () => {
  test('renders loading state initially', () => {
    render(<App />)
    expect(screen.getByText(/Loading Pokemon/i)).toBeInTheDocument()
  })
})