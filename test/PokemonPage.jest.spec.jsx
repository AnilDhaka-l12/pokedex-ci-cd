import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import axios from 'axios'
import '@testing-library/jest-dom'
import PokemonPage from '../src/PokemonPage'

jest.mock('axios')

describe('<PokemonPage />', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render abilities', async () => {
    const mockPokemon = {
      name: 'bulbasaur',
      type: ['grass', 'poison'],
      abilities: ['overgrow']
    }

    axios.get.mockResolvedValueOnce({ data: mockPokemon })

    render(
      <MemoryRouter initialEntries={['/pokemon/bulbasaur']}>
        <PokemonPage />
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(screen.getByText('bulbasaur')).toBeInTheDocument()
      expect(screen.getByText('overgrow')).toBeInTheDocument()
    })
  })
})