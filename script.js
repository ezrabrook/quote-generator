const quoteContainer = document.querySelector("#quote-container");
const quoteText = document.querySelector("#quote");
const authorText = document.querySelector("#author");
const twitterBtn = document.querySelector("#twitter");
const newQuoteBtn = document.querySelector("#new-quote");
const loader = document.querySelector("#loader");

let apiQuotes = [];

//show loading 
function loading () {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

//hide loading 
function complete () {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

//Show New Quote 
function newQuote() {
  loading();
  // Pick a random quote from apiQuotes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  
  //check quote length to determine styles 
  if (quote.text.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }

  // Check if author field is blank and replace it with "Unknown"
  if (!quote.author) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = quote.author;
  }
  //set quote hide loader 
  quoteText.textContent = quote.text;
  complete();
}


// Get Quotes from API 
async function getQuotes() {
  loading();
  const api = "https://jacintodesign.github.io/quotes-api/data/quotes.json"; 
  try {
    const response = await fetch(api);
    apiQuotes = await response.json();
    newQuote();

  } catch (error) {
    console.log("Whoops, no quote", error);
  }
}

// Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

// Event Listeners
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

getQuotes();