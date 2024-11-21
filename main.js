//weather API Key

const weatherAPIKey ='8df44410b3e213b8989470b7690eb8de';
const weatherAPIURL = `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}&units=metric`

//Gallery Image

// <img src="./assets/gallery/image1.jpg" alt="image 1" />

const galleryImages = [
    {
        src : "./assets/gallery/image1.jpg",
        alt: "image 1"
    },

    {
        src : "./assets/gallery/image2.jpg",
        alt: "image 2"
    },

    {
        src : "./assets/gallery/image3.jpg",
        alt: "image 3"
    }
];

const products = [
    {
      title: "AstroFiction",
      author: "John Doe",
      price: 49.9,
      image: "./assets/products/img6.png"
    },
    {
      title: "Space Odissey",
      author: "Marie Anne",
      price: 35,
      image: "./assets/products/img1.png"
    },
    {
      title: "Doomed City",
      author: "Jason Cobert",
      price: 0,
      image: "./assets/products/img2.png"
    },
    {
      title: "Black Dog",
      author: "John Doe",
      price: 85.35,
      image: "./assets/products/img3.png"
    },
    {
      title: "My Little Robot",
      author: "Pedro Paulo",
      price: 0,
      image: "./assets/products/img5.png"
    },
    {
      title: "Garden Girl",
      author: "Ankit Patel",
      price: 45,
      image: "./assets/products/img4.png"
    }
  ]

// for(let i in galleryImages){
// console.log(galleryImages[i]);
// }


//menu Section

function menuHandler(){

    document.querySelector("#open-nav-menu").addEventListener("click", function() {
        document.querySelector("header nav .wrapper").classList.add("nav-open")
    })    
    
    document.querySelector("#close-nav-menu").addEventListener("click", function() {
        document.querySelector("header nav .wrapper").classList.remove("nav-open")
    })
}


//Temperature conversion
function celsiusToFahr(temperature) {
    let fahr = (temperature * 9/5) + 32;
    return fahr;
  }

  //celsiusToFahr()

//Greeting section

function greetingHandler() {
  let currentHour = new Date().getHours();
  let greetingText;

  if (currentHour < 12) {
    greetingText = "Good Morning!";
  } else if (currentHour < 19) {
    greetingText = "Good Afternoon!";
  } else if (currentHour < 24) {
    greetingText = "Good Evening";
  } else {
    greetingText = "Welcome!";
  }

  document.querySelector("#greeting").innerHTML = greetingText;


}

//Local Time Section

function clockHandler(){
    setInterval(function () {
        let localTime = new Date();
        document.querySelector("span[data-time=hours]").textContent = localTime.getHours().toString().padStart(2,"0");
        document.querySelector("span[data-time=minutes]").textContent = localTime.getMinutes().toString().padStart(2,"0");
        document.querySelector("span[data-time=seconds]").textContent = localTime.getSeconds().toString().padStart(2,"0");
      }, 1000);
}


//Gallery Section

function galleryHandler(){

    let mainImage = document.querySelector('#gallery > img');
    let thumbNails = document.querySelector('#gallery .thumbnails')
    
    mainImage.src = galleryImages[0].src;
    mainImage.alt = galleryImages[0].alt;    
    
    //<img src="./assets/gallery/image1.jpg" 
    //alt="Thumbnail Image 1" 
    //data-array-index="0" data-selected="true">
    
    galleryImages.forEach(function(image, index){
        let thumb = document.createElement("img")
        thumb.src = image.src;
        thumb.alt = image.alt;
        thumb.dataset.arrayIndex = index;  //data-array-index="0"
        thumb.dataset.selected = index === 0 ? true : false ;  //data-selected="true" 
    
        thumb.addEventListener('click', function(e){
        let selectedIndex = e.target.dataset.arrayIndex;
        let selectedImage = galleryImages[selectedIndex]
    
        mainImage.src = selectedImage.src;
        mainImage.alt = selectedImage.alt;
    
        thumbNails.querySelectorAll('img').forEach(function(img){
            img.dataset.selected = false;
        });
    
        e.target.dataset.selected = true;
    
        })
        thumbNails.appendChild(thumb)
    })
}

//weather text

function weatherHandler(){
    navigator.geolocation.getCurrentPosition( position => { 
       // console.log(position);
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        let url = weatherAPIURL
        .replace('{lat}',latitude)
        .replace('{lon}',longitude)
        .replace('{API key}',weatherAPIKey);
       fetch(url)
       .then(response => response.json())
       .then(data => {
        //console.log(data);
        const condition = data.weather[0].description;
        const location = data.name;
        const temperature = data.main.temp;
       // console.log(condition, location, temperature);
    
       let celsiusText = `The weather is ${condition} in ${location} and it's ${temperature.toFixed(1)} °C outside.`;
       let fahrText = `The weather is ${condition} in ${location} and it's ${celsiusToFahr(temperature).toFixed(1)}°F outside.`;
     
     
      
       document.querySelector("p#weather").innerHTML = celsiusText;
       document.querySelector(".weather-group").addEventListener("click", function (e) {
           if (e.target.id == "celsius") {
            
            document.querySelector("p#weather").innerHTML = celsiusText;
           } else if (e.target.id == "fahr") {
            
             document.querySelector("p#weather").innerHTML = fahrText;
           }
         });
       }).catch(err => {
        document.querySelector("p#weather").innerHTML = 'Unable to get the weather info. Try again later.';
       });
    })
    }
    

//Product Area

/*<div class="product-item">
<img src="./assets/products/img6.png" alt="AstroFiction">
<div class="product-details">
  <h3 class="product-title">AstroFiction</h3>
  <p class="product-author">John Doe</p>
  <p class="price-title">Price</p>
  <p class="product-price">$ 49.90</p>
</div>
</div>*/

function populateProducts(productList){

    let productsSection = document.querySelector('.products-area');
    productsSection.textContent = ''; //1st erase everything inside then creates items(helps for toggle between all, paid, free)

    //Run a loop through the products and create an HTML element (product-item) for each of them
    productList.forEach(function(product, index){
       
        //create HTML for individual product
        let productElm = document.createElement("div");
        productElm.classList.add("product-item");
       
        //create the product img
        let productImage = document.createElement("img");
        productImage.src = product.image;
        productImage.alt = "Image for " + product.title;

        //Create product details section
        let productDetails = document.createElement("div");
        productDetails.classList.add("product-details")

        //Create product title, author, price-title and price
       //for product Title in h3
        let productTitle = document.createElement("h3");
        productTitle.classList.add("product-title");
        productTitle.textContent = product.title; //textContent is Same as using innerHTML

        //for product auther in p
        let productAuthod = document.createElement('p');
        productAuthod.classList.add("product-author");
        productAuthod.textContent = product.author;

        //for product price-title in p
        let productPracticeTitle = document.createElement('p');
        productPracticeTitle.classList.add('price-title');
        productPracticeTitle.textContent = "Price"

        //for product price in p
        let productPrice = document.createElement('p');
        productPrice.classList.add('product-price');
        productPrice.textContent = product.price > 0 ? '$' + product.price.toFixed(2) : 'Free';

        //Append the product details
        productDetails.append(productTitle);
        productDetails.append(productAuthod);
        productDetails.append(productPracticeTitle);
        productDetails.append(productPrice);

        //Add all the child HTML elements of the product
        productElm.append(productImage);
        productElm.append(productDetails);

        //Add complete individual product to the product section
        productsSection.append(productElm);
       
    });

}

function productHandler(){
    //arror function
    let freeProducts = products.filter(item => !item.price || item.price <= 0); //no item or item is less than 0 is free
    //normal function
    let paidProducts = products.filter(function(item){
        return item.price > 0;
    })

    //console.log('free', freeProducts);
    //console.log('paid', paidProducts);

    populateProducts(products);    
    //to show number of products in all, paid, free
   // let totleProducts = products.length; // to find number of products
    document.querySelector(".products-filter label[for=all] span.product-amount").textContent = products.length;
    document.querySelector(".products-filter label[for=paid] span.product-amount").textContent = paidProducts.length;
    document.querySelector(".products-filter label[for=free] span.product-amount").textContent = freeProducts.length;
    
    //click handler
    let productsFilter = document.querySelector('.products-filter')
    productsFilter.addEventListener('click', function(e){
        if(e.target.id === 'all'){
            populateProducts(products);
        } else if(e.target.id === 'paid'){
            populateProducts(paidProducts);
        }
        else if(e.target.id === 'free'){
            populateProducts(freeProducts);
        }

    })
}

function footerHandler(){
    let currentYear = new Date().getFullYear()
    document.querySelector('footer').textContent = `© ${currentYear} - All rights reserved`
}


//Page Load
menuHandler();
greetingHandler();
weatherHandler();
clockHandler();
galleryHandler();
productHandler();
footerHandler();
