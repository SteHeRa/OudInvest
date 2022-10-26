export const isOrAre = (number: string) => {
  const isOrAre = parseInt(number) === 1 ? "is" : "are";

  return isOrAre;
};

export const personOrPeople = (number: string) => {
  const personOrPeople = parseInt(number) === 1 ? "person" : "people";

  return personOrPeople;
};
