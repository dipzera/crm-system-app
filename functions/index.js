import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as bodyParser from "body-parser";

admin.initializeApp(functions.config().firebase);

const app = express()
const main = express()

main.use('/MyApi', app)
main.use(bodyParser.json())
main.use(bodyParser.urlencoded({extended:false}))

const dataBase = admin.firestore()
const userCollection = 'users';
const categorieCollection = 'categories';
const infoCollection = 'info';

export const webApi = functions.https.onRequest(main)

IInfo({
    bill: number,
    name: string
});

IUser({
    categories: [],
    info: []
});

ICategories({
    amount: number,
    date: any,
    description: string,
    type: string
});

app.post('/info', async (req, res) => {
    try {
        const info = {
            name: req.body['name'],
            bill: req.body['bill']
        }

        const newDoc = await dataBase.collection(infoCollection).add(info);
        res.status(201).send(`Created a new info: ${newDoc.id}`);
    } catch (error) {
        res.status(400).send(`info should cointain bill and name!!!`)
    }
});

// Get 
app.get('/info/:infoId', (req,res) => {

    const infoId = req.params.infoId; 
    dataBase.collection(infoCollection).doc(infoId).get()
    .then(info => {
        if(!info.exists) throw new Error('info not found');
        res.status(200).json({id:info.id, data:info.data()})})
    .catch(error => res.status(500).send(error));
        
});

// Delete
app.delete('/info/:infoId', (req, res) => {
    dataBase.collection(infoCollection).doc(req.params.infoId).delete()
    .then(()=>res.status(204).send("Document successfully deleted!"))
    .catch(function (error) {
            res.status(500).send(error);
    });
})

// Update
app.put('/info/:infoId', async (req, res) => {
    await dataBase.collection(infoCollection).doc(req.params.infoId).set(req.body,{merge:true})
    .then(()=> res.json({id:req.params.infoId}))
    .catch((error)=> res.status(500).send(error))

});



app.post('/categories', async (req, res) => {
    try {
        const categorie = {
            amount: req.body['categories'],
            date: req.body['date'],
            description: req.body['description'],
            type: req.body['type']
        }

        const newDoc = await dataBase.collection(categorieCollection).add(categorie);
        res.status(201).send(`Created a new categories: ${newDoc.id}`);
    } catch (error) {
        res.status(400).send(`Categorie should cointain amount, date, description and type!!!`)
    }
});

// Get 
app.get('/categories/:categoriesId', (req,res) => {

    const categoriesId = req.params.categoriesId; 
    dataBase.collection(categorieCollection).doc(categoriesId).get()
    .then(categorie => {
        if(!categorie.exists) throw new Error('Categorie not found');
        res.status(200).json({id:categorie.id, data:categorie.data()})})
    .catch(error => res.status(500).send(error));
        
});

// Delete
app.delete('/categories/:categoriesId', (req, res) => {
    dataBase.collection(categorieCollection).doc(req.params.categoriesId).delete()
    .then(()=>res.status(204).send("Document successfully deleted!"))
    .catch(function (error) {
            res.status(500).send(error);
    });
})

// Update
app.put('/categories/:categoriesId', async (req, res) => {
    await dataBase.collection(categorieCollection).doc(req.params.categoriesId).set(req.body,{merge:true})
    .then(()=> res.json({id:req.params.categoriesId}))
    .catch((error)=> res.status(500).send(error))

});

//Post
app.post('/users', async (req, res) => {
    try {
        const user = {
            categories: req.body['categories'],
            info: req.body['info']
        }

        const newDoc = await dataBase.collection(userCollection).add(user);
        res.status(201).send(`Created a new user: ${newDoc.id}`);
    } catch (error) {
        res.status(400).send(`User should cointain categories and info!!!`)
    }
});
// Get
app.get('/users/:userId', (req,res) => {

    const userId = req.params.userId; 
    dataBase.collection(userCollection).doc(userId).get()
    .then(user => {
        if(!user.exists) throw new Error('User not found');
        res.status(200).json({id:user.id, data:user.data()})})
    .catch(error => res.status(500).send(error));
        
});
//Update
app.put('/users/:userId', async (req, res) => {
    await dataBase.collection(userCollection).doc(req.params.userId).set(req.body,{merge:true})
    .then(()=> res.json({id:req.params.userId}))
    .catch((error)=> res.status(500).send(error))

});
// Get all users
app.get('/users', async (req, res) => {
    try {
        const userQuerySnapshot = await dataBase.collection(userCollection).get();
        const users = [];
        userQuerySnapshot.forEach(
            (doc)=>{
                users.push({
                    id: doc.id,
                    data:doc.data()
            });
            }
        );
        res.status(200).json(users);
    } catch (error) {
        res.status(500).send(error);
    }
});