# Fetch with Async/Await: Working with APIs in JavaScript

![Screenshot showing solution code demonstrating the usage of fetch with async/await to retrieve data from an API, handle success/failure scenarios, and display the results.](./assets/images/example.png)

---

## Description 📄

JavaScript's **fetch API** combined with **async/await** syntax enables developers to handle **asynchronous operations** more readably and maintainably than with promises alone. By awaiting fetch requests, we ensure that our code is easy to follow while still being non-blocking, allowing JavaScript to continue other tasks while waiting for data retrieval.

In this lab, we’ll refactor our previous code that used promises to make it more streamlined by using **async/await**. You’ll learn how to:

- **Retrieve data** from a web API with HTTP requests.
- **Handle responses** efficiently by parsing JSON and managing success or failure scenarios.
- **Display fetched data** directly in the console.
- Use async/await to handle **chained API requests** more clearly and effectively.


The lab demonstrates how to use **fetch** to interact with the **CatFacts API**, covering tasks like requesting a single cat fact, retrieving multiple cat facts, and a list of cat breeds. Understanding how to fetch data and handle responses using async/await is essential for creating efficient, data-driven JavaScript applications.

To explore the API's available endpoints and features, visit the [CatFacts API website](https://catfact.ninja/). This site offers details on how to use various endpoints, including fetching a single random cat fact, retrieving multiple facts, and listing cat breeds.

## Expected Project Structure 🏗️
Your project should be structured as follows:

```plaintext
aisd-ajs-02-fetch-async/
├── index.js
└── README.md
```

##

## Instructions ✅

### 1. **Fork and Clone the Lab Repository**
   - [ ] Fork the repository for this lab to your GitHub account.

   - [ ] Clone the forked repository to your local machine to get started.

   - [ ] Open the cloned repository and locate the `index.js` file provided from the previous lab assignment. This file includes the starter code that you will refactor using async/await.
   
##

### 2. **Setting Up the Base URL for Fetch Requests**

In this lab, we’ll use the same **base URL** and **endpoints** as in the previous assignment to interact with the **CatFacts API**. Let’s set up the base URL to streamline our API requests, so you can easily reference different endpoints without repeating the full URL each time. This setup simplifies your code and makes future updates more manageable.

- [ ] Keep the following code currently in your `index.js` file:

    ```javascript
    // Base URL for CatFacts API
    const baseUrl = "https://catfact.ninja";

    console.log("Base URL set up for CatFacts API:", baseUrl);
    ```

 [ ] Run your code using Node.js in the terminal:

```bash
node index.js
```

### Expected Output:

```bash
Base URL set up for CatFacts API: https://catfact.ninja
```

**Explanation:**

- **Setting the Base URL:** This `baseUrl` variable stores the base address of the **CatFacts API**. You’ll use this URL as a starting point for various requests to the API, making your code cleaner and easier to maintain. Here are the endpoints you’ll be working with:

  - **`/fact`**: Returns a single random cat fact.
  - **`/facts`**: Fetches multiple cat facts at once. Add `?limit=3` as a query parameter to get three facts, for example.
  - **`/breeds`**: Provides a list of cat breeds, including descriptions and other details.

  Each endpoint extends from the `baseUrl`, allowing you to target specific data from the API based on your needs. You can explore more on how each endpoint works by visiting the [CatFacts API documentation](https://catfact.ninja/).

- **Easier Maintenance:** Defining `baseUrl` in one place means you only have to update it once if the API’s main address changes, rather than in every single fetch request.

- **Preparation for Fetch Requests:** This base URL setup keeps your API calls **consistent** and easy to reference, so that as you proceed with writing fetch requests, you only need to append the specific endpoints to this base URL.

##

### 3. **Refactor the Fetch Single Random Cat Fact**

In this step, you’ll refactor the function that fetches a single random cat fact to use **async/await** syntax instead of **promises**. This will make the code more readable and easier to manage.

- [ ]  **Locate the Previous Code:** In your `index.js` file, find the original `getRandomFact` function written using promises:

   ```javascript
   // Fetch a single random cat fact
   const getRandomFact = () => {
     fetch(`${baseUrl}/fact`)
       .then((response) => response.json())
       .then((data) => {
         console.log("Random Cat Fact:");
         console.log(data.fact);
       })
       .catch((error) => {
         console.error("Error fetching random cat fact:", error);
       });
   };
  ```

- [ ] **Comment Out** the entire `getRandomFact` function as shown below. 

```javascript
// Fetch a single random cat fact
// const getRandomFact = () => {
//   fetch(`${baseUrl}/fact`)
//     .then((response) => response.json())
//     .then((data) => {
//       console.log("Random Cat Fact:");
//       console.log(data.fact);
//     })
//     .catch((error) => {
//       console.error("Error fetching random cat fact:", error);
//     });
// };
```

- [ ] Now **Replace** the code with the Refactored Version Using Async/Await:

```javascript
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
```
  
- [ ] **Make sure to keep the function call**: Keep the function call below the commented-out code, as it will still be needed to test the updated function.

   ```javascript
   // Call the function 
   getRandomFact();
  ```

  [ ] Run your code using Node.js in the terminal:

```bash
node index.js
```

### Expected Output:
The output may vary since each request returns a random fact from the API.

```bash
Random Cat Fact:
Cats have five toes on their front paws, but only four on the back paws.
```

**Explanation of Refactoring from Promise to Async/Await:**

- **Async Declaration**: The `async` keyword before `getRandomFact` allows the function to use `await` for asynchronous operations, converting promise-based code into a more readable, synchronous-like structure.
  
- **Awaiting the Fetch**: By adding `await` before `fetch(${baseUrl}/fact)`, the function pauses execution until the fetch request completes. This removes the need for `.then()` to handle the fetch response.

- **Simplified JSON Parsing**: Similarly, `await response.json()` directly parses the response to JSON format without an additional `.then()`.

- **Error Handling with Try/Catch**: The `try...catch` block replaces the `.catch()` method, capturing any errors in the fetch or JSON parsing steps, and making error handling more concise and intuitive.


##

### 4. **Refactor the Fetch Multiple Random Cat Facts**

In this step, you’ll refactor the function that fetches multiple random cat facts to use **async/await** instead of **promises**. This change improves readability and makes the code easier to manage.

- [ ] **Locate the Previous Code:** In your `index.js` file, find the original `getMultipleFacts` function, written using promises:

   ```javascript
   // Fetch multiple random cat facts
   const getMultipleFacts = () => {
     // Specify the number of facts to fetch (e.g., 3)
     const numberOfFacts = 3;
     fetch(`${baseUrl}/facts?limit=${numberOfFacts}`)
       .then(response => response.json())
       .then(data => {
         console.log(`\n${numberOfFacts} Random Cat Facts:`);
         data.data.forEach((fact, index) => {
           console.log(`${index + 1}. ${fact.fact}`);
         });
       })
       .catch(error => {
         console.error("Error fetching multiple cat facts:", error);
       });
   };
  ```

  - [ ] **Comment Out** the entire `getMultipleFacts` function as shown below. 

```javascript
// const getMultipleFacts = () => {
//   // Specify the number of facts to fetch (e.g., 3)
//   const numberOfFacts = 3;
//   fetch(`${baseUrl}/facts?limit=${numberOfFacts}`)
//     .then(response => response.json())
//     .then(data => {
//       console.log(`\n${numberOfFacts} Random Cat Facts:`);
//       data.data.forEach((fact, index) => {
//         console.log(`${index + 1}. ${fact.fact}`);
//       });
//     })
//     .catch(error => {
//       console.error("Error fetching multiple cat facts:", error);
//     });
// };
```

- [ ] Now **Substitute** the code with the Refactored Version Using Async/Await:

```javascript
const getMultipleFacts = async () => {
  // Specify the number of facts to fetch (e.g., 3)
  const numberOfFacts = 3;
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
```

- [ ] **Make sure to keep the function call**: Keep the function call below the commented-out code, as it will still be needed to test the updated function.

   ```javascript
  // Call the function to test it
  getMultipleFacts();

  ```
[ ] Run your code using Node.js in the terminal:

```bash
node index.js
```

### Expected Output:
The output may vary since each request returns a random facts from the API.

```bash
3 Random Cat Facts:
1. Cats have five toes on their front paws, but only four on the back paws.
2. A group of cats is called a clowder.
3. Cats can rotate their ears 180 degrees.
```


**Explanation of Refactoring from Promise to Async/Await:**

- **Async Declaration**: Declaring `getMultipleFacts` as `async` allows the function to use `await`, which pauses execution within the function for asynchronous operations. This refactoring replaces the chaining of `.then()` with a more readable, step-by-step flow, making it easier to understand and manage.

- **Awaiting the Fetch**: By placing `await` before `fetch(${baseUrl}/facts?limit=${numberOfFacts})`, the function waits until the fetch request completes before moving to the next line. This eliminates the need for `.then()` to handle the response and helps create a more synchronous-looking, readable structure for asynchronous code.

- **JSON Parsing**: Using `await response.json()` directly parses the JSON response, replacing an additional `.then()` and making the data extraction process more streamlined. The JSON data can then be used directly within the function.

- **Limiting the Number of Facts**: The `numberOfFacts` variable controls how many facts are fetched by setting the `limit` query parameter in the API URL (`${baseUrl}/facts?limit=${numberOfFacts}`). This parameter is specified in the **CatFacts API** documentation, which is essential for understanding and implementing features correctly. The documentation explains how to structure endpoint requests, such as limiting the number of returned items by setting `limit`. Referring to API documentation helps ensure correct and optimized use of API features, providing insights on parameters, possible error messages, and example responses.

- **Error Handling with Try/Catch**: The `try...catch` block replaces the `.catch()` used in promises. By catching any errors that may occur in either the fetch or JSON parsing steps, it centralizes error management, making it more concise and intuitive.

##

### 5. **Refactor the Fetch Cat Breeds Function**

In this step, you’ll refactor the function that fetches a list of cat breeds to use **async/await** syntax instead of **promises**. This change will enhance readability and simplify the flow of asynchronous operations.

- [ ] **Locate the Previous Code**: In your `index.js` file, find the original `getCatBreeds` function written using promises:

   ```javascript
   // Fetch cat breeds
   const getCatBreeds = () => {
     fetch(`${baseUrl}/breeds`)
       .then(response => response.json())
       .then(data => {
         console.log("\nList of Cat Breeds:");
         data.data.forEach((breed, index) => {
           console.log(`${index + 1}. ${breed.breed}`);
         });
       })
       .catch(error => {
         console.error("Error fetching cat breeds:", error);
       });
   };


  - [ ] **Comment Out** the entire `getMultipleFacts` function as shown below. 

```javascript
// const getCatBreeds = () => {
//   fetch(`${baseUrl}/breeds`)
//     .then(response => response.json())
//     .then(data => {
//       console.log("\nList of Cat Breeds:");
//       data.data.forEach((breed, index) => {
//         console.log(`${index + 1}. ${breed.breed}`);
//       });
//     })
//     .catch(error => {
//       console.error("Error fetching cat breeds:", error);
//     });
// };
```

- [ ] Now **Replace** the code with the Refactored Version Using Async/Await:


```javascript
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
```

- [ ] **Make sure to keep the function call**: Keep the function call below the commented-out code, as it will still be needed to test the updated function.

```javascript
   // Call the function to test it
getCatBreeds();

[ ] Run your code using Node.js in the terminal:

```bash
node index.js
```

### Expected Output:
Again, the output may vary for this API request as well.


```bash
List of Cat Breeds:
1. Abyssinian
2. Aegean
3. American Bobtail
4. American Curl
```

**Explanation of Refactoring from Promise to Async/Await:**

- **Async Declaration**: Declaring `getCatBreeds` as `async` allows us to use `await`, simplifying the handling of asynchronous tasks within the function and removing the need for chained `.then()` calls.

- **Awaiting the Fetch**: Using `await` before `fetch(${baseUrl}/breeds)` pauses the function until the fetch operation completes, eliminating the need for `.then()` and making the code more readable and sequential.

- **JSON Parsing**: With `await response.json()`, the JSON response is directly parsed, avoiding an additional `.then()` and streamlining access to the data returned from the API.

- **Mapping Through Data**: The `data.data.forEach()` loop is used to iterate through each item in the response. Here, `forEach` is applied to map over each cat breed in the array. For each breed, `index + 1` is used to provide a numbered list, with `breed.breed` displaying the name of each breed.

- **Error Handling with Try/Catch**: The `try...catch` block provides a clear and centralized way to manage errors, replacing `.catch()`. This approach consolidates error handling for both the fetch and JSON parsing steps, making the function easier to maintain and debug.

##


### 6. **Commit and Push Your Code to GitHub**

Now that you've completed your code, it's important to **save your work** and **push it to GitHub**. This will help you keep track of your progress and ensure you have a backup.

Follow these basic steps:


- [ ] **Commit and Push Your Code:**
  1. Add and commit your files:
     ```bash
     git add .
     git commit -m "Refactored with Async examples"
     ```
  2. Push your code to GitHub:
     ```bash
     git push origin main
     ```

##

## Conclusion 📄

In this lab, you successfully refactored code from using **promises** to a more readable and streamlined **async/await** approach, enhancing your ability to work with **asynchronous JavaScript** and APIs. By transitioning from `.then()` and `.catch()` to async functions, you simplified code structure and improved error handling, making your functions easier to understand and maintain.

### Key Accomplishments:
- **Base URL Setup**: Created a consistent base for API requests, making your code adaptable and easy to maintain.
- **Async Data Fetching**: Refactored functions to use `async/await`, gaining a more intuitive, step-by-step way to handle asynchronous data.
- **Endpoint Variety**: Explored different API endpoints, fetching both single and multiple facts as well as a list of cat breeds from the **CatFacts API**.
- **JSON Conversion and Mapping**: Parsed JSON responses and used array methods to display data, allowing efficient handling and display of API data.
- **Error Handling**: Implemented `try...catch` blocks for effective error management, ensuring smooth handling of issues like network errors or invalid endpoints.

### Key Takeaways:
- **Async/Await Advantages**: `async/await` offers a more synchronous feel to asynchronous code, making complex operations easier to follow.
- **Effective Error Management**: `try...catch` consolidates error handling in a single block, which is easier to maintain and read than multiple `.catch()` calls.
- **API Documentation**: Referring to **API documentation** is essential for building accurate, functional requests and making full use of available data and parameters.

With these skills, you’re ready to explore more APIs, apply async/await in various contexts, and build dynamic, data-driven applications. Continue experimenting with new APIs and applying these techniques to create responsive, user-friendly applications.


### Solution codebase 👀
🛑 **Only use this as a reference** 🛑

💾 **Not something to copy and paste** 💾

**Note:**  This lab references a solution file located [here](https://github.com/HackerUSA-CE/aisd-ajs-02-fetch-async/tree/solution) (link not shown).

---
© All rights reserved to ThriveDX


