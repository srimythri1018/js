function getMenu() {
    fetch(
        "https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json"
    )
        .then((response) => response.json())
        .then((data) => {
            const menuContainer = document.getElementById("menu");
            data.items.forEach((item) => {
                // Accessing the 'items' array in the JSON
                const menuItem = document.createElement("div");
                menuItem.classList.add("menu-item");
                menuItem.innerHTML = `
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <p>Price: $${item.price}</p>
          `;
                menuContainer.appendChild(menuItem);
            });
        })
        .catch((error) => console.log(error));
}

function takeOrder() {
    return new Promise((resolve) => {
        setTimeout(() => {
            const burgers = [
                "Classic Burger",
                "Cheese burger",
                "Chicken Tikka Burger",
                "Crispy Veg Burger",
                "Crispy chicken burger",
            ];
            const order = {
                burger1: burgers[Math.floor(Math.random() * burgers.length)],
                burger2: burgers[Math.floor(Math.random() * burgers.length)],
                burger3: burgers[Math.floor(Math.random() * burgers.length)],
            };
            resolve(order);
        }, 2500);
    });
}

function orderPrep() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ order_status: true, paid: false });
        }, 1500);
    });
}

function payOrder() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ order_status: true, paid: true });
        }, 1000);
    });
}
function thankyouFnc() {
    alert("Thank you for eating with us today, Have a Great Day");
}

getMenu();

document.getElementById("order-btn").addEventListener("click", () => {
    takeOrder()
        .then((order) => {
            const orderContainer = document.getElementById("order");
            orderContainer.innerHTML = `
          <p>Order:</p>
          <ul>
            <li>${order.burger1}</li>
            <li>${order.burger2}</li>
            <li>${order.burger3}</li>
          </ul>
        `;
            return orderPrep();
        })
        .then((status) => {
            const statusContainer = document.getElementById("status");
            statusContainer.innerHTML = `
          <p>Order status: Preparing...</p>
        `;
            return payOrder();
        })
        .then((status) => {
            const statusContainer = document.getElementById("status");
            statusContainer.innerHTML = `
          <p>Order status: Paid</p>
        `;
            thankyouFnc();
        })
        .catch((error) => console.log(error));
});