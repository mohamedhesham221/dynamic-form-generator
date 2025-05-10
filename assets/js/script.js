// Field configuration with validation rules
const fieldsConfig = [
  { name: "name", label: "Name", type: "text", rules: { required: true, minLength: 2 } },
  { name: "email", label: "Email", type: "email", rules: { required: true, pattern: /^\S+@\S+$/i } },
  { name: "age", label: "Age", type: "number", rules: { required: true, min: 18, max: 99 } },
  { name: "phone", label: "Phone", type: "tel", rules: { required: true, pattern: /^(\+\d{1,3}[- ]?)?\(?\d{3}\)?[- ]?\d{3}[- ]?\d{4}$/ } },
  { name: "address", label: "Address", type: "text", rules: { required: true } },
  { name: "city", label: "City", type: "text", rules: { required: true, pattern: /^[A-Za-z\s]+$/ } },
  { name: "state", label: "State", type: "text", rules: { required: true, pattern: /^[A-Za-z\s]+$/ } },
  { name: "zip", label: "Zip Code", type: "text", rules: { required: true, pattern: /^\d{5}$/ } },
  { name: "country", label: "Country", type: "text", rules: { required: true, pattern: /^[A-Za-z\s]+$/ } },
  { name: "username", label: "Username", type: "text", rules: { required: true, minLength: 4 } },
  { name: "password", label: "Password", type: "password", rules: { required: true, minLength: 8 } },
  { name: "confirmPassword", label: "Confirm Password", type: "password", rules: { required: true } },
  { name: "dob", label: "Date of Birth", type: "date", rules: { required: true } },
  { name: "gender", label: "Gender", type: "select", options: ["Male", "Female"], rules: { required: true } },
  { name: "occupation", label: "Occupation", type: "text", rules: { required: true, pattern: /^[A-Za-z\s]+$/ } },
  { name: "company", label: "Company", type: "text", rules: { required: true } },
  { name: "website", label: "Website", type: "url", rules: { pattern: /^https?:\/\/.+/ } },
  { name: "bio", label: "Bio", type: "textarea", rules: { maxLength: 200 } },
  { name: "newsletter", label: "Subscribe to newsletter", type: "checkbox", rules: {} },
  { name: "terms", label: "I agree to the terms", type: "checkbox", rules: { required: true } }
];

// Function to create form fields dynamically
function createFormFields() {
  const form = document.getElementById('dynamicForm');

  fieldsConfig.forEach(field => {
    const fieldContainer = document.createElement('div');
    fieldContainer.className = 'form-group';

    const label = document.createElement('label');
    label.htmlFor = field.name;
    label.textContent = field.label;

    let input;
    if (field.type === 'textarea') {
      input = document.createElement('textarea');
      input.placeholder = `Enter your ${field.label.toLowerCase()}`;
    } else if (field.type === 'select') {
      input = document.createElement('select');
      // Add default empty option
      const defaultOption = document.createElement('option');
      defaultOption.value = '';
      defaultOption.textContent = 'Select ' + field.label;
      input.appendChild(defaultOption);
      // Add options from the field configuration
      field.options.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option.toLowerCase();
        optionElement.textContent = option;
        input.appendChild(optionElement);
      });
    } else {
      input = document.createElement('input');
      input.type = field.type;

      // Add appropriate placeholder based on field type
      switch (field.name) {
        case 'name':
          input.placeholder = 'Enter your full name';
          break;
        case 'email':
          input.placeholder = 'example@email.com';
          break;
        case 'age':
          input.placeholder = 'Enter your age (18-99)';
          break;
        case 'phone':
          input.placeholder = '(123) 456-7890';
          break;
        case 'address':
          input.placeholder = 'Enter your street address';
          break;
        case 'city':
          input.placeholder = 'Enter your city name';
          break;
        case 'state':
          input.placeholder = 'Enter your state';
          break;
        case 'zip':
          input.placeholder = 'Enter 5-digit zip code';
          break;
        case 'country':
          input.placeholder = 'Enter your country';
          break;
        case 'username':
          input.placeholder = 'Choose a username (min 4 characters)';
          break;
        case 'password':
          input.placeholder = 'Enter password (min 8 characters)';
          break;
        case 'confirmPassword':
          input.placeholder = 'Confirm your password';
          break;
        case 'dob':
          input.placeholder = 'YYYY-MM-DD';
          break;
        case 'occupation':
          input.placeholder = 'Enter your occupation';
          break;
        case 'company':
          input.placeholder = 'Enter your company name';
          break;
        case 'website':
          input.placeholder = 'https://example.com';
          break;
        case 'bio':
          input.placeholder = 'Tell us about yourself (max 200 characters)';
          break;
        default:
          input.placeholder = `Enter your ${field.label.toLowerCase()}`;
      }
    }

    input.name = field.name;
    input.id = field.name;

    const errorDiv = document.createElement('div');
    errorDiv.className = 'error';
    errorDiv.id = `${field.name}Error`;

    if (field.type === 'checkbox') {
      const checkboxGroup = document.createElement('div');
      checkboxGroup.className = 'checkbox-group';
      checkboxGroup.appendChild(input);
      checkboxGroup.appendChild(label);
      fieldContainer.appendChild(checkboxGroup);
    } else {
      fieldContainer.appendChild(label);
      fieldContainer.appendChild(input);
    }

    fieldContainer.appendChild(errorDiv);
    form.appendChild(fieldContainer);
  });

  // Add submit button
  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.textContent = 'Submit';
  form.appendChild(submitButton);
}

// Validation function
function validateField(field, value) {
  const rules = field.rules;

  if (rules.required && !value) {
    return `${field.label} is required`;
  }

  if (rules.minLength && value.length < rules.minLength) {
    return `${field.label} must be at least ${rules.minLength} characters`;
  }

  if (rules.maxLength && value.length > rules.maxLength) {
    return `${field.label} must be less than ${rules.maxLength} characters`;
  }

  if (rules.min && Number(value) < rules.min) {
    return `${field.label} must be at least ${rules.min}`;
  }

  if (rules.max && Number(value) > rules.max) {
    return `${field.label} must be less than ${rules.max}`;
  }

  if (rules.pattern && !rules.pattern.test(value)) {
    return `${field.label} is invalid`;
  }

  // Check if passwords match
  if (field.name === 'confirmPassword') {
    const password = document.getElementById('password').value;
    if (value !== password) {
      return 'Passwords do not match';
    }
  }

  return '';
}

// Form submission handler
function handleSubmit(event) {
  event.preventDefault();
  let isValid = true;

  fieldsConfig.forEach(field => {
    const input = document.getElementById(field.name);
    const errorDiv = document.getElementById(`${field.name}Error`);
    const value = input.type === 'checkbox' ? input.checked : input.value;

    const error = validateField(field, value);
    errorDiv.textContent = error;

    if (error) {
      isValid = false;
    }
  });

  if (isValid) {
    const formData = {};
    fieldsConfig.forEach(field => {
      const input = document.getElementById(field.name);
      formData[field.name] = input.type === 'checkbox' ? input.checked : input.value;
    });
    console.log('Form submitted:', formData);
    alert('Form submitted successfully!');
  }
}

// Initialize the form when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  createFormFields();
  document.getElementById('dynamicForm').addEventListener('submit', handleSubmit);
}); 