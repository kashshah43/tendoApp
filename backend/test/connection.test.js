var request = require('supertest')
    ,app = require('../server')

describe("connection", function() {
    it("test connection", function(done) {
        request(app).get('/patient/9083427136')
        .expect(200, done)
    })
})    