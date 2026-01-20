
//accordion script
const accordion = document.getElementById('accordion');

accordion.addEventListener('click', (event) => {
    const header = event.target.closest('.accordion-header');

    // click outside header
    if (!header) return;

    const item = header.parentElement;
    // console.log('item', item);

    // close other items (single-open)
    accordion.querySelectorAll('.accordion-item').forEach(element => {
    if (element !== item) element.classList.remove('active');
    });

    // toggle current item
    item.classList.toggle('active');
});
//accordion script end

//carousel script
const slides = document.querySelectorAll('.carousel-slide');
const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');
const thumbnails = document.querySelectorAll('.thumbnail-tab');
const dotsContainer = document.querySelector('.carousel-dots');

let currentIndex = 0;

/* Create dots dynamically */
slides.forEach((_, index) => {
    const dot = document.createElement('div'); 
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => changeSlide(index));
    //console.log('dot', dot);
    dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.dot');

//showing slide based on index
function changeSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    thumbnails.forEach(thumb => thumb.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    slides[index].classList.add('active');
    thumbnails[index].classList.add('active');
    dots[index].classList.add('active');

    currentIndex = index;
}

//arrow button event listeners
rightArrow.addEventListener('click', () => {
    let index = currentIndex + 1;
    if (index >= slides.length) index = 0;
    changeSlide(index);
});
leftArrow.addEventListener('click', () => {
    let index = currentIndex - 1;
    if (index < 0) index = slides.length - 1;
    changeSlide(index);
});

//thumbnail click event listener
thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', () => {
        changeSlide(index);
    });
});

//carousel script end


//Perfume Cart Script
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('single').checked = true;
    selectSubscription('single');
});

function selectSubscription(type) {
    // Select the radio button
    document.getElementById(type).checked = true;
    
    // Hide other subscription details
    const allDetails = document.querySelectorAll('.subscription-details');
    allDetails.forEach(detail => {
        detail.classList.remove('active');
    });

    // Show selected subscription details
    document.getElementById(type + '-details').classList.add('active');
    //updateAddToCartLink();
}

//add to cart link update logic can be added here
function updateAddToCartLink() {
    // Implementation for updating the Add to Cart link based on selections
    const subscriptionType = document.querySelector('input[name="subscription"]:checked').value; // Get selected subscription type
    //console.log('Selected Subscription:', subscriptionType);
    let selectedFragrances = '';
    // let cartUrl = 'cart.html?subscription=' + subscriptionType;
    let cartUrl = `cartItems.html?subscription=${subscriptionType}`;

    if (subscriptionType === 'single') {
        const fragrance = document.querySelector('input[name="fragrance"]:checked').value;
        selectedFragrances = fragrance;
        cartUrl += `&fragrance=${fragrance}`;
        //console.log('Selected Fragrance:', fragrance);
    } else if (subscriptionType === 'double') {
        const fragrance1 = document.querySelector('input[name="fragrance1"]:checked').value;
        const fragrance2 = document.querySelector('input[name="fragrance2"]:checked').value;
        selectedFragrances = `${fragrance1} + ${fragrance2}`;
        cartUrl += `&fragrance1=${fragrance1}&fragrance2=${fragrance2}`;
        
        //console.log('Selected Fragrances:', selectedFragrances);
    } 

    //console.log(`Cart URL: ${cartUrl}`);
    const addToCartBtn = document.querySelector('.add-to-cart-btn');
    addToCartBtn.href = cartUrl;
}

//perfume cart script end



// Percentage Animation Script
function animateNumber() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const duration = 1000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            stat.textContent = Math.floor(current) + '%';
        }, 16);
    });
}

// Setup with Intersection Observer
function scrollAnimation() {
    const percentageSection = document.getElementById('percentage-section');
    let hasAnimated = false;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                animateNumber();
                hasAnimated = true;
            }
        });
    }, { threshold: 0.3 });
    
    if (percentageSection) {
        observer.observe(percentageSection);
    }
}
document.addEventListener('DOMContentLoaded', function() {
    scrollAnimation();
});

//percentage animation script end

// Mobile Menu Script
document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector("header button.hamburger");
  const navBar = document.querySelector("header ul.nav-bar");

  if (!hamburger || !navBar) return;

  hamburger.addEventListener("click", function () {
    if (window.innerWidth < 991) {
      navBar.classList.toggle("is-open");
      hamburger.classList.toggle("is-active");
    }
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth >= 991) {
      navBar.classList.remove("is-open");
      hamburger.classList.remove("is-active");
    }
  });
});