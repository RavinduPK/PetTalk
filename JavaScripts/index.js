let currentIndex = 0;

function removePetCard(cardElement) {
  cardElement.classList.add('fade-out');
  setTimeout(() => {
    cardElement.remove();
  }, 1100); // Match the animation duration
}

function getVisiblePets(carousel) {
    let noOfCards = 3;
    if (carousel.offsetWidth < 600) {
        noOfCards = 2;
    }
    if (carousel.offsetWidth < 380) {
        noOfCards = 1;
    }
    let array = [];
    for (let i = 0; i < noOfCards; i++) {
        array.push(pets[(currentIndex + i) % pets.length]);
    }
    return array;
}

function displayCarousel() {
    const carousel = document.getElementById('petCarousel');
    carousel.querySelectorAll('*').forEach(child => {
        removePetCard(child);
    });
    // removePetCard(carousel);
    carousel.innerHTML = '';

    // Display three pets at a time
    const visiblePets = getVisiblePets(carousel);

    visiblePets.forEach(pet => {
        const petCard = document.createElement('div');
        petCard.classList.add('pet-card');
        petCard.innerHTML = `
            <img src="${pet.image}" alt="${pet.name}">
            <div class="pet-details">
                <h3>${pet.name}</h3>
                <p>Type: ${pet.type}</p>
                <p>Age: ${pet.age}</p>
                <a href="details.html?petName=${pet.name}" class="btn btn-spaced">View Details</a>
            </div>
        `;
        carousel.appendChild(petCard);
    });
}

function moveCarousel(direction) {
    currentIndex = (currentIndex + direction + pets.length) % pets.length;
    displayCarousel();
}

// Newsletter form handling
document.getElementById('newsletterForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('emailInput').value;
    if (email) {
        alert('Thank you for subscribing!');
        document.getElementById('newsletterForm').reset();
    }
});

setInterval(() => moveCarousel(1), 10000);

// Load carousel on page load
document.addEventListener('DOMContentLoaded', displayCarousel);