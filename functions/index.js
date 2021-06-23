import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import * as express from 'express'
import * as bodyParser from 'body-parser'

admin.initializeApp(functions.config().firebase);

const app = express()
const main = express()

main.use('/MyApi', app)
main.use(bodyParser.json())
main.use(bodyParser.urlencoded({extended:false}))

const dataBase = admin.firestore()

export const webApi = functions.https.onRequest(main)

IHistory({
    amount: number,
    date: any,
    description: string,
    type: string
})

app.get('/users' , async(request,response) =>{
    try{
        const userQuerySnapshot = await dataBase.collection("users").get();
        const user = [];
        userQuerySnapshot.forEach(
            (item) => {
            user.push({
                id: item.id,
                data: item.data()
            });
        }
        );
        response.status(200).json(user)
    } catch(e){
        response.status(500).send(e);
    }
});

var usersId = 
app.get('users/:usersId', async(request, response) => {
    const usersId = request.params.usersId;
    dataBase.collection("users").doc(usersId).get()
    .then(usersId => {
        if(!usersId.exists) throw new Error('User not found');
        response.status(200).json({id: usersId.id, data: usersId.data()})
    })
    .catch(e => response.status(500).send(e))
})


app.get(('/users' + usersId + '/records'), async(request, response) => {
   try{
       const recordsQuerySnapshot = await dataBase.collection("records").get();
       const records = [];
       recordsQuerySnapshot.forEach(
           (item) => {
            records.push({
                    id: item.id,
                    data: item.data()
                });
           }
       );
       response.status(200).json(records);   
   }catch(e){
       response.status(500).send(e)
   }
});