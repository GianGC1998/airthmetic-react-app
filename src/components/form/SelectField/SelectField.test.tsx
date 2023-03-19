import { render, screen, fireEvent } from "@testing-library/react";
import { SelectField } from "./SelectField";

describe("SelectField", () => {
  const renderComponent = () => {
    return render(
      <SelectField
        label="Select"
        name="select"
        options={["1", "2", "3"]}
        extraProps={{ value: "" }}
      />
    );
  };

  it("should render Select Field", () => {
    renderComponent();
    expect(screen.getByTestId("select-field")).toBeInTheDocument();
  });
  it("should render Select Field options on click", () => {
    renderComponent();
    const selectField = screen.getByRole("button");
    fireEvent.mouseDown(selectField);

    expect(screen.getByTestId("select-field-option-0")).toBeInTheDocument();
  });
});
