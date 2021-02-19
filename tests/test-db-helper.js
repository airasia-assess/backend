const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const jasmine = require("jasmine");

// Extend the default timeout so MongoDB binaries can download when first run
jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

class TestDbHelper {
  constructor() {
    console.log('Enter test helper');
    this.db = null;
    this.server = new MongoMemoryServer();
    this.connection = null;
    console.log('constructor finished');
  }

  /**
   * Start the server and establish a connection
   */
  async start() {
    console.log('enter db start');
    const url = await this.server.getUri();
    this.connection = await mongoose.connect(url, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
    this.db = this.connection.db(await this.server.getDbName());
    console.log('db start finished');
  }

  /**
   * Close the connection and stop the server
   */
  stop() {
    console.log('enter db stop');
    this.connection.close();
    console.log('retrun db stop result');
    return this.server.stop();
  }

  /**
   * Delete all collections and indexes
   */
  async cleanup() {
    console.log('enter db cleanup');
    const collections = await this.db.listCollections().toArray();
    console.log('return db cleanup result');
    return Promise.all(
      collections
        .map(({ name }) => name)
        .map((collection) => this.db.collection(collection).drop())
    );
  }
}

module.exports = TestDbHelper;