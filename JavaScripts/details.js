const PETS_PER_PAGE = 6;
let currentPage = 1;

function displayPets(filteredPets) {
    const petGrid = document.getElementById('petGrid');
    petGrid.innerHTML = '';

    const start = (currentPage - 1) * PETS_PER_PAGE;
    const end = start + PETS_PER_PAGE;
    const paginatedPets = filteredPets.slice(start, end);

    if (paginatedPets.length === 0) {
        petGrid.innerHTML = '<p>No pets match your criteria.</p>';
        return;
    }

    paginatedPets.forEach(pet => {
        const petCard = document.createElement('div');
        petCard.classList.add('pet-card1');
        petCard.innerHTML = `
            <img src="${pet.image}" alt="${pet.name}">
            <h3>${pet.name}</h3>
            <div class="pet-details">
                <p>Type: ${pet.type}</p>
                <p>Age: ${pet.age} Years</p>
                <p>Gender: ${pet.gender}</p>
                <p>Breed: ${pet.breed}</p>
                <p>Features:
                    <ul>
                    <li>${pet.features[0]}</li>
                    <li>${pet.features[1]}</li>
                    <li>${pet.features[2]}</li>
                    </ul>
                </p>
                <a href="adoption.html?petId=${pet.id}" class="btn btn-spaced">Apply to Adopt</a>
            </div>
        `;
        petGrid.appendChild(petCard);
    });

    updatePagination(filteredPets.length);
}

function checkId() {
    const urlParams = new URLSearchParams(window.location.search);
    const serchBar = document.getElementById('searchInput');
    if (urlParams.has('petName')) {
        serchBar.value = urlParams.get('petName');
        return urlParams.get('petName').toLocaleLowerCase();
    }else {
        return serchBar.value.toLowerCase();
    }
}

function filterPets() {
    let search = checkId();
    const type = document.getElementById('typeFilter').value;
    const age = document.getElementById('ageFilter').value;
    const gender = document.getElementById('genderFilter').value;

    let filteredPets = pets;

    if (search) {
        filteredPets = filteredPets.filter(pet => pet.name.toLowerCase().includes(search));
    }

    if (type !== 'all') {
        filteredPets = filteredPets.filter(pet => pet.type === type);
    }

    if (age !== 'all') {
        filteredPets = filteredPets.filter(pet => {
            const ageYears = parseFloat(pet.age);
            if (age === '0-1') return ageYears <= 1;
            if (age === '1-3') return ageYears > 1 && ageYears <= 3;
            if (age === '3+') return ageYears > 3;
            return true;
        });
    }

    if (gender !== 'all') {
        filteredPets = filteredPets.filter(pet => pet.gender === gender);
    }

    displayPets(filteredPets);
}

function updatePagination(totalPets) {
    const totalPages = Math.ceil(totalPets / PETS_PER_PAGE);
    document.getElementById('pageInfo').textContent = `Page ${currentPage} of ${totalPages}`;
    document.getElementById('prevPage').disabled = currentPage === 1;
    document.getElementById('nextPage').disabled = currentPage === totalPages;
}

function filter(){
    currentPage = 1; // Reset to first page on filter
    filterPets();
}

document.getElementById('searchInput').addEventListener('input', filter);
document.getElementById('typeFilter').addEventListener('change', filter);
document.getElementById('ageFilter').addEventListener('change', filter);
document.getElementById('genderFilter').addEventListener('change', filter);

document.getElementById('clearFilters').addEventListener('click', () => {
    document.getElementById('searchInput').value = '';
    document.getElementById('typeFilter').value = 'all';
    document.getElementById('ageFilter').value = 'all';
    document.getElementById('genderFilter').value = 'all';
    currentPage = 1;
    displayPets(pets);
    if (window.location.search) {
        window.location.href = window.location.pathname;
    }
});

document.getElementById('prevPage').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        filterPets();
    }
});

document.getElementById('nextPage').addEventListener('click', () => {
    const totalPages = Math.ceil(pets.length / PETS_PER_PAGE);
    if (currentPage < totalPages) {
        currentPage++;
        filterPets();
    }
});

document.addEventListener('DOMContentLoaded', () => filterPets(pets));