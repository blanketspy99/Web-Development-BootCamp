const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");
let workItems = [];
const date = require(__dirname + "/date.js");
const app = express();


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todolistDB");

const itemsSchema = {
    name: {
        type: String,
        required: [true]
    }
}

const Item = mongoose.model("Item", itemsSchema);


const item1 = new Item({
    name: "Welcome to your todo list!"
})

const item2 = new Item({
    name: "Hit the + button to add a new line"
})

const item3 = new Item({
    name: "<--- Hit this to delete an item>"
})

const defaultItems = [item1, item2, item3];

const ListSchema = {
    name: String,
    items: [itemsSchema]
};

const List = mongoose.model("List", ListSchema);

// Item.insertMany(defaultItems, err => {
//     if (err) {
//         console.log(err);
//     }
//     else {
//         console.log("Successfully inserted default items");
//     }
// })

app.get("/", function (req, res) {

    Item.find({}, function (err, foundItems) {
        if (foundItems.length === 0) {
            Item.insertMany(defaultItems, err => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Successfully inserted default items");
                }
            });
            res.redirect("/");
        }
        else {

        
        res.render("list", {
            listTitle: date.getDate(),
            newListItems: foundItems
        });
    }
    });


});

app.post("/", function (req, res) {
    const itemName = req.body.newItem;
    const listName = req.body.list;
    const item = new Item({
        name: itemName
    });
    if(listName === date.getDate()){
        item.save();
        res.redirect("/");
    }
    else {
        List.findOne({name: listName}, (err, foundList) => {
            foundList.items.push(item);
            foundList.save();
            res.redirect("/"+listName);
        });
    }
    // item.save();
    // console.log(item);
    // console.log(req);
    // res.redirect("/");

});

app.post("/delete", (req, res) => {
    const checkboxValue = req.body.checkbox;
    const listName = req.body.listName;

    if(listName === date.getDate()){

    if (checkboxValue) {
        Item.findByIdAndRemove(checkboxValue, err => {
            if (err) {console.log(err);}
        })
    }
    res.redirect("/");
}
else {
    List.findOneAndUpdate({name: listName},{$pull: {items: {_id: checkboxValue}}}, (err, foundList)=>{
        if (!err){
            res.redirect("/"+listName);
        }
    });
}
});

app.get("/:category", (req, res)=> {
    const category = _.capitalize(req.params.category);
    
    List.findOne({name: category}, (err, foundList) => {
        if(!err) {
            if(!foundList){
                const list = new List({
                    name: category,
                    items: defaultItems
                });
                list.save();
                res.redirect("/"+category);
            }
            else {
                res.render("list", {listTitle: foundList.name, newListItems: foundList.items});
            }
        }
    });


});

// app.get("/work", function (req, res) {
//     res.render("list", {
//         listTitle: "Work List",
//         newListItems: workItems
//     });
// });

// app.post("/work", function (req, res) {
//     let item = req.body.newItem;
//     workItems.push(item);
//     res.redirect("/work");
// });

app.get("/about", function (req, res) {
    res.render("about");
});

app.listen(3000);