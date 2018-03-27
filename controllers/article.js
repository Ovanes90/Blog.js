const Article = require('../models').Article;
const User = require('../models').User;

module.exports = {
    createGet: (req, res) => {
        res.render('article/create');
    },

    createPost: (req, res) => {
        let articleArgs = req.body;
        let errorMag = '';

        const title = req.body.title;
        const content = req.body.content;
        if(!req.isAuthenticated()){
            errorMag = 'You should be logged in to make articles!'
        } else if(!articleArgs.title){
            errorMag = 'Invalid title!';
        } else if(!articleArgs.content){
            errorMag = 'Invalid content!';
        }

        if(errorMag){
            res.render('article/create', {error: errorMag});
            return;
        }

        articleArgs.authorId = req.user.id;

        Article.create(articleArgs).then(article => {
            res.redirect('/');
        }).catch(err => {
            console.log((err.message));
            res.render('article/create', {error: err.message});
        });

    },

    details: (req, res) => {
        let id = req.params.id;
        Article.findById(id, {include:[
                {
                    model: User,
                }
            ]
        }).then(article => {
            res.render('article/details', article.dataValues)
        });

    }
};




