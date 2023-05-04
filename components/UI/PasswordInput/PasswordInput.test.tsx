import { render, screen } from "@testing-library/react"
import { PasswordInput } from "@/components/UI/PasswordInput"
import userEvent from "@testing-library/user-event"

describe("PasswordInput", () => {
    it("should render initially as password", () => {
        render(
            <PasswordInput
                placeholder="passwordPlaceholder"
                name="password"
                id="password"
            />
        )

        const input = screen.getByPlaceholderText("passwordPlaceholder")

        expect(input).toHaveAttribute("type", "password")
    })

    it("should show a password after click a button", async () => {
        const user = userEvent.setup()
        render(
            <PasswordInput
                placeholder="passwordPlaceholder"
                name="password"
                id="password"
            />
        )

        const input = screen.getByPlaceholderText("passwordPlaceholder")
        const button = screen.getByRole("button", {
            name: "show password",
        })

        await user.click(button)

        expect(input).toHaveAttribute("type", "text")
    })
})
