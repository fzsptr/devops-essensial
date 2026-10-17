const request = require("supertest");
const app = require("../src/app");

describe("Express API", () => {
  test("GET / return status 200", async () => {
    const response = await request(app).get("/");

    expect(response.status).toBe(200);
    expect(response.body.message).toBe(
      "Express API is running"
    );
  });

  test("GET /api/hello returns a greeting", async () => {
    const response = await request(app).get("/api/hello");

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Hello, World!");
  });

  test("POST /api/sum adds two numbers", async () => {
    const response = await request(app)
      .post("/api/sum")
      .send({ a: 5, b: 3 });

    expect(response.status).toBe(200);
    expect(response.body.result).toBe(8);
  });

  test("POST /api/sum rejects non-numeric input", async () => {
    const response = await request(app)
      .post("/api/sum")
      .send({ a: "5", b: 3 });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe(
      "a and b must be numbers"
    );
  });
});
