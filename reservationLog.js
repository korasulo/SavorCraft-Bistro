class Reservation{
    constructor(_fullName, _phoneNumber, _quantity, _payment ){

        if(arguments.length != 4)
        {
            throw new Error("Please, provide 4 properties")
        }

        this.fullName = _fullName;
        this.phoneNumber = _phoneNumber;
        this.quantity = _quantity ;
        this.payment = _payment;
    }
}

//const reservations = [
   // new Reservation('Flori Mumajesi','+355 5456465','5','cash'),
    //new Reservation('ermal Mamaqi', '+35562149876','7','mastercard')
//];

//Get Table -> <tbody>
const reservationTableBody = document.getElementById("reservationTbl").getElementsByTagName("tbody")[0];
//[0] refers to the first <tbody> element.


    function populateTable() {

        var reservations = JSON.parse(localStorage.getItem("reservations")) || [];//merr rezervimin para modifikimi
        //nga JSON string ne liste objektesh
      
        // Clear existing table content
        reservationTableBody.innerHTML = "";
      
        for (let i = 0; i < reservations.length; i++) {
          const newTableRow = reservationTableBody.insertRow();
          newTableRow.insertCell(0).innerHTML = reservations[i].fullName;//akseson listen e objekteve
          newTableRow.insertCell(1).innerHTML = reservations[i].phoneNumber;
          newTableRow.insertCell(2).innerHTML = reservations[i].quantity;
          newTableRow.insertCell(3).innerHTML = reservations[i].payment;
      
          // Create delete button
          const deleteButton = document.createElement("button"); //creation in document
          deleteButton.className = "removeBtn";//krijo klasen
          deleteButton.innerHTML = "Delete"; //text inside button
      

          // Add event listener to handle reservation deletion
            deleteButton.addEventListener("click", () => {
              reservations.splice(i, 1);// Remove the reservation from the array  //removes 1 of the table entries
              populateTable();// Refresh the whole table
              updateLocalStorage(reservations);// Update local storage //FUNCTION CALL
            });

          newTableRow.insertCell(4).appendChild(deleteButton);//insert the delete button on the table,butoni i krijuar lart futet ne tabele
        }
      }
      //MBAROI FUNKSIONI POPULATETABLE()

      


      
      //Update localstorage with new items / modified existingReservations array -> JSON formatted string me stringify()
      function updateLocalStorage(reservations) {//FUNKSIONI 
        localStorage.setItem("reservations", JSON.stringify(reservations));
      }
      
      populateTable();    //FUNCTION CALL  