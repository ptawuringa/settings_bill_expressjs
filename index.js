const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser')
//const SettingsBill = require('./settings-bill');

const Settings = require('./settings-bill');
var moment = require('moment'); // require


const settingsBill = Settings();
const app = express();
app.engine('handlebars', exphbs({ defaultLayout: null }));
app.set('view engine', 'handlebars');

app.use(express.static("public"));

// parse application/x-www-form-urmlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/', function (req, res) {
    res.render('index', {

        settings: settingsBill.getSettings(),

        totals: settingsBill.totals()
    });
    // res.send("index")
});

app.post('/settings', function (req, res) {


    settingsBill.setSettings({
        callCost: req.body.callCost,
        smsCost: req.body.smsCost,
        warningLevel: req.body.warningLevel,
        criticalLevel: req.body.criticalLevel,
    });

    console.log(settingsBill.getSettings());

    res.redirect('/');
});

app.post('/action', function (req, res) {
    settingsBill.recordAction(req.body.actionType)
    //capture the call type to add 
    res.redirect('/');
});

app.get('/actions', function (req, res) {
    const listOfActions = settingsBill.actions()

    for (action of listOfActions) {
        action.prettyDate = moment(action.timestamp).fromNow();
    }
    res.render('actions', { actions: listOfActions });


});

app.get('/actions/:actionType', function (req, res) {
    const actionType = req.params.actionType;
    const listOfActions = settingsBill.actionsFor(actionType)

    for (action of listOfActions) {
        action.prettyDate = moment(action.timestamp).fromNow();
    }
    res.render('actions', { actions: listOfActions });

});

const PORT = process.env.PORT || 3011;

app.listen(PORT, function () {
    console.log("App started at port", PORT)
});