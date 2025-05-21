function addPetIds(){
    const petSelect = document.getElementById('petId');

    petSelect.innerHTML = '<option value="">Select a Pet</option>'

    pets.forEach(pet => {
        const option = document.createElement('option');
        option.value = pet.id;
        option.textContent = `${pet.name}(${pet.type})`;
        petSelect.appendChild(option);
    });
}

function getelements(){
    const elements = [
        document.getElementById('fullName'),
        document.getElementById('email'),
        document.getElementById('phone'),
        document.getElementById('address'),
        document.getElementById('petId'),
        document.getElementById('reason'),
    ];
    return elements;
}

function showError(element, message) {
    element.className = 'error';
    const msg = element.parentElement.querySelector('small');
    msg.textContent = message;
}

function showSuccess(element) {
    element.className = 'success';
    const msg = element.parentElement.querySelector('small');
    msg.textContent = '';
}

function checkEmpty(element) {
    if (element.value.trim() === '') {
        showError(element, 'This field is required.');
        return false;
    } else {
        showSuccess(element);
        return true;
    }
}

function checkPhone(element) {
    if (!/^\+?\d{10,15}$/.test(element.value.trim().replace(/\D/g, ''))) {
        showError(element, 'Please enter a valid phone number.');
        return false;
    } else {
        showSuccess(element);
        return true;
    }
}

function checkMail(element) {
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(element.value.trim())) {
        showError(element, 'Enter a valid email address.');
        return false;
    } else {
        showSuccess(element);
        return true;
    }
}

const form = document.getElementById('adoptionForm');

form?.addEventListener('submit', (e) => {
    e.preventDefault();

    elements = getelements();
    let isValid = true;

    for (let element of elements) {
        isValid = checkEmpty(element) && isValid;
    }

    isValid = checkMail(elements[1]) && isValid;
    isValid = checkPhone(elements[2]) && isValid;

    if (isValid) {
        // Simulate form submission
        alert('Thank you for your adoption application! We will review it and contact you soon.');
        form.reset();
    }
});

form?.addEventListener('reset', (e) => {
    const elements = getelements();
    for (let element of elements) {
        element.className = '';
        const msg = element.parentElement.querySelector('small');
        msg.textContent = '';
    }
});

{
    const elements = getelements();
    elements.forEach(element => {
        element.addEventListener('blur', () => {
            checkEmpty(element);
            if (element.id === 'email') {
                checkMail(element);
            }
            if (element.id === 'phone') {
                checkPhone(element);
            }
        });
    });
}

// Preselect pet based on query parameter
document.addEventListener('DOMContentLoaded', () => {
    addPetIds()
    const urlParams = new URLSearchParams(window.location.search);
    const petId = urlParams.get('petId');
    if (petId) {
        const petSelect = document.getElementById('petId');
        petSelect.value = petId;
    }
});