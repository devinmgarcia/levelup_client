import { createEvent } from "@testing-library/react"
import React, { useContext, useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { GameContext } from "../game/GameProvider.js"
import { EventContext } from "./EventProvider.js"


export const EventForm = () => {
    const history = useHistory()
    const { games, getGames } = useContext(GameContext)
    const {createEvent} = useContext(EventContext)
    const [currentEvent, setEvent] = useState({
        organizer: "",
        description: "",
        gameId: 0,
        date: "",
        time: ""
    })

    useEffect(() => {
        getGames()
    }, [])

    const changeEventState = (event) => {
        const newEventState = { ...currentEvent }
        if (event.target.name === "gameId") {
            newEventState.gameId = event.target.value
        }
        else if (event.target.name === "description") {
            newEventState.description = event.target.value
        }
        else if (event.target.name === "date") {
            newEventState.date = event.target.value
        }
        else if (event.target.name === "time") {
            newEventState.time = event.target.value
        }
        setEvent(newEventState)
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Schedule New Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="gameId">Game: </label>
                    <select name="gameId" className="form-control"
                        value={ currentEvent.gameId }
                        onChange={ changeEventState }>
                        <option value="0">Select a game...</option>
                        {
                            games.map(game => (
                                <option value={game.id}>{game.title}</option>
                            ))
                        }
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <textarea type="text" name="description" required autoFocus className="form-control"
                        value={currentEvent.description}
                        onChange={changeEventState}
                    ></textarea>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Date: </label>
                    <input type="date" name="date" required autoFocus className="form-control"
                        value={currentEvent.date}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="time">Time: </label>
                    <input type="time" name="time" required autoFocus className="form-control"
                        value={currentEvent.time}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>

            {/* Create the rest of the input fields */}

            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()

                    // Create the event
                    createEvent(currentEvent)
                    .then(() => history.push("/events"))

                    // Once event is created, redirect user to event list
                }}
                className="btn btn-primary">Create Event</button>
        </form>
    )
}
