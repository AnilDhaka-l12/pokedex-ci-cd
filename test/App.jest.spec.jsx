import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import axios from 'axios'
import '@testing-library/jest-dom'
import App from '../src/App'

jest.mock('axios')

describe('<App />', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('fetches data', async () => {
    const mockPokemonList = [
      { id: 1, name: 'bulbasaur', type: ['grass'], abilities: ['overgrow'] },
      { id: 2, name: 'ivysaur', type: ['grass'], abilities: ['overgrow'] }
    ]

    axios.get.mockResolvedValueOnce({ data: mockPokemonList })

    render(
      <Router>
        <App />
      </Router>
    )

    await waitFor(() => {
      expect(screen.getByText('bulbasaur')).toBeInTheDocument()
    })
    expect(axios.get).toHaveBeenCalledWith('/api/pokemon')
  })
})