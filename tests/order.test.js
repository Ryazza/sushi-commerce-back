const index = require("../server");

const request = require("supertest");
const express = require("express");
const app = express();

let TOKEN;
let email = "exemplee@eel.com";
let password = "password";

beforeAll((done) => {
    request(app)
        .post('/user/login')
        .send({
            email: email,
            password: password,
        })
        .end((err, response) => {
            TOKEN = response.body.token; // save the token!
            done();
        });
});

const createForm = {
    articles: [{
        id: "60fa7c4383f57e1a08bb4b17",
        quantity: 3
    }, {
        id: "60fa7c4383f57e1a08bb4b17",
        quantity: 4
    }],
    card_ID: "60f9287e165b5102c1e8bc59",
    sendTo: "60f9287e165b5102c1e8bc50",
    status: "préparation"
}

const createForm2 = {
    articles: [{
        id: "60fa7c4383f57e1a08bb4b17",
        quantity: 2
    }, {
        id: "60fa7c4383f57e1a08bb4b17",
        quantity: 1
    }],
    card_ID: "60f9287e165b5102c1e8bc59",
    sendTo: "60f9287e165b5102c1e8bc50",
    status: "envoyé"
}

const createFormCalculate = {
    articles: [{
        id: "60fa7c4383f57e1a08bb4b17",
        quantity: 2
    }, {
        id: "60fa7c4383f57e1a08bb4b17",
        quantity: 1
    }],
    status: "préparation"
}


app.use(express.urlencoded({extended: false}));
app.use("/", index);

test("get all order route works", done => {
    request(app)
        .get("/order/")
        .set({Authorization: `Bearer ${TOKEN}`})
        .expect("Content-Type", /json/)
        .expect(200, done);
});

test("get one order by id route works", done => {
    request(app)
        .get("/order/60f84c877f3b69086ccb5738")
        .set({Authorization: `Bearer ${TOKEN}`})
        .expect("Content-Type", /json/)
        .expect(200, done);
});

test("get all order by userID route works", done => {
    request(app)
        .get("/order/byUser/60f9287e165b5102c1e8bc50")
        .set({Authorization: `Bearer ${TOKEN}`})
        .expect("Content-Type", /json/)
        .expect(200, done);
});

test("get order for admin with status envoyé an choose order asc", done => {
    request(app)
        .get("/order/status/envoyé/asc")
        .set({Authorization: `Bearer ${TOKEN}`})
        .expect("Content-Type", /json/)
        .expect(200, done);
});

test("get order for admin with status preparation an choose order desc", done => {
    request(app)
        .get("/order/status/préparation/desc")
        .set({Authorization: `Bearer ${TOKEN}`})
        .expect("Content-Type", /json/)
        .expect(200, done);
});

test("create route works", done => {
    request(app)
        .post("/order")
        .send(createForm)
        .set({Authorization: `Bearer ${TOKEN}`})
        .expect("Content-Type", /json/)
        .expect(201, done);
});

test("calculate route works", done => {
    request(app)
        .post("/order/calculate")
        .set({Authorization: `Bearer ${TOKEN}`})
        .send(createFormCalculate)
        .expect("Content-Type", /json/)
        .expect(201, done);
});

test("update route works", done => {
    request(app)
        .put("/order/60fe906e5c944d14286800ca")
        .set({Authorization: `Bearer ${TOKEN}`})
        .send(createForm2)
        .expect("Content-Type", /json/)
        .expect(200, done);
});

test("delete route works", done => {
    request(app)
        .delete("/order/60fbc6eaa3cd3b1868b59bc4")
        .set({Authorization: `Bearer ${TOKEN}`})
        .expect("Content-Type", /json/)
        .expect(200, done);
});


