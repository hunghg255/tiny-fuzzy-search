import {
  calculateScore,
  getMatchingIndices,
  levenshteinFullMatrixSearch,
} from "./levenshteinFullMatrixSearch";

export interface Options {
  includeMatches?: boolean;
}

type SingleResult = {
  text: string;
  distance: number;
  matches?: number[][];
};

export type Result = Array<SingleResult>;

  // Search for the query in the list
const FuzzySearch = (list: Array<string>, query: string, options?: Options) => {
  const result: (SingleResult & { score: number })[] = [];

  for (let i = 0; i < list.length; i++) {
    const matrix = levenshteinFullMatrixSearch(
      query.toLowerCase(),
      list[i].toLowerCase()
    );
    const matches = getMatchingIndices(
      matrix,
      query.toLowerCase(),
      list[i].toLowerCase()
    );
    const target = list[i];
    const distance = matrix[query.length][target.length];
    const score = calculateScore(query, target, matches, distance);

    result[i] = {
      text: target,
      distance,
      matches,
      score,
    };
  }

  // Sort by score in descending order
  result.sort((x, y) => {
    return y.score - x.score;
  });

  const approxMatches: Result = [];

  result.forEach((res, index) => {
    const obj: SingleResult = { text: res.text, distance: res.distance };
    if (res.score > 0) {
      if (options?.includeMatches) {
        obj.matches = res.matches;
      }
      approxMatches[index] = obj;
    }
  });

  return approxMatches;
};

export {
  FuzzySearch
}
