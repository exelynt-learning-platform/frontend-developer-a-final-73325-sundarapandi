import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import EmployeeTable from "../components/employee/EmployeeTable";

describe("EmployeeTable", () => {
  it("renders employee information", () => {
    render(
      <ThemeProvider theme={createTheme()}>
        <EmployeeTable
          employees={[{
            id: "1",
            name: "John Smith",
            email: "john@example.com",
            mobile: "9876543210",
            country: "India"
          }]}
          onEdit={vi.fn()}
          onDelete={vi.fn()}
        />
      </ThemeProvider>
    );
    expect(screen.getByText("John Smith")).toBeInTheDocument();
    expect(screen.getByText("john@example.com")).toBeInTheDocument();
    expect(screen.getByText("India")).toBeInTheDocument();
  });
});
