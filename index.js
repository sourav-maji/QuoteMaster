let quoteData = {};
const apiUrl = "https://api.freeapi.app/api/v1/public/quotes/quote/random";

const quoteText = document.getElementById("quoteText");
const quoteAuthor = document.getElementById("quoteAuthor");

// Elements for button
const newQuote = document.getElementById("newQuote");
const copyQuote = document.getElementById("copyQuote");
const exportQuote = document.getElementById("exportQuote");
const shareToX = document.getElementById("shareToX")

// Random Back ground color

function changeBackgroundColor() {
  const highest = 255;

  const red = Math.floor(Math.random() * highest);
  const green = Math.floor(Math.random() * highest);
  const blue = Math.floor(Math.random() * highest);

  document.body.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
}

// function to load random quotes

function randomQuotes() {
  fetch(apiUrl)
    .then((resposnse) => {
      if (!resposnse.ok) {
        throw new Error("Network response was not ok");
      }

      return resposnse.json();
    })
    .then((data) => {
      quoteData = data.data;
    })
    .catch((error) => {
      console.log(`Something went wrong : ${error}`);
    });
}

// function to dislay the quote in card

function displayQuote(localQuote) {
  if (!localQuote) {
    randomQuotes();
  }
  console.log(localQuote);

  quoteText.textContent = "";
  quoteAuthor.textContent = "";
  quoteText.textContent = localQuote?.content;
  quoteAuthor.textContent = `Author : ${localQuote?.author}`;
  quoteAuthor.style.color = "#AE2929";
}

// function for copy to clipboard

function copyToClipBoard(localQuote) {
  const quote = localQuote.content || "";
  navigator.clipboard.writeText(quote);
}

// function to download
function exportQuoteToLocal() {
  const a = document.createElement("a");
  a.href = "./index.html";
  a.download = "file-name";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}


// function for Share to X

function shareToXFunction(localQuote) {
    const quote = localQuote?.content || "";
    const author = localQuote?.author || "";
    const shareAbleText = encodeURIComponent(`${quote}\n\t\t\t  -${author}`)
    window.open(`https://twitter.com/intent/tweet?text=${shareAbleText}`)
  }

// newQuote button functionality

newQuote.addEventListener("click", function () {
  window.onload();
});

// copyQuote button functionality

copyQuote.addEventListener("click", function () {
  copyToClipBoard(quoteData);
});

// exportQuote button functionality

exportQuote.addEventListener("click", function () {
  exportQuoteToLocal();
});

// shareToX button functionality

shareToX.addEventListener("click" , function(){
    shareToXFunction(quoteData)
})

window.onload = () => {
  randomQuotes();
  setTimeout(function () {
    displayQuote(quoteData);
    changeBackgroundColor();
  }, 500);
};
