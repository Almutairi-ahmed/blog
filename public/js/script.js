document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM loaded, script running");
    
    // Get the compose form if it exists on the page
    const composeForm = document.querySelector('.compose-form');
    
    if (composeForm) {
        console.log("Compose form found:", composeForm);
        
        composeForm.addEventListener('submit', function(event) {
            console.log("Form submitted");
            
            // Get the submit button
            const submitButton = this.querySelector('button[type="submit"]');
            console.log("Submit button:", submitButton);
            
            // Disable the button and change text to show loading
            if (submitButton) {
                submitButton.disabled = true;
                submitButton.textContent = 'Publishing...';
                console.log("Button updated");
            } else {
                console.log("Submit button not found");
            }
        });
    } else {
        console.log("Compose form not found");
    }
});