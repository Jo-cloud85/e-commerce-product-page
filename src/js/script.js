function plusMinusToggle(e, subMenuId) {
	const subMenu = document.getElementById(subMenuId);
	let toggleSign = e.querySelector('.plusminus');
	toggleSign.classList.toggle('active');

	if (toggleSign.classList.contains('active')) {
		subMenu.style.display = 'grid';
	} else {
		subMenu.style.display ='none';
	}
}


const bgOverlay = document.querySelector('.bg-overlay');

// Menu Toggle only for mobile and tablet
const menuToggle = document.querySelector('.menu-hamburger-toggle');
const navOthers = document.querySelector('.main-navLinks--others');
const companyLogoMobile = document.querySelector('#company-logo--side--mobile-only');
const cartLink = document.querySelector('.main-navLinks--cart');

menuToggle.addEventListener('click', () => {
	const visibility = navOthers.getAttribute('data-visible');
	if (visibility === "false") {
		navOthers.setAttribute('data-visible', true);
		menuToggle.setAttribute('aria-expanded', true);
		menuToggle.classList.remove('hidden');
		bgOverlay.style.display = "block";
		companyLogoMobile.style.display = "block";
		cartLink.style.display = "none";

		bgOverlay.addEventListener('click', () => {
			navOthers.setAttribute('data-visible', false);
			menuToggle.setAttribute('aria-expanded', false);
			menuToggle.classList.add('hidden');
			bgOverlay.style.display = 'none';
			companyLogoMobile.style.display = "none";
			cartLink.style.display = "block";
		})
	} else {
		navOthers.setAttribute('data-visible', false);
		menuToggle.setAttribute('aria-expanded', false);
		menuToggle.classList.add('hidden');
		bgOverlay.style.display = 'none';
		companyLogoMobile.style.display = "none";
		cartLink.style.display = "block";
	};
})

// Search Toggle only for desktop
const searchBtn = document.querySelector('#search'); // the search icon
const searchFloat = document.querySelector('#search-float');
const closeBtn = document.querySelector('.close-btn');

searchBtn.addEventListener('click', () => {
	searchFloat.style.display = 'flex';
	if (getComputedStyle(closeBtn).display === 'block') {
		closeBtn.addEventListener('click', () => {
			searchFloat.style.display = 'none';
			closeBtn.style.display = 'none'; //still has issues---------------------
		});
	} else if (getComputedStyle(closeBtn).display === 'none') {
		searchFloat.style.display = 'flex';
	}
})

// Original price strike when sale-price available
const priceGrps = document.querySelectorAll('.price-grp');

for (let i=0; i<priceGrps.length; i++) {
	const originalPrice = priceGrps[i].querySelector('.original-price');
	const salePrice = priceGrps[i].querySelector('.sale-price');
	if (salePrice.innerHTML !== "") {
		originalPrice.style.textDecoration = 'line-through';
	}
}

//trigger open & close 
const triggerOpen = document.querySelectorAll('[trigger-button]');
const triggerClose = document.querySelectorAll ('[close-button]');
const overlay = document.querySelector('[data-overlay]');

for (let i=0; i<triggerOpen.length; i++) {
	let currentId = triggerOpen[i].dataset.target,
		targetEl = document.querySelector(`#${currentId}`)

	const openData = function() {
		targetEl.classList.remove('active');
		overlay.classList.remove('active');
	};

	triggerOpen[i].addEventListener('click', function() {
		targetEl.classList.add('active');
		overlay.classList.add('active');
	});

	targetEl.querySelector('[close-button]').addEventListener('click', openData);
	overlay.addEventListener('click', openData);
}



// Changing quantities in cart ----------------------------------------------------
// Increase or decrease quantity of cart item
const qtyEl = document.querySelector('.qty');
const itemQtyEl = qtyEl.querySelector('.item-qty');
const headerCartNumEl = document.querySelector('.cart-item-num');
const decreaseBtn = document.querySelector('.decrease');
const increaseBtn = document.querySelector('.increase');
const addCartBtn = document.querySelector('.addcart-btn');
let itemQty = parseInt(itemQtyEl.textContent);

const qtyControlEl = document.querySelector('.control');
const controlItemQtyEl = qtyControlEl.querySelector('.item-qty');
const cDecreaseBtn = document.querySelector('.control-decrease');
const cIncreaseBtn = document.querySelector('.control-increase');
let controlItemQty = parseInt(controlItemQtyEl.textContent);

const totalEl = document.querySelector('.cart-footer .total .value');
const itemPriceEl = document.querySelector('.cart-body .price');
const freeShippingEl = document.querySelector('#free-shipping .value');
const flatShippingEl = document.querySelector('#flat-shipping .value');


function changeQty(changeType) {
    if (changeType === 'increase') {
        itemQty++;
    } else if (changeType === 'decrease') {
        if (itemQty > 0) {
            itemQty--;
        } else {
            itemQty = 0; // set score to 0 if it's already at 0
        }
    }

	itemQtyEl.textContent = itemQty;
};

function changeControlQty(changeType) {
    if (changeType === 'increase') {
        controlItemQty = itemQty ++;
    } else if (changeType === 'decrease') {
        if (controlItemQty > 0) {
            controlItemQty = itemQty --;
        } else {
            controlItemQty = 0; // set score to 0 if it's already at 0
        }
    }

	controlItemQtyEl.textContent = controlItemQty;
};

// Update quantity of cart item on header cart ONLY when user clicks add to cart
function updateQtyAtHeader(headerCartNumEl, qty) {
	headerCartNumEl.textContent = qty;
};

// Update quantity of cart item on floating cart menu ONLY when user clicks add to cart
function updateQtyAtFloatCart(floatCartNumEl, qty) {
	floatCartNumEl.textContent = qty;
};

decreaseBtn.addEventListener('click', () => {
	changeQty('decrease');
	updateTotal(itemQty);
})

increaseBtn.addEventListener('click', () => {
	changeQty('increase');
	updateTotal(itemQty);
})

addCartBtn.addEventListener('click', () => {
	updateQtyAtHeader(headerCartNumEl, itemQty);
	updateQtyAtFloatCart(controlItemQtyEl, itemQty);
})

cDecreaseBtn.addEventListener('click', () => {
	changeControlQty('decrease');
	updateQtyAtHeader(headerCartNumEl, controlItemQty);
	updateTotal(controlItemQty);
})

cIncreaseBtn.addEventListener('click', () => {
	changeControlQty('increase');
	updateQtyAtHeader(headerCartNumEl, controlItemQty);
	updateTotal(controlItemQty);
})

//Update total
function updateTotal(totalQty){
	const currTotalSum = (itemPriceEl.textContent.replace('$', ''));
	const finalTotalSum = (currTotalSum*totalQty).toFixed(2);
	freeShippingEl.innerHTML = `$${finalTotalSum}`;
	flatShippingEl.innerHTML = `$${finalTotalSum}`;
	totalEl.innerHTML = `$${finalTotalSum}`;
}


//tabbed ------------------------------------------------------
const trigger = document.querySelectorAll('.tabbed-trigger');
const content = document.querySelectorAll('.tabbed > div');
trigger.forEach((btn) => {
	btn.addEventListener('click', function() {
		let dataTarget = this.dataset.id,
			body =  document.querySelector(`#${dataTarget}`);
		trigger.forEach ((b) => b.parentNode.classList.remove('active'));
		content.forEach ((s) => s.classList.remove('active'));
		this.parentNode.classList.add('active');
		body.classList.add('active');
	});
})


// All Sliders -------------------------------------------------
// Slider javascript adjusted from from Swiper.js documentation
// product image > page-single
const thumbnailImg = new Swiper('.thumbnail-image', {
	
	direction: 'vertical',
	spaceBetween: 10,
	slidesperView: 1,
	freeMode: true,
	watchSlidesProgress: true,
});

const mainImg = new Swiper('.main-image', {
	
	loop: true,
	autoHeight: true,

	pagination: {
		el: '.swiper-pagination',
		clickable: true,
	},

	thumbs: {
		swiper: thumbnailImg,
	}

});