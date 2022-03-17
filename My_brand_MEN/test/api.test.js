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
    Blogdb.deleteMany({}, function(err){});
    done();
})

describe('/api/blogs TEST on the bloges_DB Collection', () => {
it("should POST a valid blogs in the database", (done) => {
    let brogArr = [];
    let titleArr = ['one','two','three','four','five'];
    let blog;
    titleArr.forEach((post)=>{
     blog = {
            title: post+ " last 1234 test of posting the data in database",
            body: post+ " USING MOCHA AND CHAI to test the end points",
            author: post+ " Hello hellofrom sylvain during testing",
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
        })
    })
    done();
})

function giveMeId(){
    chai.request(app)
    .get('/api/blogs')
    .end((err,res)=>{
         return res.body[2]._id;
    })
}
console.log(giveMeId());   


it("Should retrieve all the blogs from database", (done) => {
    let items;
    chai.request(app)
        .get("/api/blogs")
        .end((err, res) => {
            //  let len = 5;
            let blogs = res.body;
            items = blogs.length;
            res.should.have.status(202);
            expect(blogs).to.be.an("array");
            expect(blogs[0]).to.be.an('object');
            expect(blogs[0]).to.have.nested.any.keys('title', 'author', 'body', "__v", "_id","date");
            expect(items).to.not.be.an('undefined');
            expect(blogs).to.have.lengthOf(5);
            console.log(`the length of the blog to be ${blogs.length}`);
            done();
        })
    
//     it("it should retrieve specific blog with the provided id", (done)=>{
//   chai.request(app)
//   .get(`/api/blogs?id=${thirdId}`)
// .end((err,res)=>{
//     expect(res.body).to.be.an('object');
//     // expect(res.body).to.have.lengthOf(len);
//     expect(res.body).to.have.any.keys('title', 'author', 'body', "__v", "_id","date");
//     // expect(res.body).to.have.property('title', "three last 1234 test of posting the data in database");
//     console.log(res.body);
// })
// done();
//     })
})
})