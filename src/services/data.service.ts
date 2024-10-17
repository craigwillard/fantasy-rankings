export const DataService = {
  async getPosition(league: string = "nfl", position: string = "qb") {
    return await fetch(`http://localhost:3000/${league}/${position}/`);
  },
};
