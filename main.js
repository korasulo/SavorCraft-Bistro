//START FOOTER
setInterval(() => {
  document.getElementById("currentYear").innerHTML =new Date().toLocaleTimeString();
}, 1000);
//END FOOTER

// START - RESERVATION PAGE

function clearFormFields() {
  document.getElementById("name").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("quantity").value = "";
  document.getElementById("payment").value = "";
}

function validateAndSubmit(event) {

  event.preventDefault(); //preventing the default form submission behavior

  var isValidated = true; //initializes a variable

  //reset all errors
  document.getElementById("nameSpan").innerHTML = "";
  document.getElementById("phoneSpan").innerHTML = "";

  const fullName = document.getElementById("name").value;
  if (fullName.length < 5) {
    document.getElementById("nameSpan").innerHTML = "Full name must be at least 5 characters";
    isValidated = false;
  }

  const phoneNumber = document.getElementById("phone").value;
  if (!phoneNumber.startsWith("+355")) {
    document.getElementById("phoneSpan").innerHTML ="This is not an Albanian phone number";
    isValidated = false;
  }

  const guestQuantity = document.getElementById("quantity").value;
  const paymentMethod = document.getElementById("payment").value;
  
  if (isValidated == false) {//when false
    return;
  }

  if (isValidated) {//if it is true
      //Call method
    handleSubmit(fullName, phoneNumber, guestQuantity, paymentMethod);
    clearFormFields();
  }

}
//END FUNCTION VALIDATE AND SUBMIT

function handleSubmit(_fullName, _phoneNumber, _guestQuantity, _paymentMethod) 
{
  var newReservation = {
                        //object
                        fullName: _fullName,
                        phoneNumber: _phoneNumber,
                        quantity: _guestQuantity,
                        payment: _paymentMethod,
  };

  console.log("New Object for handle submit= ", newReservation);//koment ne console,kemi rezervim te ri

  //Retrieve items from localstorage
  var existingReservations = JSON.parse(localStorage.getItem("reservations")) || []; 
  //konvertim nga JSON-formatted string to js object using JSON.parse()
  //ska data/parsing fails -> [] value for empty array

  //Add reservation to existingReservations array
  existingReservations.push(newReservation);

  //Update localstorage with new items / modified existingReservations array -> JSON formatted string me stringify()
  localStorage.setItem("reservations", JSON.stringify(existingReservations));


  //retrieving existing reservations from local storage, adding a new reservation, updating the local storage with
   //the modified reservation data, and then notifying the user with an alert.
  alert("Reservations added to localstorage");//pop-up window alert

}
// END HANDLE SUBMIT

//START - ADD EVENT LISTENER
document.addEventListener("DOMContentLoaded", (event) => {//the browser fully loaded HTML, and the DOM tree is built
  const submitReservationButton = document.getElementById("reserveButton");
  if (submitReservationButton) {
    submitReservationButton.addEventListener("click", validateAndSubmit);
  }
});

/*document.getElementById("reserveButton").addEventListener("click", validateAndSubmit);*/
//END - ADD EVENT LISTENER