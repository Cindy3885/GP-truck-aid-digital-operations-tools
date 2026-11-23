/* =====================================
   GP TRUCK AID
   Fleet Fuel & Trip Profitability Calculator
   JavaScript Calculation Engine
===================================== */

// Currency formatting in South African Rand
const currencyFormatter = new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
});

// Find the calculator form
const calculator = document.getElementById("tripCalculator");

// Find the results elements
const fuelResult = document.getElementById("fuelResult");
const fuelCostResult = document.getElementById("fuelCostResult");
const totalCostResult = document.getElementById("totalCostResult");
const profitResult = document.getElementById("profitResult");
const profitMessage = document.getElementById("profitMessage");

// Format amounts as South African Rand
function formatCurrency(amount) {
    return currencyFormatter.format(amount);
}

// Calculate trip costs when the form is submitted
calculator.addEventListener("submit", function(event) {

    event.preventDefault();

    // Collect the user's input values
    const distance = Number(document.getElementById("distance").value);
    const consumption = Number(document.getElementById("consumption").value);
    const fuelPrice = Number(document.getElementById("fuelPrice").value);
    const otherCosts = Number(document.getElementById("otherCosts").value);
    const revenue = Number(document.getElementById("revenue").value);

    // Validate the information
    if (
        !Number.isFinite(distance) ||
        !Number.isFinite(consumption) ||
        !Number.isFinite(fuelPrice) ||
        !Number.isFinite(otherCosts) ||
        !Number.isFinite(revenue) ||
        distance <= 0 ||
        consumption <= 0 ||
        fuelPrice < 0 ||
        otherCosts < 0 ||
        revenue < 0
    ) {
        alert("Please enter valid trip details before calculating.");
        return;
    }

    // Calculate estimated fuel requirements
    const fuelRequired = (distance * consumption) / 100;

    // Calculate fuel expenses
    const fuelCost = fuelRequired * fuelPrice;

    // Calculate total trip expenses
    const totalExpenses = fuelCost + otherCosts;

    // Calculate estimated profit or loss
    const profit = revenue - totalExpenses;

    // Calculate operating cost per kilometre
    const costPerKm = totalExpenses / distance;

    // Display the calculated results
    fuelResult.textContent = fuelRequired.toFixed(2) + " litres";

    fuelCostResult.textContent = formatCurrency(fuelCost);

    totalCostResult.textContent = formatCurrency(totalExpenses);

    profitResult.textContent = formatCurrency(profit);

    // Explain the financial result
    if (profit > 0) {
        profitMessage.textContent =
            "Estimated profitable trip. Cost per km: " +
            formatCurrency(costPerKm);

        profitResult.style.color = "#16804a";

    } else if (profit < 0) {
        profitMessage.textContent =
            "Estimated trip loss. Cost per km: " +
            formatCurrency(costPerKm);

        profitResult.style.color = "#c0392b";

    } else {
        profitMessage.textContent =
            "Estimated break-even trip. Cost per km: " +
            formatCurrency(costPerKm);

        profitResult.style.color = "#1769aa";
    }

});

// Clear displayed results when the form is reset
calculator.addEventListener("reset", function() {

    fuelResult.textContent = "--";
    fuelCostResult.textContent = "--";
    totalCostResult.textContent = "--";
    profitResult.textContent = "--";

    profitResult.style.color = "";

    profitMessage.textContent =
        "Enter your trip details to calculate profitability.";

});

