export interface Game {
    id: string;
    userId : string;
    timeStamp: Date;
    maxTime: number;
    numTries: number;
    successPercent: number;
}

