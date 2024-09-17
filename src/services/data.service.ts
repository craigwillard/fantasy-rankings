export const DataService = {
  async getQBs(position: string) {
    return await fetch(`http://localhost:3000/${position}/`);
  },
};
