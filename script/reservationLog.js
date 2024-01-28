class Reservation {
  constructor(_id, _fullName, _phoneNumber, _dishName, _payment) {
    if (arguments.length !== 5) {
      throw new Error("Please, provide 5 properties");
    }

    this.id = _id;
    this.fullName = _fullName;
    this.phoneNumber = _phoneNumber;
    this.dishName = _dishName;
    this.payment = _payment;
  }
}

const reservationTableBody = document
  .getElementById("reservationTbl")
  .getElementsByTagName("tbody")[0];

let reservations = [];

async function fetchReservationsFromAPI() {
  try {
    const response = await fetch("http://localhost:4000/api/orders");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching reservations from API:", error);
    return [];
  }
}

async function populateTableFromAPI() {
  reservations = await fetchReservationsFromAPI();
  console.log(reservations);

  reservationTableBody.innerHTML = "";

  for (let i = 0; i < reservations.length; i++) {
    const newTableRow = reservationTableBody.insertRow();
    newTableRow.insertCell(0).innerHTML = reservations[i].id;
    newTableRow.insertCell(1).innerHTML = reservations[i].fullname;
    newTableRow.insertCell(2).innerHTML = reservations[i].phonenumber;
    newTableRow.insertCell(3).innerHTML = reservations[i].dishOrder;
    newTableRow.insertCell(4).innerHTML = reservations[i].payment_method;

    const deleteButton = createButton("Delete", async () => {
      const reservationId = reservations[i].id;
      reservations.splice(i, 1);
      populateTableFromAPI();
      await deleteReservationFromAPI(reservationId);
    });

    const editButton = createButton("Edit", () => {
      const reservationId = reservations[i].id;
      openEditForm(reservationId);
    });

    newTableRow.insertCell(5).appendChild(deleteButton);
    newTableRow.insertCell(6).appendChild(editButton);
  }
}

function createButton(label, clickHandler) {
  const button = document.createElement("button");
  button.className = "actionBtn";
  button.innerHTML = label;
  button.addEventListener("click", clickHandler);
  return button;
}

async function deleteReservationFromAPI(reservationId) {
  try {
    await fetch(`http://localhost:4000/api/orders/${reservationId}`, {
      method: "DELETE",
    });

    console.log(`Reservation with id ${reservationId} deleted successfully`);
  } catch (error) {
    console.error("Error deleting reservation from API:", error);
  }
}

function openEditForm(reservationId) {
  const reservationToEdit = reservations.find(
    (reservation) => reservation.id === reservationId
  );


  const editForm = document.createElement("form");
  editForm.className = "edit-form";

  const fullNameInput = createInput(
    "fullName",
    "Full Name",
    reservationToEdit.fullname
  );
  const phoneNumberInput = createInput(
    "phoneNumber",
    "Phone Number",
    reservationToEdit.phonenumber
  );
  const dishNameInput = createInput(
    "dishName",
    "Dish Name",
    reservationToEdit.dishOrder
  );
  const paymentInput = createInput(
    "payment",
    "Payment",
    reservationToEdit.payment_method
  );

  const updateButton = document.createElement("button");
  updateButton.type = "button";
  updateButton.textContent = "Update";
  updateButton.addEventListener("click", () =>
    updateReservation(reservationId)
  );

  editForm.appendChild(fullNameInput);
  editForm.appendChild(phoneNumberInput);
  editForm.appendChild(dishNameInput);
  editForm.appendChild(paymentInput);
  editForm.appendChild(updateButton);

  document.body.appendChild(editForm);
}

function createInput(id, label, value) {
  const container = document.createElement("div");
  container.className = "input-container";

  const inputLabel = document.createElement("label");
  inputLabel.for = id;
  inputLabel.textContent = label;

  const inputField = document.createElement("input");
  inputField.type = "text";
  inputField.id = id;
  inputField.value = value;
  inputField.required = true;

  container.appendChild(inputLabel);
  container.appendChild(inputField);

  return container;
}

async function updateReservation(reservationId) {
  const fullName = document.getElementById("fullName").value;
  const phoneNumber = document.getElementById("phoneNumber").value;
  const dishName = document.getElementById("dishName").value;
  const payment = document.getElementById("payment").value;

  const updatedReservation = {
    id: reservationId,
    fullname: fullName,
    phonenumber: phoneNumber,
    dishOrder: dishName,
    payment_method: payment,
  };

  try {
    await fetch(`http://localhost:4000/api/orders/${reservationId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedReservation),
    });

    console.log(`Reservation with id ${reservationId} updated successfully`);

    const index = reservations.findIndex(
      (reservation) => reservation.id === reservationId
    );
    reservations[index] = updatedReservation;

    populateTableFromAPI();
  } catch (error) {
    console.error("Error updating reservation:", error);
  }

  const editForm = document.querySelector(".edit-form");
  if (editForm) {
    editForm.remove();
  }
}

populateTableFromAPI();
