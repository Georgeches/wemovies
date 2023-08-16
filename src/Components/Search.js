import React from "react"
import { useParams } from "react-router-dom"

export default function Search(){

    const {search} = useParams()

    return(
        <h1>{search}</h1>
    )
}