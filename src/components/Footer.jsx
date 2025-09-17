
import React, { useContext } from 'react'
import { counterContext } from '../contexts/CounterContext'

export default function Footer() {

    const { counter } = useContext(counterContext);

    return (
        <div className='p-20 text-center bg-gray-50 mt-10'>
            <h1></h1>
        </div>
    )
}
