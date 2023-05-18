import { Sentiment } from "@germla/database/enums";

export const getSentiment = (_text: string): Sentiment => {
  return Sentiment.POSITIVE;
};
