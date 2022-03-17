import Blogdb from "../server/model/model";
import chai from "chai";
import chaiHttp from "chai-http";
import app from "../server";
const expect = chai.expect;
chai.should();
chai.use(chaiHttp);

before((done)=>{
    Blogdb.deleteMany({}, function(err){});
    done();
})

after((done)=>{
    // Blogdb.deleteMany({}, function(err){});
    done();
})

describe('/api/blogs TEST on the bloges_DB Collection', () => {
    //     it ("should verify that we have 0 blogs in the DB", (done)=>{
    //         chai.request(app)
    //         .get("/api/blogs")
    //         .end((err, res) => {
    //             //using expect
    //             // expect(res).to.have.status(201);
    //             // expect(blogData).to.be.a('array');
    //             // expect(blogData).to.have.lengthOf(0);
    //             // expect(blogData).to.be.an('array').that.is.empty;
    //             // expect(blogData).to.be.empty;
    //             done()
    //         })
    // })

    it("should POST a valid product in the database", (done) => {
        let blog = {
            title: "last 1234 test of posting the data in database",
            body: "USING MOCHA AND CHAI to test the end points",
            author: "Hello hellofrom sylvain during testing",
            date:"12/23/4545"
        }
        chai.request(app)
            .post("/api/blogs")
            .send(blog)
            .end((err, res) => {
                let blogData = res.body;
                res.should.have.status(201);
                res.body.should.be.a('object');
                expect(blogData).to.have.any.keys('title', 'author', 'body', "__v", "_id","date");
                expect(blogData.author, blogData.date, blogData.title, blogData.body).to.be.a('string');
                done()
            })
    })

    it("Should retrieve all the blogs from database", (done) => {
        let len;
        chai.request(app)
            .get("/api/blogs")
            .end((err, res) => {
                let blogs = res.body;
                len = blogs.length;
                res.should.have.status(202);
                expect(blogs).to.be.an("array");
                expect(blogs[0]).to.be.an('object');
                expect(blogs[0]).to.have.nested.any.keys('title', 'author', 'body', "__v", "_id","date");
                expect(len).to.not.be.an('undefined');
                console.log(len);
                done();
            })
    })
})