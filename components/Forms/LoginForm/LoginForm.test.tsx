import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { LoginForm } from "./LoginForm"

const mockSwitchModal = jest.fn()

describe("LoginForm", () => {
    it("should render correctly", () => {
        render(<LoginForm switchModal={mockSwitchModal} />)

        const emailElement = screen.getByRole("textbox", {
            name: /email/i,
        })
        const passwordElement = screen.getByPlaceholderText("********")
        const switchElement = screen.getByText(/sign up here!/i)
        const submitElement = screen.getByRole("button", {
            name: /submit/i,
        })

        expect(emailElement).toBeInTheDocument()
        expect(passwordElement).toBeInTheDocument()
        expect(switchElement).toBeInTheDocument()
        expect(submitElement).toBeInTheDocument()
    })

    it("should initially have disabled submit button", () => {
        render(<LoginForm switchModal={mockSwitchModal} />)

        const submitElement = screen.getByRole("button", {
            name: /submit/i,
        })

        expect(submitElement).toBeDisabled()
    })

    it("should switch modal", async () => {
        const user = userEvent.setup()
        render(<LoginForm switchModal={mockSwitchModal} />)

        const switchElement = screen.getByText(/sign up here!/i)
        await user.click(switchElement)

        expect(mockSwitchModal).toHaveBeenCalled()
    })

    it("should display error message when email is invalid", async () => {
        const user = userEvent.setup()
        render(<LoginForm switchModal={mockSwitchModal} />)

        const emailElement = screen.getByRole("textbox", {
            name: /email/i,
        })
        await user.type(emailElement, "testmail")
        const errorMessage = screen.queryByText(/invalid email/i)

        expect(errorMessage).toBeInTheDocument()
    })

    it("should display error message when password is too short", async () => {
        const user = userEvent.setup()
        render(<LoginForm switchModal={mockSwitchModal} />)

        const passwordElement = screen.getByPlaceholderText("********")
        await user.type(passwordElement, "123")
        const errorMessage = screen.queryByText(
            /your password must have at least 8 characters/i
        )

        expect(errorMessage).toBeInTheDocument()
    })

    it("should have disabled submit button when email is invalid", async () => {
        const user = userEvent.setup()
        render(<LoginForm switchModal={mockSwitchModal} />)

        const emailElement = screen.getByRole("textbox", {
            name: /email/i,
        })
        await user.type(emailElement, "testmail")
        const submitElement = screen.queryByRole("button", {
            name: /submit/i,
        })

        expect(submitElement).toBeDisabled()
    })

    it("should have disabled submit button when password is too short", async () => {
        const user = userEvent.setup()
        render(<LoginForm switchModal={mockSwitchModal} />)

        const passwordElement = screen.getByPlaceholderText("********")
        await user.type(passwordElement, "123")
        const submitElement = screen.queryByRole("button", {
            name: /submit/i,
        })

        expect(submitElement).toBeDisabled()
    })

    it("should have enabled submit button when email and password are valid", async () => {
        const user = userEvent.setup()
        render(<LoginForm switchModal={mockSwitchModal} />)

        const emailElement = screen.getByRole("textbox", {
            name: /email/i,
        })
        const passwordElement = screen.getByPlaceholderText("********")

        await user.type(emailElement, "test@test.com")
        await user.type(passwordElement, "12345678")
        const submitElement = screen.queryByRole("button", {
            name: /submit/i,
        })

        expect(submitElement).toBeEnabled()
    })
})
