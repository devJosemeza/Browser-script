(function() {
    const sizes = ["18-24 months", "2T", "3T"];

    // Get selectors
    const priceElement = document.querySelector('.money.js-price'); 
    const quantityInput = document.querySelector('.pdp-quantity-input'); 
    const sizeInputs = document.querySelectorAll('input[type="radio"].js-pdp-variant-radio'); 
    const message = document.createElement('div');
    message.id = 'promotion-message';
    message.style.color = 'green';
    message.style.marginTop = '10px';

    // Function to update Message

    function updateMessage(quantity) {
        if (quantity === 1) {
            message.innerText = 'Add 2 of this product and the third one is free!';
        } else if (quantity === 2) {
            message.innerText = 'Add another one free to your cart.';
        } else if (quantity === 3) {
            message.innerText = 'Congrats! add to cart now!';
        } else {
            message.innerText = '';
        }
        console.log("Message updated:", message.innerText);
    }

     // Function to check state size and quantity

    function checkSizeAndQuantity() {
        let selectedSize = '';
        sizeInputs.forEach(input => {
            if (input.checked) {
                selectedSize = input.parentElement.textContent.trim();
            }
        });

        const quantity = parseInt(quantityInput.value, 10);

        if (sizes.includes(selectedSize)) {
            updateMessage(quantity);
            message.style.display = quantity >= 4 ? 'none' : 'block';
        } else {
            message.innerText = '';
            message.style.display = 'none';
        }
    }

    // Initialization and Events
    if (priceElement && quantityInput) {
        priceElement.parentElement.appendChild(message);

        sizeInputs.forEach(input => {
            input.addEventListener('change', () => {
                quantityInput.value = 1;
                checkSizeAndQuantity();
            });
        });

        quantityInput.addEventListener('change', checkSizeAndQuantity);
        quantityInput.addEventListener('input', checkSizeAndQuantity);

        const observer = new MutationObserver(checkSizeAndQuantity);
        observer.observe(quantityInput, { attributes: true, childList: true, subtree: true });

        // Initial check
        checkSizeAndQuantity();
    }
})();
