import '@testing-library/jest-dom'
import { render } from "@testing-library/react"
import { Footer } from '..'

describe("Test Footer Componenet", () => {
    test("Footer Render", () => {
        render(<Footer />)
        expect(document.querySelector("footer")).toBeInTheDocument
    })
})
