const authRepos = require("../../repos/auth-repo");
const { assert } = require('chai');
const TestDbHelper = require('../test-db-helper');
const faker = require('faker');

const dbHelper = new TestDbHelper();
const defaultTimeoutInterval = 60000;

beforeAll(async () => {
  await dbHelper.start();
});

afterAll(async () => {
  await dbHelper.stop();
});

describe("create user if not exist same username or email or both in db", () => {
  // afterEach(async () => {
  //   await dbHelper.cleanup();
  // });

  it("should return user entity if not exist in db", async () => {
    console.log('enter 1st test');
    const item = {
      username: faker.internet.userName,
      email: faker.internet.email,
    };
    console.log('username', item.username);
    console.log('email', item.email);

    try {
      const response = await authRepos.findExistUser(item).then;
      console.log(response);
      expect(response).toBeUndefined();
    } catch (ex) {
      assert.fail(ex);
    }
  }, defaultTimeoutInterval);
});
