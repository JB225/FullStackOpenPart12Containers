import { expect, test } from "vitest"
import Todo from "./Todo"
import { render, screen } from "@testing-library/react"

test('renders todo text', () => {
    render(<Todo text={'Testing todos'} status={'done'}/>)

    const element = screen.getByText('Testing todos')
    expect(element).toBeDefined()
})