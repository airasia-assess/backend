const authRepos = require("../repos/auth-repo");

describe('GET existing user according to filter', () => {
  it('should return user entity if exist', done => {
    chai
      .request(authRepos)
      .get('/findExistUser')
      .end((err, res) => {
        res.should.have.status(200);
        expect(res.body).to.deep.equal(starwarsFilmListMock);
        done();
      });
  });
});