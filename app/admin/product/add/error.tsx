'use client'

import Error from "next/error"
import { useEffect } from "react"

export default function ErrorPage({error, reset}: {error: Error, reset: () => void}) {
    useEffect(() => {
        console.log('error', error)
    }, [])
    return (
        <div>
            <h1>Damm error in Form</h1>
            <button onClick={() => reset()}>Reload</button>
        </div>
    )
}