import chai from "chai";
import chaiHttp from "chai-http";
import app  from "../server";

const expect = chai.expect;
const should = chai.should();

chai.use(chaiHttp);



describe('/first test Collection', ()=>{
        it("test default API welcome route. . . . ", (done) =>{
            chai.request(app)
            .get("/api/welcome")
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("array");
                const message = res.body.message;

                expect(message).to.be.equal("Welcome to the MEN-REST-API");
                console.log(res.body.message);
                done();
            })
        })
        it ("should test two values....", ()=>{
        //actual test goes here 
        let expectedVal = 10;
        let actualVal = 10;

        expect(actualVal).to.be.equal(expectedVal);
        
    })
})