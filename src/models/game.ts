export class Game {
    public players: string[] = [];
    public stack: string[] = [];
    public playedCards: string[] = [];
    public currentPlayer: number = 0;

    constructor() {
        for (let i = 1; i < 14; i++) {
            this.stack.push('ace_' + i);
            this.stack.push('clubs_' + i);
            this.stack.push('diamonds_' + i);
            this.stack.push('hearts_' + i);
        }
        this.shuffle(this.stack);
    }

    /**
     * shuffles the array to randomize all 52 cards
     * 
     * @param Cards The Card Array that is shuffled
     */
    shuffle(Cards:Array<string>) {
        let currentIndex = Cards.length;
        while (currentIndex != 0) {
            let randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [Cards[currentIndex], Cards[randomIndex]] = [
                Cards[randomIndex], Cards[currentIndex]];
        }
    }
}