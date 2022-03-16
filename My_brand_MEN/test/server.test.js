import Blogdb from "../server/model/model";
import chai from "chai";
import chaiHttp from "chai-http";
import app  from "../server";

const expect = chai.expect;
 chai.should();

chai.use(chaiHttp);

before((done)=>{
    Blogdb.deleteMany({}, function(err){});
    done();
})

after((done)=>{
    Blogdb.deleteMany({}, function(err){});
    done();
})

describe('/first test Collection', ()=>{
        it("test default API welcome route. . . . ", (done) =>{
            chai.request(app)
            .get("/api/welcome")
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("object");
                res.body.message.should.be.equal('Welcome to the MEN-REST-API');
                const message = res.body.message;

                // expect(message).to.be.equal("Welcome to the MEN-REST-API");
                // console.log(res.body.message);
                done();
            })
        })
        it ("should verify that we have 0 blogs in the DB", (done)=>{
            chai.request(app)
            .get("/api/blogs")
            .end((err, res) => {
                let blogData = res.body;
                //using should
                // res.should.have.status(200);
                // res.body.should.be.a('array');
                // res.body.should.have.lengthOf(0);

                //using expect
                expect(res).to.have.status(200);
                expect(blogData).to.be.a('array');
                expect(blogData).to.have.lengthOf(0);
                // expect(blogData).to.be.an('array').that.is.empty;
                // expect(blogData).to.be.empty;
                done()
            })
    })

    it ("should POST a valid product in the database", (done)=>{
        chai.request(app)
        .get("/api/blogs")
        .end((err, res) => {
            let blogData = res.body;
            //using should
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.should.have.lengthOf(0);
            done()
        })
})
    
})