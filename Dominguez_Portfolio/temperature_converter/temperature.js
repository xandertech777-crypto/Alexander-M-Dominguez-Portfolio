/* ========================================
   TEMPERATURE CONVERTER APPLICATION
   Interactive tool to convert Celsius <-> Fahrenheit
   with dynamic visuals based on temperature
   ======================================== */

// ========================================
// DOM ELEMENT REFERENCES
// ========================================

/* Get references to input fields for easier access */
const fInput = document.getElementById('fahrenheit');
const cInput = document.getElementById('celsius');

/* Get references to toggle buttons */
const toggleCBtn = document.getElementById('toggleC');
const toggleFBtn = document.getElementById('toggleF');

/* Track which temperature scale is the primary input */
let currentMode = 'C'; // default mode is Celsius first

// ========================================
// TOGGLE BUTTON FUNCTIONS
// ========================================

/**
 * Swap the order of input fields based on selected mode
 * Mode 'C': Celsius input first
 * Mode 'F': Fahrenheit input first
 */
function swapInputOrder() {
    const fGroup = fInput.closest('.input-group');
    const cGroup = cInput.closest('.input-group');
    const card = document.querySelector('.converter-card');
    const equals = card.querySelector('.equals');
    
    if (currentMode === 'C') {
        // Celsius first: reorder elements so Celsius appears first
        card.insertBefore(cGroup, card.querySelector('.temp-status').nextElementSibling);
        card.insertBefore(equals, fGroup);
        card.appendChild(fGroup);
    } else {
        // Fahrenheit first: reorder elements so Fahrenheit appears first
        card.insertBefore(fGroup, card.querySelector('.temp-status').nextElementSibling);
        card.insertBefore(equals, cGroup);
        card.appendChild(cGroup);
    }
}

/**
 * Toggle between Celsius and Fahrenheit primary modes
 * Updates button styles and rearranges input order
 * @param {string} mode - Either 'C' for Celsius or 'F' for Fahrenheit
 */
function toggleMode(mode) {
    currentMode = mode;
    
    /* Update button active states */
    if (mode === 'C') {
        toggleCBtn.classList.add('active');
        toggleFBtn.classList.remove('active');
    } else {
        toggleFBtn.classList.add('active');
        toggleCBtn.classList.remove('active');
    }
    
    /* Swap input order based on selected mode */
    swapInputOrder();
}

/* Add click listeners to toggle buttons */
toggleCBtn.addEventListener('click', () => toggleMode('C'));
toggleFBtn.addEventListener('click', () => toggleMode('F'));

/* Initialize with Celsius mode on page load */
toggleMode('C');

// ========================================
// BACKGROUND COLOR FUNCTIONS
// ========================================

/**
 * Update background gradient based on temperature
 * Creates a visual representation of how hot/cold it is
 * Colors: blue (cold) -> light (cool) -> yellow (warm) -> red (hot)
 * @param {number} tempC - Temperature in Celsius
 */
function updateBackground(tempC) {
    let gradient;
    
    /* No input: use default purple gradient */
    if (isNaN(tempC)) {
        gradient = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    }
    /* Freezing (≤0°C): icy blue gradient */
    else if (tempC <= 0) {
        gradient = 'linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)';
    }
    /* Cool (0-20°C): light blue gradient */
    else if (tempC <= 20) {
        gradient = 'linear-gradient(135deg, #a0c4ff 0%, #cde7ff 100%)';
    }
    /* Warm (20-30°C): yellow/orange gradient */
    else if (tempC <= 30) {
        gradient = 'linear-gradient(135deg, #ffe680 0%, #ffb347 100%)';
    }
    /* Hot (30-40°C): orange/red gradient */
    else if (tempC <= 40) {
        gradient = 'linear-gradient(135deg, #ff9a76 0%, #ff6f69 100%)';
    }
    /* Scorching (>40°C): red/yellow gradient */
    else {
        gradient = 'linear-gradient(135deg, #ff4e50 0%, #f9d423 100%)';
    }

    /* Apply gradient to page background */
    document.body.style.background = gradient;
}

// ========================================
// WEATHER ICON FUNCTIONS
// ========================================

/**
 * Update weather icon based on temperature
 * Shows different icons: snowflake (cold), cloud (cool), sun (warm)
 * @param {number} tempC - Temperature in Celsius
 */
function updateWeatherIcon(tempC) {
    const wrapper = document.querySelector('.weather-icon');
    const icon = wrapper.querySelector('i');
    
    /* Exit if elements don't exist */
    if (!wrapper || !icon) return;

    /* Hide icon if no temperature value */
    if (isNaN(tempC)) {
        wrapper.classList.remove('show');
        updateCardColor(null);
        return;
    }

    /* Show the icon */
    wrapper.classList.add('show');
    
    /* Choose icon and color based on temperature */
    if (tempC <= 0) {
        /* Freezing: snowflake icon, icy blue */
        icon.className = 'bx bx-snowflake';
        wrapper.style.color = '#00c6ff';
        updateCardColor('#00c6ff');
    } else if (tempC <= 20) {
        /* Cool: cloud icon, light blue */
        icon.className = 'bx bx-cloud';
        wrapper.style.color = '#a0c4ff';
        updateCardColor('#a0c4ff');
    } else if (tempC <= 30) {
        /* Warm: sun icon, bright yellow */
        icon.className = 'bx bx-sun';
        wrapper.style.color = '#ffd60a';
        updateCardColor('#ffd60a');
    } else if (tempC <= 40) {
        /* Hot: sun icon, orange */
        icon.className = 'bx bx-sun';
        wrapper.style.color = '#ff9800';
        updateCardColor('#ff9800');
    } else {
        /* Scorching: sun icon, red */
        icon.className = 'bx bx-sun';
        wrapper.style.color = '#ff4e50';
        updateCardColor('#ff4e50');
    }
}

/**
 * Update card shadow color to match weather icon
 * Creates visual cohesion between card and temperature
 * @param {string} color - Hex color for shadow, null for default
 */
function updateCardColor(color) {
    const card = document.querySelector('.converter-card');
    if (!card) return;
    
    /* Use default shadow if no color provided */
    if (!color) {
        card.style.boxShadow = '0 15px 30px rgba(0,0,0,0.25)';
    } else {
        /* Apply colored shadow (color + transparency) */
        card.style.boxShadow = `0 15px 30px ${color}80`;
    }
}

// ========================================
// STATUS TEXT FUNCTIONS
// ========================================

/**
 * Display temperature status text
 * Updates status to: Freezing, Cold, Cool, Normal, Warm, Hot, Scorching
 * @param {number} tempC - Temperature in Celsius
 */
function setStatus(tempC) {
    const statusEl = document.getElementById('tempStatus');
    if (!statusEl) return;
    
    let text = 'Enter a value';
    
    /* Categorize temperature and set appropriate status text */
    if (isNaN(tempC)) {
        text = 'Enter a value';
    } else if (tempC <= 0) {
        text = 'Freezing';
    } else if (tempC <= 10) {
        text = 'Cold';
    } else if (tempC <= 20) {
        text = 'Cool';
    } else if (tempC <= 30) {
        text = 'Normal';
    } else if (tempC <= 40) {
        text = 'Warm';
    } else if (tempC <= 50) {
        text = 'Hot';
    } else {
        text = 'Scorching';
    }
    
    /* Update the displayed status text */
    statusEl.textContent = text;
}

// ========================================
// EVENT LISTENERS FOR INPUT CONVERSION
// ========================================

/**
 * Listen for changes in Fahrenheit input
 * Converts F to Celsius and updates visuals
 */
fInput.addEventListener('input', () => {
    const fValue = parseFloat(fInput.value);
    
    /* If valid number entered */
    if (!isNaN(fValue)) {
        /* Formula: (F - 32) × 5/9 = C */
        const cValue = (fValue - 32) * 5 / 9;
        
        /* Update Celsius field with 2 decimal places */
        cInput.value = cValue.toFixed(2);
        
        /* Update all visual elements based on temperature */
        updateBackground(cValue);
        updateWeatherIcon(cValue);
        setStatus(cValue);
    } else {
        /* Clear Celsius field if Fahrenheit is empty */
        cInput.value = "";
        
        /* Reset all visuals to default */
        updateBackground(NaN);
        updateWeatherIcon(NaN);
        setStatus(NaN);
    }
});

/**
 * Listen for changes in Celsius input
 * Converts C to Fahrenheit and updates visuals
 */
cInput.addEventListener('input', () => {
    const cValue = parseFloat(cInput.value);
    
    /* If valid number entered */
    if (!isNaN(cValue)) {
        /* Formula: (C × 9/5) + 32 = F */
        const fValue = (cValue * 9 / 5) + 32;
        
        /* Update Fahrenheit field with 2 decimal places */
        fInput.value = fValue.toFixed(2);
        
        /* Update all visual elements based on temperature */
        updateBackground(cValue);
        updateWeatherIcon(cValue);
        setStatus(cValue);
    } else {
        /* Clear Fahrenheit field if Celsius is empty */
        fInput.value = "";
        
        /* Reset all visuals to default */
        updateBackground(NaN);
        updateWeatherIcon(NaN);
        setStatus(NaN);
    }
});

// ========================================
// INITIALIZATION
// ========================================

/* Initialize page with default values on page load */
updateBackground(NaN);  /* Set default purple background */
updateWeatherIcon(NaN);  /* Hide weather icon initially */
setStatus(NaN);          /* Show 'Enter a value' text */
