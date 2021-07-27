const index = require("../server");

const request = require("supertest");
const express = require("express");
const app = express();
let mongoose = require('mongoose');
let mongoDB = 'mongodb://127.0.0.1/sushi-test';

mongoose.set('useCreateIndex', true)
mongoose.set('useFindAndModify', false);
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const createForm = {
    name: "voiture",
    category: "processeurs",
    description: "il est bien il est beau, il sent bon le sable chaud.",
    pictures: ["jolie_image_de_proc"],
    events: ["blah"],
    stock: ["12"],
    price: 22
}
const createForm2 = {
    name: "balancoire",
    category: "jeu",
    description: "ila la lo li lu chaud.",
    pictures: ["image 2"],
    events: ["blah"],
    stock: ["12"],
    price: 22
}


app.use(express.urlencoded({extended: false}));
app.use("/", index);

test("get all route works", done => {
    request(app)
        .get("/product/")
        .expect("Content-Type", /json/)
        // .expect({ name })
        .expect(200, done);
});
test("get by views route works", done => {
    request(app)
        .get("/product/most_viewed")
        .expect("Content-Type", /json/)
        // .expect({ name })
        .expect(200, done);
});
test("get one by id route works", done => {
    request(app)
        .get("/product/one/60f825eb9aed8e417e4c7010")
        .expect("Content-Type", /json/)
        // .expect({ name })
        .expect(200, done);
});
test("get one by name route works", done => {
    request(app)
        .get("/product/search/a")
        .expect("Content-Type", /json/)
        // .expect({ name })
        .expect(200, done);
});

test("create route works", done => {
    request(app)
        .post("/product/create")
        .type("form")
        .send(createForm)
        .expect("Content-Type", /json/)
        .expect(201, done);

});

test("update route works", done => {
    request(app)
        .put("/product/update/60f825eb9aed8e417e4c7010")
        .type("form")
        .send(createForm2)
        .expect("Content-Type", /json/)
        .expect(201, done);

});


// .then(async (data) => {
//     data
//     ;
// })
