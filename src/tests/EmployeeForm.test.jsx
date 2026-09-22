import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import EmployeeForm from "../components/employee/EmployeeForm";

const renderForm = (props = {}) =>
  render(
    <ThemeProvider theme={createTheme()}>
      <EmployeeForm
        countries={[{ id: "1", name: "India" }, { id: "2", name: "USA" }]}
        onSubmit={vi.fn()}
        onCancel={vi.fn()}
        {...props}
      />
    </ThemeProvider>
  );

describe("EmployeeForm", () => {
  it("renders all required fields", () => {
    renderForm();
    expect(screen.getByLabelText(/Name/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Mobile/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Country/)).toBeInTheDocument();
    expect(screen.getByLabelText(/State/)).toBeInTheDocument();
    expect(screen.getByLabelText(/District/)).toBeInTheDocument();
  });

  it("shows validation errors when submitted empty", async () => {
    const user = userEvent.setup();
    renderForm();
    await user.click(screen.getByRole("button", { name: /Save Employee/i }));
    expect(await screen.findByText("Name is required")).toBeInTheDocument();
    expect(screen.getByText("Email is required")).toBeInTheDocument();
  });

  it("pre-populates edit data", () => {
    renderForm({
      initialValues: {
        name: "John Smith",
        email: "john@example.com",
        mobile: "9876543210",
        country: "India",
        state: "Tamil Nadu",
        district: "Coimbatore"
      }
    });
    expect(screen.getByDisplayValue("John Smith")).toBeInTheDocument();
    expect(screen.getByDisplayValue("john@example.com")).toBeInTheDocument();
    expect(screen.getByDisplayValue("9876543210")).toBeInTheDocument();
  });
});
