const fInput = document.getElementById('fahrenheit');
const cInput = document.getElementById('celsius');

fInput.addEventListener('input', () => {
    const fValue = parseFloat(fInput.value);
    if (!isNaN(fValue)) {
        const cValue = (fValue - 32) * 5 / 9;
        cInput.value = cValue.toFixed(2);
    } else {
        cInput.value = ""; 
    }
});

cInput.addEventListener('input', () => {
    const cValue = parseFloat(cInput.value);
    if (!isNaN(cValue)) {
        const fValue = (cValue * 9 / 5) + 32;
        fInput.value = fValue.toFixed(2);
    } else {
        fInput.value = "";
    }
});