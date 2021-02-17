const authRepos = require("../repos/auth-repo");
const sinon = require("sinon");
const usersData = require("./mock-data/users.json");
const { assert } = require('chai');

describe("GET existing user according to filter", () => {
  afterEach(() => {
    authRepos.findExistUser.restore();
  });
  it("should return user entity if not exist in db", async () => {
    sinon.stub(authRepos, "findExistUser").returns(usersData);
    const item = {
      name: "ashi",
      username: "ashi",
      email: "ashi@email.com",
      pass: "sixunderground2019",
    };
    try {
      const response = await authRepos.findExistUser(item).then;
      assert.notDeepEqual(response, item);
    } catch (ex) {
      assert.fail(ex);
    }
  });
});
