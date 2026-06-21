import { fireEvent, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { renderWithTheme } from '@/test/render'
import { MainMenuLayout } from '../MainMenuLayout'
import { PageLayout } from '../PageLayout'
import { TwoColumnLayout } from '../TwoColumnLayout'

describe('layout templates', () => {
  it('renders the main menu hero, content, and footer', () => {
    renderWithTheme(
      <MainMenuLayout tagline="Ready for launch" footer={<footer>Footer content</footer>}>
        Menu content
      </MainMenuLayout>,
    )
    expect(screen.getByTestId('hero-logo-card')).toBeInTheDocument()
    expect(screen.getByText('Ready for launch')).toBeInTheDocument()
    expect(screen.getByText('Menu content')).toBeInTheDocument()
    expect(screen.getByText('Footer content')).toBeInTheDocument()
  })

  it('renders a page layout and invokes its optional back action', () => {
    const onBack = vi.fn()
    renderWithTheme(<PageLayout title="Page Title" subtitle="Page subtitle" onBack={onBack}>Page body</PageLayout>)
    fireEvent.click(screen.getByRole('button', { name: /Back to Menu/ }))
    expect(onBack).toHaveBeenCalled()
    expect(screen.getByText('Page body')).toBeInTheDocument()
  })

  it('renders both two-column regions', () => {
    renderWithTheme(<TwoColumnLayout title="Columns" leftColumn="Left region" rightColumn="Right region" />)
    expect(screen.getByText('Left region')).toBeInTheDocument()
    expect(screen.getByText('Right region')).toBeInTheDocument()
  })
})
