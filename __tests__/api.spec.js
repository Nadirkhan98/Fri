const app = require("../app.js");
const request = require("supertest");

describe("api server", () => {
  let api;
  beforeAll(() => {
    api = app.listen(5000, () => {
      console.log("Test server is ruuning on port 5000");
    });
  });

  test("it responds to get / with status 200", (done) => {
    request(api).get("/").expect(200, done);
  });

  it("it responds to an unknown food item with status 404", (done) => {
    request(api)
      .get("/food/25")
      .expect(404)
      .expect({ message: "Non-existing food item. Try again", done });
  });

  afterAll((done) => {
    console.log("Gracefully stopping test server");
    api.close(done);
  });
});
