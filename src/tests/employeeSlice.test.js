import { describe, expect, it } from "vitest";
import reducer, {
  fetchEmployees,
  createEmployee,
  deleteEmployee
} from "../features/employees/employeeSlice";

describe("employee reducer", () => {
  it("handles fetchEmployees pending", () => {
    const state = reducer(undefined, { type: fetchEmployees.pending.type });
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it("handles fetchEmployees fulfilled", () => {
    const state = reducer(undefined, {
      type: fetchEmployees.fulfilled.type,
      payload: [{ id: "1", name: "John" }]
    });
    expect(state.loading).toBe(false);
    expect(state.items).toHaveLength(1);
  });

  it("handles createEmployee fulfilled", () => {
    const state = reducer(
      { items: [], mutationLoading: true, mutationError: null },
      { type: createEmployee.fulfilled.type, payload: { id: "2", name: "Jane" } }
    );
    expect(state.items[0].name).toBe("Jane");
    expect(state.mutationLoading).toBe(false);
  });

  it("handles deleteEmployee fulfilled", () => {
    const state = reducer(
      { items: [{ id: "1" }, { id: "2" }], mutationLoading: true, mutationError: null },
      { type: deleteEmployee.fulfilled.type, payload: "1" }
    );
    expect(state.items).toEqual([{ id: "2" }]);
  });
});
