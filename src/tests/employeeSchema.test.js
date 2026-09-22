import { describe, expect, it } from "vitest";
import { employeeSchema } from "../validation/employeeSchema";

describe("employeeSchema", () => {
  it("accepts a valid employee", async () => {
    const employee = {
      name: "John Smith",
      email: "john@example.com",
      mobile: "9876543210",
      country: "India",
      state: "Tamil Nadu",
      district: "Coimbatore"
    };
    await expect(employeeSchema.validate(employee)).resolves.toEqual(employee);
  });

  it("rejects an invalid email", async () => {
    await expect(
      employeeSchema.validate({
        name: "John",
        email: "bad-email",
        mobile: "9876543210",
        country: "India",
        state: "Tamil Nadu",
        district: "Coimbatore"
      })
    ).rejects.toThrow("Please enter a valid email address");
  });

  it("requires mandatory fields", async () => {
    await expect(employeeSchema.validate({})).rejects.toThrow();
  });
});
