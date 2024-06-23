const express = require('express');
const app = express();
const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/crudapp').then(() => { console.log('Connected to MongoDB') });

const userSchema = new mongoose.Schema({
    rollno: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    profilepic: {
        type: String,
        default: 'https://robohash.org/paiadithya26@gmail.com'
    }
}, {
    strict: true
});

const User = mongoose.model('userinfo', userSchema);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send(__dirname + '/public/index.html');
}
);

app.get('/all', (req, res) => {
    User.find().then((users) => {
        // send json response
        res.json(users);
    });
}
);

app.post('/create', (req, res) => {
    let profilepic = req.body.profilepic;
    if (req.body.profilepic == '') {
        profilepic = 'https://robohash.org/' + req.body.email;
    }
    const user = new User({
        name: req.body.name,
        age: req.body.age,
        rollno: req.body.rollno,
        email: req.body.email,
        profilepic: profilepic
    });

    user.save().then(() => {
        res.redirect(`/?message=Success Inserted&name=` + req.body.name + `&age=` + req.body.age + `&rollno=` + req.body.rollno + `&email=` + req.body.email + `&profilepic=` + profilepic + `&operation=CREATED`);
    }).catch((err) => {
        res.redirect(`/?error=Error Inserting ${req.body.name}; Duplicate ID`);
    });
}
);

app.post('/read', (req, res) => {
    User.find({ rollno: req.body.rollno }).then((users) => {
        // if user not found
        if (users.length == 0) {
            res.redirect(`/?error=No user found with rollno ${req.body.rollno}` + `&operation=read`);
        }
        else {
            res.redirect(`/?message=Success Found&name=` + users[0].name + `&age=` + users[0].age + `&rollno=` + users[0].rollno + `&email=` + users[0].email + `&profilepic=` + users[0].profilepic + `&operation=READ`);
        }
    });
}
);

app.post('/delete', (req, res) => {
    // Check if roll no exists 
    User.find({ rollno: req.body.rollno }).then((users) => {
        if (users.length == 0) {
            res.redirect(`/?error=No user found with rollno ${req.body.rollno}`);
        }
        else {
            User.deleteOne({ rollno: req.body.rollno }).then(() => {
                res.redirect(`/?message=Success Deleted&name=` + users[0].name + `&age=` + users[0].age + `&rollno=` + users[0].rollno + `&email=` + users[0].email + `&profilepic=` + users[0].profilepic + `&operation=Deleted`);
            });
        }
    });

});

app.post('/update', (req, res) => {
    User.find({ rollno: req.body.rollno }).then((users) => {
        if (users.length == 0) {
            res.redirect(`/?error=No user found with rollno ${req.body.rollno}`);
        }
        else {
            let profilepic = req.body.profilepic;
            if (req.body.profilepic == '') {
                profilepic = 'https://robohash.org/' + req.body.email;
            }

            User.updateOne({ rollno: req.body.rollno }, {
                name: req.body.name,
                age: req.body.age,
                rollno: req.body.rollno,
                email: req.body.email,
                profilepic: profilepic
            }).then(() => {
                res.redirect(`/?message=Success Updated&name=` + req.body.name + `&age=` + req.body.age + `&rollno=` + req.body.rollno + `&email=` + req.body.email + `&profilepic=` + req.body.profilepic + `&operation=Updated`);
            });
        }
    });
}
);

app.listen(3000, () => { console.log('Server is running on port 3000')});
