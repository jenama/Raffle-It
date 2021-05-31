import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useParams } from 'react-router-dom';
import Navbar from '../Navbar'
import axios from "axios";

export default function RaffleProfile ({ raffles, props 
}) {
    
    const [raffle, setRaffle] = useState('')
    
    const { id } = useParams()
    useEffect(() => {
        async function getRaffleInfo() {
            try {
                const baseUrl = `http://localhost:4100`
                const endpoint = `/raffles/${id}`

                const { data } = await axios.get(`${baseUrl} + ${endpoint}`)
                setRaffle(data.payload)
            } catch (error) {
               console.log('error', error) 
            }
        }
        getRaffleInfo()
    }, [])

    return(
        <div className='raffle-profile'>
           <Navbar id={id}/>
        </div>
    )
}