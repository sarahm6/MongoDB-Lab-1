
console.log("js file connected");


let submitButton = document.getElementById('submit-button');

submitButton.addEventListener('click', async () => {


    let nameString = document.getElementById('name-input').value;
    let colorString = document.getElementById('color-input').value;
    let ageNumber = +document.getElementById('age-input').value;
    // using ternary operator here - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator
    let readyBool = document.getElementById('ready-bool').value === "true" ? true : false;

    // packing all our data in an object
    // same as 
    // nameString: nameString
    const veggie = {
        nameString,
        colorString,
        ageNumber,
        readyBool
    }


    let response = await fetch('http://localhost:5000/create_fruit', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        // to send JSON data over HTTP
        body: JSON.stringify(fruit)
    })
    let uploadStatusTag = document.getElementById('upload-status');
    console.log(response.status);
    if (response.status === 200) {
        console.log(response);
        console.log("upload complete!!!");
        uploadStatusTag.textContent = "Upload Completed";
        uploadStatusTag.style.color = "green";

    } else {
        console.log(response);
        console.log("upload failed");
        console.log;
        uploadStatusTag.textContent = "Upload Failed";
        uploadStatusTag.style.color = "red";

    }

})

let deleteButton = document.getElementById('delete');

deleteButton.addEventListener('click', async () => {
   let response = await fetch('http://localhost:5000/delete_nameless_data', {
        method: "delete",
    });
    // console.log(response);

    let parsedData = await response.json()
    console.log(parsedData);
});



let displayVeggiesPageButton = document.getElementById('veggies-page-button');

displayPageButton.addEventListener('click', (event) => {
    let id = event.target.databaseId
    // change HTML files (from index to display_food.html)
    window.location.href = "./display_veggies"
})