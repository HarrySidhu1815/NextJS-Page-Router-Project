import MeetupList from "@/components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import Head from "next/head";

export default function HomePage(props) {
  return (
    <>
    <Head>
        <title>All MeetUps</title>
        <meta name="description" content='Browse a huge list active React Meetups'/>
    </Head>
    <MeetupList meetups={props.meetups} />
    </>
  )
}

export async function getStaticProps(){
    // fetching data from database
    const client = await MongoClient.connect('mongodb+srv://harjobanpreet15:meetups123@cluster0.3glzf7n.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0')
    
    const db = client.db()

    const meetupCollection = db.collection('meetups')

    const result = await meetupCollection.find().toArray()

    client.close()

    return {
        props: {
            meetups: result.map(meetup => ({
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
                description: meetup.description,
                id: meetup._id.toString()
            }))
        },
        revalidate: 1
    }
}

