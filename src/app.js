const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const { get } = require("http");

console.log(__dirname);

const app = express();

const publicDirectoryPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
    res.render("index", {
        title: "Weather App",
        name: "Huy",
    });
});

app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "No address provided",
        });
    }

    geocode(req.query.address, (error, { longitude, latitude, location } = {}) => {
        if (error) {
            return res.send({
                error: error,
            });
        }

        forecast(longitude, latitude, (error, {forecast} = {}) => {
            if (error) {
                return res.send({
                    error: error,
                });
            }

            res.send({
                location, 
                forecast, 
                address: req.query.address
            });
        });
    });
});

app.get("/products", (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You Must provide a search term",
        });
    } else {
    }

    console.log(req.query.search);

    res.send({
        products: [],
    });
});

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help",
        message: "This a help message",
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About Me",
        name: "Harry",
    });
});

app.get("/help/*", (req, res) => {
    res.render("error", {
        title: "404",
        errorMessage: "Help Page Not Found",
        name: "Huy",
    });
});

app.get("*", (req, res) => {
    res.render("error", {
        title: "404",
        errorMessage: "Page Not Found",
        name: "Huy",
    });
});

app.listen(3000, () => {
    console.log("Server is up on port 3000.");
});
