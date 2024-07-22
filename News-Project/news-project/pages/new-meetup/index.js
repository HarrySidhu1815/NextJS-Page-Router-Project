import NewMeetupForm from "@/components/meetups/NewMeetupForm";
import Head from "next/head";
import { useRouter } from "next/router"

export default function NewMeetUp() {

    const router = useRouter()

    async function addMeetUpHandler(enteredMeetUpData){
        const response = await fetch('api/new-meetups', {
            method: 'POST',
            body: JSON.stringify(enteredMeetUpData),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (response.ok){
            router.push('/')
        }
    }
  return (
    <>
    <Head>
        <title>New Meetup</title>
        <meta name='description' content='Add your own meetups and create amazing networking opportunities.'/>
    </Head>
    <NewMeetupForm onAddMeetup={addMeetUpHandler}/>
    </>
  )
}

