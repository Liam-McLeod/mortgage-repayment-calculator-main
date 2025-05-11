function errorFunc(element) {
    let error_message = element.parentElement.parentElement.querySelector('.error');
    error_message.classList.remove('hidden');

    let input = element.parentElement;
    input.style.border = '1px solid red';

    let prefix = element.parentElement.querySelector('.prefix');
    if (prefix) {
        prefix.classList.add('prefix-error');;
    }
}

function clearErrorFunc(element) {
    let error_message = element.parentElement.parentElement.querySelector('.error');
    error_message.classList.add('hidden');

    let input = element.parentElement;
    input.style.border = '1px solid rgb(107,148,168)';

    let prefix = element.parentElement.querySelector('.prefix');
    if (prefix) {
        prefix.classList.remove('prefix-error');
    }
} 

function activeFunc(element) {
    //Remove error message when user starts typing
    clearErrorFunc(element);

    let input = element.parentElement;
    input.style.border = '1px solid rgb(216,219,47)';

    let prefix = element.parentElement.querySelector('.prefix');
    prefix.classList.add('prefix-active');
}

function clearActiveFunc(element) {
    let input = element.parentElement;
    input.style.border = '1px solid rgb(107,148,168)';

    let prefix = element.parentElement.querySelector('.prefix');
    prefix.classList.remove('prefix-active');
}

/* Form Inputs */
const inputList = document.querySelectorAll('input[type=number]');
const mortgageAmountInput = document.getElementById('mortgage-amount');
const mortgageTermInput = document.getElementById('mortgage-term');
const interestRateInput = document.getElementById('interest-rate');
const repaymentInput = document.getElementById('repayment');
const interestOnlyInput = document.getElementById('interest-only');

/* Results */
const resultsEmpty = document.querySelector('.results-empty');
const resultsCompleted = document.querySelector('.results-completed');
const monthlyPaymentDisplay = document.querySelector('.monthly-repayment-display');
const totalPayableDisplay = document.querySelector('.total-payable-display');

// Form Submission Event
const form = document.querySelector('form');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    let isValid = true;
    // Invalid input handling
    if (!mortgageAmountInput.value) {
        errorFunc(mortgageAmountInput);
        isValid = false;
    }
    if (!mortgageTermInput.value || !interestRateInput.value) {
        errorFunc(mortgageTermInput);
        errorFunc(interestRateInput);
        isValid = false;
    }
    if (!repaymentInput.checked && !interestOnlyInput.checked) {
        errorFunc(repaymentInput);
        errorFunc(interestOnlyInput);
        isValid = false;
    }
    if (!isValid) {
        // If any input is invalid, show error messages and return
        return;
    }

    // If all inputs are valid, proceed with form submission

    // Calculate the mortgage based on the inputs
    const mortageAmount = mortgageAmountInput.value;
    const mortgageTerm = mortgageTermInput.value * 12; // Convert years to months
    const interestRate = interestRateInput.value / 100 / 12; // Monthly interest rate as a decimal

    const monthlyPayment = (mortageAmount * interestRate * (1 + interestRate) ** mortgageTerm) / ((1 + interestRate) ** mortgageTerm - 1);
    const totalPayable = (monthlyPayment * mortgageTerm);
    
    // Display the results
    monthlyPaymentDisplay.textContent = `£${monthlyPayment.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    totalPayableDisplay.textContent = `£${totalPayable.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

    // Hide empty results and show completed results
    resultsEmpty.classList.add('hidden');
    resultsCompleted.classList.remove('hidden');
});

// Clear all form fields when the "Clear All" link is clicked
const clearAllLink = document.querySelector('.clear-all');
clearAllLink.addEventListener('click', (event) => {
    event.preventDefault();

    // Clear any error messages
    inputList.forEach((input) => {
        clearErrorFunc(input);
    });
    clearErrorFunc(repaymentInput);
    clearErrorFunc(interestOnlyInput);

    // Clear any radio active states
    repaymentInput.parentElement.classList.remove('radio-active');
    interestOnlyInput.parentElement.classList.remove('radio-active');

    // Hide completed results and show empty results
    resultsCompleted.classList.add('hidden'); 
    resultsEmpty.classList.remove('hidden');

    // Clear all input fields
    form.reset();
});


// Add active and blur event for each number input
inputList.forEach((input) => {
    input.addEventListener('input', (event) => {
        activeFunc(input);
    });
});

inputList.forEach((input) => {
    input.addEventListener('blur', (event) => {
        clearActiveFunc(input);
    });
});

// Add change event for radio inputs
repaymentInput.addEventListener('change', () => {
    // Clear error message when user selects a radio button
    clearErrorFunc(repaymentInput);
    clearErrorFunc(interestOnlyInput);
    repaymentInput.parentElement.classList.add('radio-active');
    interestOnlyInput.parentElement.classList.remove('radio-active');
});

interestOnlyInput.addEventListener('change', () => {
    // Clear error message when user selects a radio button
    clearErrorFunc(repaymentInput);
    clearErrorFunc(interestOnlyInput);
    interestOnlyInput.parentElement.classList.add('radio-active');
    repaymentInput.parentElement.classList.remove('radio-active');
});