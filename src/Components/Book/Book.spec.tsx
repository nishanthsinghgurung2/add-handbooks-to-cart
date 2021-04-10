import { render } from "@testing-library/react"
import Book from "./Book"

describe('Book', () => {
  it('should render book component with the selected color', () => {
    const { getByTestId } = render(<Book color="red" />);
    expect(getByTestId("book")).toHaveStyle(`background-color: hsl(15, 81%, 59%)`)
  })
})