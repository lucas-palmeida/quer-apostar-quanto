export type ApplicationError = {
    name: string;
    message: string;
};

export type InputParticipantBody = {
    name: string;
    balance: number;
};

export type InputCreateGameBody = {
    homeTeamName: string;
    awayTeamName: string;
};

export type InputFinishGameBody = {
    homeTeamScore: number;
    awayTeamScore: number;
};

export type InputCreateBetBody = {
    homeTeamScore: number;
	awayTeamScore: number;
	amountBet: number;
	gameId: number;
	participantId: number;
}