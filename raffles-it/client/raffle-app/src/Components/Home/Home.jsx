import React, { useState } from 'react';
import NewRaffle from './NewRaffle';
import Raffles from './Raffles';

export default function Home () {
    const [name, setName] = useState('');
    const [secretToken, setSecretToken] = useState('')
    const [raffles, setRaffles] = useState([])
    return(
        <div>
            <NewRaffle 
                name={name}
                setName={setName}
                secretToken={secretToken}
                setSecretToken={setSecretToken}
            />
            <Raffles
                name={name}
                setName={setName}
                secretToken={secretToken}
                setSecretToken={setSecretToken}
                raffles ={raffles}
                setRaffles={setRaffles}
            />
        </div>
    )
}