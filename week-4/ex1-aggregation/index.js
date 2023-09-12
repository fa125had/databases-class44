/*
⭕  Find a way to get the data in the csv file into your MongoDB database.
✅  I have used mongoDB Compass to upload csv file to Atlas mongo
  
*/

import { connectDb } from "./db.js";

// ⭕ Write a function that will return the array of the total population (M + F over all age groups) for a given Country per year.
const getTotalPopulationByCountryAndYear = async (country, year) => {
  const query = { Country: country, Year: year };
  const results = await connectDb(query);

  let totalPopulation = 0;
  results.forEach((doc) => {
    totalPopulation += doc.M + doc.F;
  });

  return totalPopulation;
};

// ⭕ Write a function that will return all the information of each continent for a given Year and Age field but add a new field TotalPopulation that  will be the addition of M and F.
const getContinentInfoByYearAndAge = async (year, age) => {
  const query = { Year: year, Age: age };
  const results = await connectDb(query);

  const continentInfo = results.map((doc) => {
    return {
      ...doc,
      TotalPopulation: doc.M + doc.F,
    };
  });

  return continentInfo;
};

// ✅ Test query
const totalPopulation = await getTotalPopulationByCountryAndYear(
  "Netherlands",
  2000
);
console.log(`Total Population: ${totalPopulation}`);

// ✅ Test query
const continentInfo = await getContinentInfoByYearAndAge(2000, "35-39");
console.log("Continent Info:", continentInfo);
