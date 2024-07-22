import { MongoClient } from "mongodb"

export default async function NewmeetupsHandler(req, res) {

    if(req.method === 'POST'){
        const data = req.body

        const client = await MongoClient.connect('mongodb+srv://harjobanpreet15:meetups123@cluster0.3glzf7n.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0')
    
        const db = client.db()
        
        const meetupCollection = db.collection('meetups')
        
        const result = await meetupCollection.insertOne(data)
        
        client.close()
        
        res.status(201).json({message: 'MeetUp added successfully'})
    }
}
