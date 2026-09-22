import { describe, expect, it, vi, beforeEach } from "vitest";
import { employeeService } from "../services/employeeService";
import api from "../services/api";

describe("employeeService", () => {
  beforeEach(() => vi.restoreAllMocks());

  it("gets all employees", async () => {
    vi.spyOn(api, "get").mockResolvedValue({ data: [{ id: "1" }] });
    await expect(employeeService.getAll()).resolves.toEqual([{ id: "1" }]);
    expect(api.get).toHaveBeenCalledWith("/employee");
  });

  it("gets an employee by id", async () => {
    vi.spyOn(api, "get").mockResolvedValue({ data: { id: "5" } });
    await expect(employeeService.getById("5")).resolves.toEqual({ id: "5" });
    expect(api.get).toHaveBeenCalledWith("/employee/5");
  });

  it("creates an employee", async () => {
    vi.spyOn(api, "post").mockResolvedValue({ data: { id: "7" } });
    await expect(employeeService.create({ name: "Test" })).resolves.toEqual({ id: "7" });
    expect(api.post).toHaveBeenCalledWith("/employee", { name: "Test" });
  });
});
