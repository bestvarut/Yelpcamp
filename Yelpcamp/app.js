const express = require("express");
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate')
const wrapAsync = require('./utils/wrapAsync');
const Campground = require('./models/campground');
const methodOverride = require('method-override');

const AppError = require('./utils/AppError');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected")
});

const app = express();

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }))




app.get('/', (req, res) => {
    res.render('home')
})

app.get('/campgrounds', wrapAsync(async (req, res, next) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds });
}))

app.get('/campgrounds/new', (req, res) => {

    res.render('campgrounds/new')
})

app.post('/campgrounds', wrapAsync(async (req, res, next) => {
    const campground = new Campground(req.body.campground);
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`)

}))

app.get('/campgrounds/:id', wrapAsync(async (req, res, next) => {
    const campground = await Campground.findById(req.params.id);

    res.render('campgrounds/show', { campground });
}))

app.get('/campgrounds/:id/edit', wrapAsync(async (req, res, next) => {
    const campground = await Campground.findById(req.params.id);

    res.render('campgrounds/edit', { campground });
}))

app.put('/campgrounds/:id', wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
    res.redirect(`/campgrounds/${campground._id}`)
}))

app.delete('/campgrounds/:id', wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect('/campgrounds')
}))

app.use((err, req, res, next) => {
    console.log(`----------${err.name}----------`);
    const { status = 500, message = 'Something wan wrong' } = err;
    res.status(status).send(message);
})

app.listen(3000, () => {
    console.log('Connect on port 3000')
})