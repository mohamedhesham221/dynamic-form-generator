# Dynamic Form Generator

A dynamic form generator that creates and validates 20 different input fields using vanilla JavaScript. The form is built with a centralized configuration system that makes it easy to add, modify, or remove fields and their validation rules.

## Features

- 🎯 20 different input fields with various types
- ✅ Centralized validation system
- 🔄 Dynamic field generation
- 📱 Responsive design
- 🎨 Clean and modern UI
- ⚡ Real-time validation
- 📝 Easy to maintain and extend

## Live Preview

[https://dynamic-form-generator-hazel.vercel.app/](https://dynamic-form-generator-hazel.vercel.app/)

## Project Structure

```
form-generator/
├── assets/
│   ├── css/
│   │   └── styles.css    # Form styling
│   └── js/
│       └── script.js     # Form logic and validation
└── index.html            # Main HTML file
```

## Setup

1. Clone or download this repository
2. Open `index.html` in your web browser
3. No additional dependencies or installation required

## Usage

The form includes the following fields:

- Name (text, required, min 2 chars)
- Email (email, required, valid format)
- Age (number, required, 18-99 years)
- Phone (tel, required, accepts formats: 1234567890, 123-456-7890, (123) 456-7890, +1 123-456-7890)
- Address (text, required)
- City (text, required, letters and spaces only)
- State (text, required, letters and spaces only)
- Zip Code (text, required, 5 digits)
- Country (text, required, letters and spaces only)
- Username (text, required, min 4 chars)
- Password (password, required, min 8 chars)
- Confirm Password (password, required, must match Password)
- Date of Birth (date, required)
- Gender (select, required, options: Male/Female)
- Occupation (text, required, letters and spaces only)
- Company (text, required)
- Website (url, valid URL format)
- Bio (textarea, max 200 chars)
- Newsletter Subscription (checkbox)
- Terms Agreement (checkbox, required)

## Adding New Fields

To add a new field, simply add a new object to the `fieldsConfig` array in `script.js`:

```javascript
{
    name: "fieldName",
    label: "Field Label",
    type: "text", // or any HTML input type
    rules: {
        required: true,
        minLength: 2,
        // other validation rules
    }
}
```

## Validation Rules

Available validation rules:

- `required`: Field must not be empty
- `minLength`: Minimum character length
- `maxLength`: Maximum character length
- `min`: Minimum value (for numbers)
- `max`: Maximum value (for numbers)
- `pattern`: Regular expression pattern
