document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('userForm');
    const successMessage = document.getElementById('successMessage');
    const resetBtn = document.getElementById('resetBtn');
    const inputs = form.querySelectorAll('input');

    // Real-time validation feedback
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            const errorSpan = document.getElementById(`${input.id}Error`);
            if (input.validity.valid) {
                errorSpan.textContent = '';
                input.style.borderColor = '#27ae60';
            } else {
                if (input.validity.valueMissing) {
                    errorSpan.textContent = `${input.labels[0].textContent} is required.`;
                } else if (input.validity.patternMismatch) {
                    errorSpan.textContent = 'Please enter a valid 10-digit mobile number.';
                } else {
                    errorSpan.textContent = 'Invalid input.';
                }
                input.style.borderColor = '#e74c3c';
            }
        });

        input.addEventListener('blur', () => {
            if (!input.value) {
                input.style.borderColor = '#e1e8ed';
            }
        });
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        inputs.forEach(input => {
            const errorSpan = document.getElementById(`${input.id}Error`);
            if (!input.validity.valid) {
                isValid = false;
                if (input.validity.valueMissing) {
                    errorSpan.textContent = `${input.labels[0].textContent} is required.`;
                } else if (input.validity.patternMismatch) {
                    errorSpan.textContent = 'Please enter a valid 10-digit mobile number.';
                }
                input.style.borderColor = '#e74c3c';
            } else {
                errorSpan.textContent = '';
                input.style.borderColor = '#27ae60';
            }
        });

        if (isValid) {
            // Simulate form submission
            const formData = {
                firstName: document.getElementById('firstName').value.trim(),
                surname: document.getElementById('surname').value.trim(),
                mobile: document.getElementById('mobile').value.trim()
            };
            console.log('Form submitted:', formData);
            // In a real app, you would send this data to a server
            form.classList.add('hidden');
            successMessage.classList.remove('hidden');
        }
    });

    resetBtn.addEventListener('click', () => {
        form.reset();
        inputs.forEach(input => {
            input.style.borderColor = '#e1e8ed';
            const errorSpan = document.getElementById(`${input.id}Error`);
            if (errorSpan) errorSpan.textContent = '';
        });
        successMessage.classList.add('hidden');
        form.classList.remove('hidden');
    });
});