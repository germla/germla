import { Sentiment } from "@germla/database"

export const getSentiment = (description: string) => {
    return Sentiment.POSITIVE;
}