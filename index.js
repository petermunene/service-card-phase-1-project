document.addEventListener("DOMContentLoaded",(e)=>{
    displayBar()
})
function displayBar() {
    const div = document.getElementById("services-bar");

    fetch('https://my-app-backend-hvge.onrender.com/api/services',{
        method:"GET",
        mode: "no-cors"
    })
        .then(res => res.json())
        .then(services => {
            services.forEach(category => {
                // Create a container for the span and table
                const container = document.createElement("div")
                container.classList.add("category-container")
 
                // Create the span for the category
                const span = document.createElement("span")
                span.innerText = category.category
                span.classList.add("category-span")
                container.appendChild(span)

                // Create a table for this category (initially hidden)
                const table = document.createElement("table")
                table.classList.add("service-table")

                // Create a tbody for the table
                const tableBody = document.createElement("tbody")
                table.appendChild(tableBody)

                // Create a list inside the table for services
                const ul = document.createElement("ul")
                ul.classList.add("service-list")
                tableBody.appendChild(ul)

                // Populate the table with services from this category
                category.services.forEach(service => {
                    const li = document.createElement("li")
                    li.innerText = service.name;
                    li.classList.add("service-item")
                    ul.appendChild(li);
                

                // Append the table to the container (directly under span)
                container.appendChild(table);

                // Append the container to the main div
                div.appendChild(container);

                li.addEventListener("mouseover",function displayCard(){
                    const existingCard = document.querySelector("#service-card")
                    existingCard.innerHTML=""

                
                    // Create service card
                    const card = document.createElement("div")
                    card.classList.add("service-card")
                    const form=document.createElement('form')
                    form.classList.add("form")
                    card.appendChild(form)
                
                    // Service Image
                    const image = document.createElement("img")
                    image.src = service.image
                    image.alt = service.name
                    image.classList.add("service-image")
                
                    // Service Name
                    const serviceName = document.createElement("h3")
                    serviceName.innerText = service.name;
                
                    // Service Description
                    const serviceDesc = document.createElement("p")
                    serviceDesc.innerText = service.description;
                
                    // Input Fields
                    const clientNameInput = document.createElement("input")
                    clientNameInput.type = "text"
                    clientNameInput.placeholder = "Enter your name"
                    clientNameInput.required = true
                    clientNameInput.style.backgroundColor=" rgba(255, 255, 0, 0.438)"
                
                    const houseNumberInput = document.createElement("input")
                    houseNumberInput.type = "text"
                    houseNumberInput.placeholder = "Enter your house number"
                    houseNumberInput.required = true
                    
                
                    // Submit Button
                    const requestButton = document.createElement("button")
                    requestButton.type="submit"
                    requestButton.innerText = "Request Service"
                    form.addEventListener("submit", (e) => {
                        e.preventDefault()
                        requestButton.innerText="Requested"
                        if (service.clients.find(client => client.houseNumber === houseNumberInput.value)) {
                            alert("You already made a request")
                            form.reset()
                            return;
                        }
                        const newClient={name:clientNameInput.value,houseNumber:houseNumberInput.value}
                        
                        service.clients.push(newClient)
                        

                        fetch(`https://my-app-backend-hvge.onrender.com/api/services/${category.id}`, {
                            method: "PATCH",
                            mode: "no-cors",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({ services: category.services })
                        })
                        .then(response => response.json())
                        .then(() => {
                            
                            alert("Service request submitted successfully!");
                        })
                
                        // Reset input fields
                        form.reset()
                    })
                   
                
                    // Append elements to the card
                    form.appendChild(image)
                    form.appendChild(serviceName)
                    form.appendChild(serviceDesc)
                    form.appendChild(clientNameInput)
                    form.appendChild(houseNumberInput)
                    form.appendChild(requestButton)
                
                    // Append the card to the body
                    existingCard.appendChild(card)
                }
                
              
                    
                )})
               
            


                
                
            });
            
        })
        .catch(error => console.error("Error fetching services:", error));
}


