import * as fs from "fs";
import {GameModel} from "../models/game.model";

const db = 'db/'

export const gameService = {
    async createGame(id: number) {
        const data: GameModel = {
            firstUserId: id
        }
        await fs.writeFile(`${db}game${id}.json`, JSON.stringify(data), (err) => {
            if (err) {
                return console.error(err)
            }
            console.log(`game${id} created`)
        })
    }
}