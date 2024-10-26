
import { render, screen } from '@testing-library/react'
import { MainLayout } from '../main-layout'

jest.mock('@/components/core/footer', () => ({
    Footer: () => <div data-testid="mock-footer">Footer Mock</div>
}))

jest.mock('@/components/core/navbar', () => ({
    Navbar: () => <div data-testid="mock-navbar">Navbar Mock</div>
}))

describe('MainLayout', () => {
    test('renders children content', () => {
        const testContent = <div data-testid="test-content">Test Content</div>
        render(
            <MainLayout>
                {testContent}
            </MainLayout>
        )

        expect(screen.getByTestId('test-content')).toBeInTheDocument()
        expect(screen.getByTestId('test-content')).toHaveTextContent('Test Content')
    })
})
