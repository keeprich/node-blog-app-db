const express = require('express');
const mongoose = require('mongoose');
const Article = require('./models/article')
const articleRouter = require('./routes/articles');
const methodOverride = require('method-override');
const app = express(); 

// connecting to database
mongoose.connect('mongodb://127.0.0.1:27017/blog',  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndexes: true });

// creating our view engin (ejs)
app.set('view engine', 'ejs')


// calling our routes
app.use(express.urlencoded({ extended:false }));
app.use(methodOverride('_method'))

// creating the route here
app.get('/', async (req, res) => {

    const articles = await  Article.find().sort({
// showing articles in descending order
createdAt: 'desc'
    })

// res.send("Hello all workes")
res.render('articles/index', { articles: articles })
})

app.use('/articles', articleRouter)


app.listen(5000)