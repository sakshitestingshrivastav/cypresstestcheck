const request = require("supertest");
const { app, server } = require("../app");

describe("GET /", () => {
  it("should return Hello from DevOps!", async () => {
    const response = await request(app).get("/");
    expect(response.text).toBe("Hello from DevOps!");
    expect(response.statusCode).toBe(200);
  });

  afterAll(() => {
    server.close(); // ✅ Close server after tests finish
  });
});

