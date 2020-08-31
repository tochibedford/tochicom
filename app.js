const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

//set up router
const router = express.Router();

var optionsMain = {
    index: 'home.html'
}

router.use(function(req, res, next) {

    // log each request to the console
    console.log(req.method, `request from ${req.socket.remoteAddress}`, req.url);

    // continue doing what we were doing and go to the route
    next();
});

app.use(router)
app.use(express.static('src', optionsMain))

router.get("/", (req, res) => {
    res.sendFile("home.html", { root: 'src' })
})

app.listen(port, () => console.log(`Listening at http://localhost:${port}`))