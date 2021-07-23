const index = require("../server");

const request = require("supertest");
const express = require("express");
const app = express();

const createForm = {
    name: "intello",
    category: "processeurs",
    description: "il est bien il est beau, il sent bon le sable chaud.",
    pictures: ["jolie_image_de_proc"],
    events: ["blah"],
    stock:["12"] ,
    price: 22
}


app.use(express.urlencoded({ extended: false }));
app.use("/", index);

test("get all route works", done => {
    request(app)
        .get("/product/")
        .expect("Content-Type", /json/)
        // .expect({ name })
        .expect(200, done);
});

test("create route works", done => {
    request(app)
        .post("/create")
        .type("form")
        .send(createForm)
        .then((data) => {
           data.expect({ success: true }, done);
        });
});