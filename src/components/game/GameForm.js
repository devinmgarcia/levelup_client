import React, { useContext, useState, useEffect } from "react"
import { GameContext } from "./GameProvider.js"
import { useHistory } from 'react-router-dom'


export const GameForm = (props) => {
    const history = useHistory()
    const { createGame, getGameTypes, gameTypes, getGame, editGame } = useContext(GameContext)

    const [currentGame, setCurrentGame] = useState({
        skillLevel: 1,
        numberOfPlayers: 0,
        title: "",
        maker: "",
        gameTypeId: 1
    })

    useEffect(() => {
        getGameTypes()
    }, [])

    useEffect(()=>{
        if ("gameId" in props.match.params) {
            getGame(props.match.params.gameId).then(game=> {
                setCurrentGame({
                    skillLevel: game.skill_level,
                    numberOfPlayers: game.number_of_players,
                    title: game.title,
                    gameTypeId: game.game_type.id,
                    maker: game.maker
                })
            })
        }
    },[props.match.params.gameId])

    const changeGameState = (event) => {
        const newGameState = { ...currentGame }
        if (event.target.name === "title") {
            newGameState.title = event.target.value
        }
        else if (event.target.name === "maker") {
            newGameState.maker = event.target.value
        }
        else if (event.target.name === "game_type") {
            newGameState.gameTypeId = parseInt(event.target.value)
        }
        else if (event.target.name === "num_players") {
            newGameState.numberOfPlayers = parseInt(event.target.value)
        }
        else if (event.target.name === "skill_level") {
            newGameState.skillLevel = parseInt(event.target.value)
        }
        setCurrentGame(newGameState)
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Register New Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={currentGame.title}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="maker">Maker: </label>
                    <input type="text" name="maker" required autoFocus className="form-control"
                        value={currentGame.maker}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="game_type">Game Type: </label>
                    <select type="text" name="game_type" required autoFocus className="form-control"
                        value={currentGame.gameTypeId}
                        onChange={changeGameState}
                    >
                        {
                            gameTypes.map(
                                type => <option key={type.id} value={type.id}>{type.label}</option>
                            )
                        }
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="num_players">Number Of Players: </label>
                    <input type="number" name="num_players" required autoFocus className="form-control"
                        value={currentGame.numberOfPlayers}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="num_players">Skill Level (1-10): </label>
                    <input type="number" name="skill_level" min="1" max="10" required autoFocus className="form-control"
                        value={currentGame.skillLevel}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
        {
            ("gameId" in props.match.params)
            ?  <button 
            onClick={evt => {
                // Prevent form from being submitted
                evt.preventDefault()
                console.log(currentGame)
                editGame({
                    id: props.match.params.gameId,
                    maker: currentGame.maker,
                    title: currentGame.title,
                    numberOfPlayers: parseInt(currentGame.numberOfPlayers),
                    skillLevel: parseInt(currentGame.skillLevel),
                    gameTypeId: parseInt(currentGame.gameTypeId)
                }).then(()=>props.history.push("/games"))
            }}
            className="btn btn-primary">Edit</button>
            : <button type="submit"
            onClick={evt => {
                // Prevent form from being submitted
                evt.preventDefault()
                const game = {
                    maker: currentGame.maker,
                    title: currentGame.title,
                    numberOfPlayers: parseInt(currentGame.numberOfPlayers),
                    skillLevel: parseInt(currentGame.skillLevel),
                    gameTypeId: parseInt(currentGame.gameTypeId)
                }
                createGame(game)
                    .then(() => history.push("/games"))
            }}
            className="btn btn-primary">Create</button>
        }         
        </form>
    )
}
