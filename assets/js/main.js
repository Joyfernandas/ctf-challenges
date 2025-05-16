function checkFlag(inputId, correctFlag) {
    const input = document.getElementById(inputId).value;
    if (input.trim() === correctFlag) {
        alert("✅ Correct flag!");
    } else {
        alert("❌ Incorrect. Try again.");
    }
}