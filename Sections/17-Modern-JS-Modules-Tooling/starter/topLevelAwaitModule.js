console.log('Module exported, code executed.');

///////////////////////////////////////
// Top-Level Await (ES2022) + async/await + promise handling with then()/catch()

//console.log('Start fetching');

//const res = await fetch('https://jsonplaceholder.typicode.com/posts');
//const data = await res.json();
//console.log(data);

//console.log('Something');

const getLastPost = async function () {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await res.json();

  return { title: data.at(-1).title, text: data.at(-1).body };
};

//console.log('Last post data:');
const lastPost = getLastPost();
//console.log(lastPost);

// Not very clean
//lastPost.then(last => console.log(last));

const lastPost2 = await getLastPost();
//console.log(lastPost2);

// Returning Values from Async Functions
const getCountryData = async function (countryName) {
  const endPoint = `https://restcountries.com/v3.1/name/${countryName}`;

  const initialResponse = await fetch(endPoint);

  const readStreamOfData = await initialResponse.json();

  const [countryData] = readStreamOfData;

  return countryData;
};

const asyncHandlerFunc = async function () {
  const countryData = await getCountryData('bulgaria');

  console.log(countryData);
};

//asyncHandlerFunc();

/*
//iife async handler
(async function () {
  const countryData = await getCountryData('bulgaria');

  console.log(countryData);
})();
*/

const getLastToDoTask = async function () {
  const initialServResponse = await fetch(
    'https://jsonplaceholder.typicode.com/todos'
  );

  const toDosArray = await initialServResponse.json();

  const lastToDoTask = toDosArray.at(-1);

  return lastToDoTask;
};

const asyncHandler = async function () {
  const lastTaskData = await getLastToDoTask();

  console.log(lastTaskData);
};

//asyncHandler();

//top level await statement allowed only in modules
const todoData = await getLastToDoTask();
//console.log(todoData);

export { lastPost2 };
