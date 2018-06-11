import { Game } from './game';

export interface User {
    id: string;
    email: string;
    games: Game[];

}
