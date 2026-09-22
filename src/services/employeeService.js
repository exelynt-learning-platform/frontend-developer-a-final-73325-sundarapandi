import api from "./api";

export const employeeService = {
  async getAll() {
    const response = await api.get("/employee");
    return response.data;
  },

  async getById(id) {
    const response = await api.get(`/employee/${id}`);
    return response.data;
  },

  async create(employee) {
    const response = await api.post("/employee", employee);
    return response.data;
  },

  async update(id, employee) {
    const response = await api.put(`/employee/${id}`, employee);
    return response.data;
  },

  async remove(id) {
    const response = await api.delete(`/employee/${id}`);
    return response.data;
  }
};
