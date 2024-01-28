// START - RESERVATION PAGE

function clearFormFields() {
  document.getElementById("name").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("dname").value = "";
  document.getElementById("payment").value = "";
}

async function validateAndSubmit(event) {
  event.preventDefault(); // preventing the default form submission behavior

  var isValidated = true; // initializes a variable

  // reset all errors
  document.getElementById("nameSpan").innerHTML = "";
  document.getElementById("phoneSpan").innerHTML = "";
  document.getElementById("dnameSpan").innerHTML = "";

  const fullName = document.getElementById("name").value;
  if (fullName.length < 5) {
    document.getElementById("nameSpan").innerHTML =
      "Full name must be at least 5 characters";
    isValidated = false;
  }

  const dishName = document.getElementById("dname").value;
  if (dishName.length < 6) {
    document.getElementById("dnameSpan").innerHTML =
      "This dish is not in our menu";
    isValidated = false;
  }

  const phoneNumber = document.getElementById("phone").value;
  if (!phoneNumber.startsWith("+355")) {
    document.getElementById("phoneSpan").innerHTML =
      "This is not an Albanian phone number";
    isValidated = false;
  }

  const paymentMethod = document.getElementById("payment").value;

  if (!isValidated) {
    return;
  }

  try {
    const newReservation = {
      fullname: fullName,
      phonenumber: phoneNumber,
      dishOrder: dishName,
      payment_method: paymentMethod,
    };

    console.log("New Object for handle submit= ", newReservation);

    const response = await fetch("http://localhost:4000/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newReservation),
    });

    if (response.ok) {
      alert("Reservation added successfully!");
      clearFormFields();
    } else {
      alert("Failed to add reservation. Please try again.");
    }
  } catch (error) {
    console.error("Error adding reservation:", error);
    alert("An error occurred. Please try again later.");
  }
}

document.addEventListener("DOMContentLoaded", (event) => {
  const submitReservationButton = document.getElementById("reserveButton");
  if (submitReservationButton) {
    submitReservationButton.addEventListener("click", validateAndSubmit);
  }
});
