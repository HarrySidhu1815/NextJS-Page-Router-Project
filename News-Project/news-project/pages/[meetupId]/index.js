import MeetupDetail from "@/components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";
import React from "react";

export default function MeetupDetailPage(props) {
  return (
    <>
    <Head>
        <title>{props.meetup.title}</title>
        <meta name='description' content={props.meetup.description}/>
    </Head>
    <MeetupDetail
      image={props.meetup.image}
      title={props.meetup.title}
      address={props.meetup.address}
      description={props.meetup.description}
    />
    </>
  );
}

export async function getStaticPaths(){

    const client = await MongoClient.connect('mongodb+srv://harjobanpreet15:meetups123@cluster0.3glzf7n.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0')
    
    const db = client.db()

    const meetupCollection = db.collection('meetups')

    const result = await meetupCollection.find({}, {_id: 1}).toArray()

    client.close()
    return {
        fallback: 'blocking',
        paths: result.map(meetup => ({params : {meetupId: meetup._id.toString()}})) 
    }
}

export async function getStaticProps(context){

    const meetupId = context.params.meetupId

    const client = await MongoClient.connect('mongodb+srv://harjobanpreet15:meetups123@cluster0.3glzf7n.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0')
    
    const db = client.db()

    const meetupCollection = db.collection('meetups')

    const result = await meetupCollection.findOne({_id: new ObjectId(meetupId)})

    client.close()

    return {
        props: {
            meetup: {
                title: result.title,
                address: result.address,
                image: result.image,
                description: result.description,
                id: result._id.toString()
            }
        }
    }
}
