const getCars = () => {
    let cars = [];
    const storedCars = localStorage.getItem('cars');
    if (storedCars) {
        cars = JSON.parse(storedCars);
    }
    return cars;
}

const AddToCart = async(id) => {
    console.log(id);
    const res = await fetch('cars.JSON');
    const data = await res.json();

    let cars = getCars(),
        flag = 0,
        gate = 0,
        carObj;
    for (const items of data) {
        if (items.id === id) {
            carObj = items;
            flag = 1;
            break;
        }
    }
    for (const items of cars) {
        if (items.id === id) {
            gate = 1;
            break;
        }
    }

    if (flag === 1 && gate === 0) {
        cars.push(carObj);
    }
    localStorage.setItem('cars', JSON.stringify(cars));
};

const DeleteFromCart = async(id) => {
    console.log(id);

    let cart = getCars(),
        flag = 0,
        newCart = [];
    for (const items of cart) {
        if (items.id !== id) {
            newCart.push(items);
        }
    }
    localStorage.setItem('cars', JSON.stringify(newCart));
};

const getStarted = () => {
    const url = "cars.JSON";
    fetch(url)
        .then((res) => res.json())
        .then((data) => getData(data));
};
getStarted();

const clearModal = () => {
    const singleModal = document.getElementById('singleDetails');
    singleModal.innerHTML = "";
}


const readMore = async(id) => {

    console.log(id);

    const singleModal = document.getElementById('singleDetails');
    singleModal.innerHTML = "";

    let div = document.createElement('div');
    div.innerHTML = `
    	<button type="button" id="button-33" onClick="clearModal()" class="btn-close fixed-top ms-auto button-33" data-bs-dismiss="modal" aria-label="Close"></button>
    `
    singleModal.appendChild(div);
    const res = await fetch('cars.JSON');
    const data = await res.json();
    let flag = 0,
        newObj;
    for (const items of data) {
        if (items.id === id) {
            flag = 1;
            newObj = items;
            break;
        }
    }

    if (flag === 1) {
        div = document.createElement('div');
        div.innerHTML = `
        <div class="card text-center">
        <img class="img-fluid mx-auto" width="500px" src="${newObj.img}" alt="Card image cap">
        <div class="card-body">
            <h5 class="card-title">${newObj.name}</h5>
            <p class="card-text"><span>${newObj.ElectricMotor}
            </span>
            </p>
            <p class="card-text"><span>${newObj.Transmission}
            </span>
            </p>
            <p class="card-text"><span>${newObj.Battery}
            </span>
            </p>
        </div>
        </div>
        `

        singleModal.appendChild(div);
    }
}

const getData = (data) => {
    console.log(data);
    const carsDom = document.getElementById("cars-dom");

    data.map((items) => {
        let div = document.createElement("div");
        div.classList.add("cars-div");
        div.innerHTML = `
    <div class="card justify-content-center h-100" id="cus-card">
          <div class="card-body">
              <h3 class="card-div">${items.name}</h3>
              <div class="card-img-div">
                <img class="img-fluid" src=${items.img}></img>
              </div>
              <h5 class="mt-3">Price: $<span>${items.price}</span></h5>
              <button class="button-33 my-2" type="button" onclick="AddToCart(${items.id})">Add To Cart</button>
              <button type="button" onClick="readMore(${items.id})" class="button-33" data-bs-toggle="modal" data-bs-target="#singleDetails">Show Specifications</button>
          </div>
    </div>
    `;
        carsDom.appendChild(div);
    });
};

const EventClear = () => {
    localStorage.removeItem('cars');
}

const cartItems = () => {
    const cart = getCars();
    const cartDom = document.getElementById('cart');
    const cartCost = document.getElementById('cart-cost');
    const emptyCart = document.getElementById('empty-cart');
    emptyCart.innerHTML = "";
    let totalCost = 0,
        cost = 0,
        tax = 0,
        shipping = 0;
    if (cart.length !== 0) {
        cart.map((items) => {
            let div = document.createElement("div");
            tax += ((30 / 100) * items.price);
            cost += items.price;
            shipping += cart.length * 5000;
            div.classList.add("cars-div");
            div.innerHTML = `
        <div class="card justify-content-center text-center h-100" id="cus-card">
        <div class="card-body">
            <h3 class="card-div">${items.name}</h3>
            <div class="card-img-div">
              <img class="img-fluid" src=${items.img}></img>
            </div>
            <h5 class="mt-3">Price: $<span>${items.price}</span></h5>
            <button class="button-33" type="button" onclick="DeleteFromCart(${items.id})">Remove From Cart</button>
        </div>
        </div>
  `;
            cartDom.appendChild(div);
        });
        totalCost += cost + tax + shipping;
        let div1 = document.createElement('div');
        div1.innerHTML = `
          <div class='text-center my-5'>
          <h3>Total Cars Cost: $<span>${cost}</span></h3>
          <h3>Tax: $<span>${tax}</span></h3>
          <h3>Shipping: $<span>${shipping}</span></h3>
          <h3>Total Cost: $<span>${totalCost}</span></h3>
          <button class="button-2" onClick="EventClear()">Clear Cart</button>
          </div>
        `
        cartCost.appendChild(div1);
    }
    else{
        let div = document.createElement("div");
        div.innerHTML = `
            <h1 class="text-center text-danger">Looks Like Cart Is Empty :(</h1>
        `
        emptyCart.appendChild(div);
    }
}

cartItems();