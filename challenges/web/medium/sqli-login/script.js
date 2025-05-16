/**
 * SQL Injection Challenge - Client-Side Simulation
 * 
 * WARNING: This is a simulated vulnerability for educational purposes only.
 * Never test SQL injection on real systems without permission.
 */

// DOM Elements
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const resultDiv = document.getElementById("result");
const hintButtons = document.querySelectorAll("[id^='hintBtn']");

// Configuration
const config = {
    flag: "CTF{sqli_bypass_success}",
    vulnerableTable: "users",
    maxAttempts: 5,
    debugMode: true
};

// Injection patterns to detect (with educational descriptions)
const injectionPatterns = [
    {
        pattern: /' OR '1'='1/i,
        name: "Basic Boolean Bypass",
        description: "Makes the condition always true by adding OR '1'='1"
    },
    {
        pattern: /'--|#/i,
        name: "Comment Injection",
        description: "Comments out the rest of the query using -- or #"
    },
    {
        pattern: /'\/\*.*\*\//i,
        name: "Block Comment Injection",
        description: "Uses /* */ to comment out parts of the query"
    },
    {
        pattern: /';\s*(DROP|INSERT|UPDATE|DELETE)/i,
        name: "Query Stacking",
        description: "Attempts to execute multiple queries with semicolon"
    }
];

// Initialize challenge
document.addEventListener("DOMContentLoaded", function() {
    if (config.debugMode) {
        console.log("%c[DEBUG] Challenge initialized", "color: #20c20e");
        console.log("Try these payloads:\n1. ' OR '1'='1\n2. admin'--\n3. '/*");
    }
    
    // Add event listeners
    document.querySelector("button").addEventListener("click", attemptLogin);
    
    // Easter egg - console warning
    console.log("%c⚠️ Security Notice:", "color: #ff5555; font-weight: bold;");
    console.log("This simulation demonstrates SQL injection vulnerabilities.\n" + 
                "Never use these techniques without explicit permission.");
});

/**
 * Main login function that simulates vulnerable SQL query
 */
function attemptLogin() {
    const username = usernameInput.value;
    const password = passwordInput.value;
    
    // Simulate vulnerable query construction
    const query = `SELECT * FROM ${config.vulnerableTable} ` +
                  `WHERE username='${username}' AND password='${password}'`;
    
    // Check for injections
    const detectedInjection = detectInjection(username, password, query);
    
    // Display results
    if (detectedInjection) {
        showSuccess(query, detectedInjection);
    } else {
        showFailure(query);
    }
    
    // Debug output
    if (config.debugMode) {
        console.log(`[QUERY] ${query}`);
        if (detectedInjection) {
            console.log(`[DETECTED] ${detectedInjection.name}: ${detectedInjection.description}`);
        }
    }
}

/**
 * Detects SQL injection patterns
 */
function detectInjection(username, password, query) {
    // Check all patterns
    for (const injection of injectionPatterns) {
        if (injection.pattern.test(username) || 
            injection.pattern.test(password) || 
            injection.pattern.test(query)) {
            return injection;
        }
    }
    return null;
}

/**
 * Display successful injection
 */
function showSuccess(query, injection) {
    resultDiv.className = "success";
    resultDiv.innerHTML = `
        <h3>🔓 Authentication Bypassed!</h3>
        <p>Flag: <strong>${config.flag}</strong></p>
        <p>You used: <code>${escapeHtml(injection.name)}</code></p>
        <p>Manipulated query:</p>
        <code>${highlightInjection(query, injection.pattern)}</code>
        <p class="educational-note">${injection.description}</p>
    `;
    resultDiv.style.display = "block";
}

/**
 * Display failed attempt
 */
function showFailure(query) {
    resultDiv.className = "error";
    resultDiv.innerHTML = `
        ❌ Login failed. The system executed:<br>
        <code>${escapeHtml(query)}</code>
        <p class="educational-note">Try modifying the input to alter the query structure</p>
    `;
    resultDiv.style.display = "block";
}

/**
 * Highlight the injected portion of the query
 */
function highlightInjection(query, pattern) {
    return escapeHtml(query)
        .replace(pattern, match => 
            `<span style="color:var(--hacker-green);font-weight:bold">${match}</span>`);
}

/**
 * Escape HTML special characters
 */
function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

/**
 * Show hints progressively
 */
function showHint(num) {
    document.getElementById(`hint${num}`).style.display = 'block';
    document.getElementById(`hintBtn${num}`).style.display = 'none';
    
    if (config.debugMode) {
        console.log(`Hint ${num} revealed`);
    }
}

// Make functions available globally for HTML onclick attributes
window.attemptLogin = attemptLogin;
window.showHint = showHint;