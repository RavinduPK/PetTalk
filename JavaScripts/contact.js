function getContactElements() {
    return [
        document.getElementById('name'),
        document.getElementById('email'),
        document.getElementById('subject'),
        document.getElementById('message')
    ];
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

    const elements = getContactElements();
    let isValid = true;

    for (let element of elements) {
        isValid = checkEmpty(element) && isValid;
    }

    isValid = checkMail(elements[1]) && isValid;

    if (isValid) {
        alert('Thank you for your message! We will get back to you soon.');
        form.reset();
    }
});

form?.addEventListener('reset', () => {
    const elements = getContactElements();
    for (let element of elements) {
        element.className = '';
        const msg = element.parentElement.querySelector('small');
        msg.textContent = '';
    }
});

{
    const elements = getContactElements();
    elements.forEach(element => {
        element.addEventListener('blur', () => {
            checkEmpty(element);
            if (element.id === 'email') {
                checkMail(element);
            }
        });
    });
}