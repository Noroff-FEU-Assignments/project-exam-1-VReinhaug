document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("contactForm");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const subjectInput = document.getElementById("subject");
    const messageInput = document.getElementById("message");
    const submitBtn = document.getElementById("submitBtn");
    const confirmationDiv = document.getElementById("confirmation");
  
    submitBtn.addEventListener("click", function() {
      const nameValue = nameInput.value.trim();
      const emailValue = emailInput.value.trim();
      const subjectValue = subjectInput.value.trim();
      const messageValue = messageInput.value.trim();
  
      let isValid = true;
  
      // Clear previous error messages
      clearErrors();
  
      // Validate name
      if (nameValue.length < 5) {
        showError(nameInput, "Name must be at least 5 characters.");
        isValid = false;
      }
  
      // Validate email
      if (!isValidEmail(emailValue)) {
        showError(emailInput, "Please insert a valid email address.");
        isValid = false;
      }
  
      // Validate subject
      if (subjectValue.length < 15) {
        showError(subjectInput, "Please enter a subject with more than 15 characters");
        isValid = false;
      }
  
      // Validate message
      if (messageValue.length < 25) {
        showError(messageInput, "Please enter a message with more than 25 characters.");
        isValid = false;
      }
  
      // When valid, show confirmation message and reset form
      if (isValid) {
        confirmationDiv.textContent = "Thank you for contacting me, I will get back to you soon!";
        form.reset();
      }
    });
  
    function showError(input, message) {
      const errorDiv = input.nextElementSibling;
      errorDiv.textContent = message;
    }
  
    function clearErrors() {
      const errors = document.querySelectorAll(".form-error");
      errors.forEach(error => {
        error.textContent = "";
      });
    }
  
    function isValidEmail(email) {
      // Basic email validation regex
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    }
  });
  