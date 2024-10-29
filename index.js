// Asyc/Await Solution Code

// Base URL for CatFacts API
const baseUrl = "https://catfact.ninja";

console.log("Base URL set up for CatFacts API:", baseUrl);

// Fetch a single random cat fact
const getRandomFact = async () => {
  try {
    const response = await fetch(`${baseUrl}/fact`);
    const data = await response.json();
    console.log("Random Cat Fact:");
    console.log(data.fact);
  } catch (error) {
    console.error("Error fetching random cat fact:", error);
  }
};

// Call the function to test it
getRandomFact();

// Fetch multiple random cat facts
const getMultipleFacts = async () => {
  const numberOfFacts = 3; // Specify the number of facts to fetch (e.g., 3)
  try {
    const response = await fetch(`${baseUrl}/facts?limit=${numberOfFacts}`);
    const data = await response.json();
    console.log(`\n${numberOfFacts} Random Cat Facts:`);
    data.data.forEach((fact, index) => {
      console.log(`${index + 1}. ${fact.fact}`);
    });
  } catch (error) {
    console.error("Error fetching multiple cat facts:", error);
  }
};

getMultipleFacts();

// Fetch cat breeds
const getCatBreeds = async () => {
  try {
    const response = await fetch(`${baseUrl}/breeds`);
    const data = await response.json();
    console.log("\nList of Cat Breeds:");
    data.data.forEach((breed, index) => {
      console.log(`${index + 1}. ${breed.breed}`);
    });
  } catch (error) {
    console.error("Error fetching cat breeds:", error);
  }
};

getCatBreeds();
