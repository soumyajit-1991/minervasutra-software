import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import EmployeePage from "../Employees";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useOutletContext: () => ({ darkMode: false }),
    useNavigate: () => vi.fn(),
  };
});

vi.mock("chart.js/auto", () => ({
  default: class {
    destroy() {}
  },
}));

describe("EmployeePage", () => {
  it("renders employee management header and list", async () => {
    render(<EmployeePage />);

    expect(screen.getByText(/Employee Management/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("Ravi Sharma")).toBeInTheDocument();
      expect(screen.getByText("Priya Patel")).toBeInTheDocument();
    });
  });
});

