const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors')();


const {mongoose} = require('./db/mongoose');
//Load in mongoose models
const { List, Task} = require('./db/models');

//const { List } = require('./db/models');
//const Task = require('./db/models').Task;




const { get } = require('mongoose');

//Load middleware
app.use(bodyParser.json());
//CORS HEADERS MIDDLEWARE
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

/* Route handlers*/

/*list routes*/




/**
 * Get /lists
 * Purpose to get all lists
 */

app.get('/lists', (req,res) => {
    //return array of all lists in database
    List.find({}).then((lists) => {
        res.send(lists);
    });
})
/**
 * Post /lists
 * Purpose: is to create a list
 * 
 */

/**
 * Path;/lists/:id
 * Purpose: update a specified list
 * 
 */



app.patch('/lists/:id', (req, res)=>{ 
    //we want to update the specified list with the new values specified in the sjson body of the request
    List.findOneAndUpdate({_id: req.params.id}, {
        $set: req.body
    }).then(() => {
        res.send({message: 'Updated'})
    });
});

app.delete('/lists/:id', (req, res)=>{
    //we want to delete a specified list
    List.findOneAndDelete({
        _id: req.params.id
    }).then((removedListDoc) => {
        res.send(removedListDoc);
    })
});
/**GET /lists/:listId/tasks
 * Purpose: Get all tasks in a specific list
 */

app.get('/lists/:listId/tasks', (req, res) => {
    //we want to return all tasks taat belong to a specific list specififed by list id
    Task.find({
        _listId: req.params.listId
    }).then((tasks) => {
        res.send(tasks);
    })
});


app.post('/lists/:listId/tasks', (req, res) => {
    //we want to create a new task in a list specified by list id
    let newTask = new Task({
        title: req.body.title,
        _listId: req.params.listId
    });
    newTask.save().then((newTaskDoc) => {
        res.send(newTaskDoc);
    })
})

app.post('/lists', (req, res) =>{
    //we want to create a new list adn return new list document incluides id
    // the list information will be passed via the JSON request body
    let title = req.body.title;

    let newList = new List({
        title
    });
    newList.save().then((listDoc) => {
        // the full list document is returned 
        res.send(listDoc);
    })


});

app.patch('/lists/:listId/tasks/:taskId', (req, res) => {
    //we want to upadte a existing task
    Task.findOneAndUpdate({
        _id: req.params.taskId,
        _listId: req.params.listId
    }, {
       $set: req.body
    }
    ).then(() => {
        res.send({message: 'Updated successfully'})
    })
});

app.delete('/lists/:listId/tasks/:taskId', (req, res) => {
    Task.findOneAndDelete({
        _id: req.params.taskId,
        _listId: req.params.listId
    }).then((removedTaskDoc) => {
        res.send(removedTaskDoc);
    })
});

app.get('/lists/:listId/tasks/:taskId', (req, res) => {
    Task.findOne({
        _id: req.params.taskId,
        _listId: req.params.listId
    }).then((task) => {
        res.send(task);
    })
});



app.listen(3000, () => {
    console.log("Server is listening on port 3000");

});
