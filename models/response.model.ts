import {GameModel} from "./game.model";

export interface ResponseModel {
    gameModel: GameModel,
    message: string | null
}