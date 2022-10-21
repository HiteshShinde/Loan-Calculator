// Listen for submit
document.getElementById('loan-form').addEventListener('submit', function(e){
    // Hide Results
    document.getElementById('results').style.display = 'none';

    // Show loader
    document.getElementById('loading').style.display = 'block';

    setTimeout(calculateResults, 1000);

    e.preventDefault();
});

// Calculate Results
function calculateResults(e) {
    // UI Vars
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const tenure = document.getElementById('tenure');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    const principal = parseFloat(amount.value);
    const calInterest = parseFloat(interest.value) / 100 / 12;
    const calPayments = parseFloat(tenure.value) * 12;

    // Calculate monthly payment
    const x = Math.pow(1 + calInterest, calPayments);
    const monthly = (principal*x*calInterest)/(x-1);

    if(isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calPayments).toFixed(2);
        totalInterest.value = ((monthly * calPayments)-principal).toFixed(2);

        // Hide loader and show results
        document.getElementById('results').style.display = 'block';
        document.getElementById('loading').style.display = 'none';
    } else {
        showError('Please check the entered value')
    }
}

// Show Error
function showError(error){
    // Hide loader and results
    document.getElementById('results').style.display = 'none';
    document.getElementById('loading').style.display = 'none';

    // Create a div
    const errorDiv = document.createElement('div');

    // Get elements
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    // Add class
    errorDiv.className = 'alert alert-danger';

    // Create text node and append to div
    errorDiv.appendChild(document.createTextNode(error));

    // Insert error above heading
    card.insertBefore(errorDiv, heading);

    // Clear error after 2 seconds
    setTimeout(clearError, 2000);
}

// Clear error
function clearError(){
    document.querySelector('.alert').remove();
}