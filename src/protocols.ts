export type ApplicationError = {
    name: string;
    message: string;
};

export type ParticipantInput = {
    name: string;
    balance: number;
};

export type CreateGameInput = {
    homeTeamName: string;
    awayTeamName: string;
};

export type FinishGameInput = {
    homeTeamScore: number;
    awayTeamScore: number;
};

export type CreateBetInput = {
    homeTeamScore: number;
	awayTeamScore: number;
	amountBet: number;
	gameId: number;
	participantId: number;
}