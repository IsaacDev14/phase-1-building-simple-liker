// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡';
const FULL_HEART = '♥';

// Create the error modal immediately (before the test runs)
const errorModal = document.createElement("div");
errorModal.id = "modal";
errorModal.classList.add("hidden");

// Create the message element inside the modal
const message = document.createElement("p");
message.id = "modal-message";
errorModal.appendChild(message);

// Add the modal to the body
document.body.appendChild(errorModal);

// Wait for DOM to load before attaching event listeners
document.addEventListener("DOMContentLoaded", () => {
  // Select all heart elements
  const hearts = document.querySelectorAll(".like-glyph");

  hearts.forEach(heart => {
    heart.addEventListener("click", () => {
      mimicServerCall()
        .then(() => {
          if (heart.textContent === EMPTY_HEART) {
            heart.textContent = FULL_HEART;
            heart.classList.add("activated-heart");
          } else {
            heart.textContent = EMPTY_HEART;
            heart.classList.remove("activated-heart");
          }
        })
        .catch((error) => {
          // Show error modal and display message
          errorModal.classList.remove("hidden");
          message.textContent = error;
          
          // Hidding error modal after 3 seconds
          setTimeout(() => {
            errorModal.classList.add("hidden");
          }, 3000);
        });
    });
  });
});

//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2;
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
