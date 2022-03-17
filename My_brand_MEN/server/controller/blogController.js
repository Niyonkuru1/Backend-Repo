import Blogdb from '../model/model';


//create and save new blog
export const create = (req,res)=>{

    //validate request
    if ( !req.body){
        res.status(400).send({
            message: "Content can not be empty"
        });
        return;
    }
    // console.log(req.body);
    //new blog
    const bloge = new Blogdb({
        title: req.body.title,
        body: req.body.body,
        author: req.body.author,
        date: req.body.date
    })
    //save blog to database
    bloge
    .save(bloge)
    .then ((data) =>{
        // console.log(data);
        res.status(201).send(data);
    })
    .catch((error)=>{
        // console(req.body);
        res.status(500).send({
            message: "Some error occured while creating a create operation"
        });
    });

}

//retrieve and return all blogs / retrieve and return a single user
export const find = (req,res)=>{
    if (req.query.id){
        const id = req.query.id;
        // console.log('hello hello ' + id);
        Blogdb.findById(id)
        .then((data)=>{
            if (!data){
                // res.status(404).send({message: "Not found user with id" + id})
                res.status(404).json({message: "Not found user with id" + id})
            }
            else {
                // res.send(data)
                res.json(data)
            }
        })
        .catch((error)=>{
            // res.status(500).send({message: "Error retrieving the user with id: " + id})
            res.status(500).json({message: "Error retrieving the user with id: " + id})
        })
    }

    else {
        Blogdb.find()
        .then((blogs)=>{
            res.status(202).send(blogs);
        })
        .catch((error)=>{
            // res.status(500).send({message:error.message || 'Error Occured while retrieving blog information'})
            res.status(500).json({message:error.message || 'Error Occured while retrieving blog information'})
        })
    }
}

//update a new identified blog with the blog id
export const update = (req,res)=>{
if (!req.body){
    return res
    .status(400)
    .send({message: "Data to be updated doesn't exist, sorry to that!!"})
}

const id = req.params.id;
Blogdb.findByIdAndUpdate(id, req.body, {userFindAndModify:false})
.then((data)=>{
    Blogdb.findById(id)
        .then((data)=>{
            console.log(data);
            if (!data){
                res.status(404).send({message: "Not found user with id" + id})
            }
            else {
                res.send(data)
            }
})
.catch((error)=>{
    res.status(500).send({message: 'Error Update blog information'})
})
})
}
// delete the blog with the blog is specified in the request
export const delet = (req,res)=>{
    const id = req.params.id;

    Blogdb.findByIdAndDelete(id)
    .then((data)=>{
        if(!data){
            res.status(400).send({mesage: `Can not delete with id ${id}. may be id is wrong`})
        }
        else {
            res.send({
                message: 'Blogs deleted Successfuly!!'
            })
        }
    })
    .catch((error) =>{
        res.status(500).send({
            message: `Could not delete the blog with id = ${id}`
        });
    });
}
