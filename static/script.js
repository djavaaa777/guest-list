const messageElement=document.getElementById("message")
const wrapperElement=document.querySelector(".wrapper2")

if(messageElement){
  setTimeout(()=>{
    messageElement.style.display="none"
    const url = new URL(window.location);
    url.searchParams.delete("message");
    window.history.replaceState({}, document.title, url.pathname)
  },5000)
}

wrapperElement.addEventListener("click",(event)=>{
    if(event.target.classList.contains("delete-icon")){
        const guestId=event.target.getAttribute("data-id")

        fetch(`/guests/${guestId}`,{method:'DELETE'}).then((res)=>{
            return res.json()
        }).then((data)=>{
            if (data.success && data.redirect) {
                window.location.href = data.redirect;
            }
            else{
                alert("Error while deleting")
            }
        })
    }
})

wrapperElement.addEventListener("click",(event)=>{
    if(event.target.classList.contains("edit-icon")){
        const guestId = event.target.getAttribute('data-id');
        const row=event.target.closest("tr")
        const name = row.children[0].textContent;
        const email = row.children[1].textContent;
        const country = row.children[2].textContent;
        const checkIn = row.children[3].textContent;
        const checkOut = row.children[4].textContent;
        const roomType = row.children[5].textContent;
        const roomNumber = row.children[6].textContent;
        row.innerHTML=`
            <td><input value="${name}" id="edit_name"></td>
            <td><input value="${email}" id="edit_email"></td>
            <td><input value="${country}" id="edit_country"></td>
            <td><input type="date" value="${checkIn}" id="edit_checkin"></td>
            <td><input type="date" value="${checkOut}" id="edit_checkout"></td>
            <td>
                <select class="edit-status" id="edit_type">
                        <option value="suite" ${roomType === "suite" ? "selected" : ""}>Suite</option>
                        <option value="deluxe" ${roomType === "deluxe" ? "selected" : ""}>Deluxe Room</option>
                        <option value="standard" ${roomType === "standard" ? "selected" : ""}>Standard Room</option>
                </select>
            </td>
            <td><input value="${roomNumber}" id="edit_room"></td>
            <td>
                <img src="icons8-speichern-16.png" class="save-edit-btn" data-id=${guestId}>
            </td>
        `
    }
})

wrapperElement.addEventListener("click", (event) => {
    if (event.target.classList.contains("save-edit-btn")) {
      const guestId = event.target.getAttribute('data-id');
  
      const updatedGuest = {
        full_name: document.getElementById("edit_name").value,
        email: document.getElementById("edit_email").value,
        country: document.getElementById("edit_country").value,
        check_in: document.getElementById("edit_checkin").value,
        check_out: document.getElementById("edit_checkout").value,
        room_type: document.getElementById("edit_type").value,
        room_number: document.getElementById("edit_room").value
      };
  
      fetch(`/guests/${guestId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedGuest)
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.redirect) {
            window.location.href = data.redirect;
          } else {
            alert("Error during update");
          }
        });
    }
  });
  