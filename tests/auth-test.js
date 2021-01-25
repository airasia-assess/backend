const app = require('../server');

describe('GET existing user according to filter', () => {
  it('should return user entity if exist', done => {
    chai
      .request(app)
      .get('/films-list')
      .end((err, res) => {
        res.should.have.status(200);
        expect(res.body).to.deep.equal(starwarsFilmListMock);
        done();
      });
  });
});