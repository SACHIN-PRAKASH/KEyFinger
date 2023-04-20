const textDelay = 20; // in milliseconds
const introText = "Hey Buddy! it's KeyFinger\nPlease enter your information :)\n\n";

let index = 0;

function displayIntroText() {
  if (index < introText.length) {
    document.querySelector(".command-line").textContent += introText.charAt(index);
    index++;
    setTimeout(displayIntroText, textDelay);
  }
}

displayIntroText();


