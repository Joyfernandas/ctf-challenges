/**
 * Advanced JWT Bypass Challenge
 * 
 * This challenge implements multiple security layers that must all be bypassed:
 * 1. Algorithm verification (rejects "none" algorithm)
 * 2. Token expiration check
 * 3. Signature validation
 * 4. Rate limiting
 * 5. Issuer verification
 * 
 * WARNING: This is a simulation for educational purposes only.
 */

// Configuration
const CONFIG = {
    SECRET_KEY: "supersecretkey" + Math.random().toString(36).substring(2), // Dynamic secret
    ADMIN_SECRET: "realadminkey_" + Math.random().toString(36).substring(2),
    ISSUER: "secure-auth-server",
    MAX_ATTEMPTS: 5,
    TOKEN_LIFETIME: 300000, // 5 minutes
    DEBUG: true
};

// State tracking
let attempts = 0;
let lastAttemptTime = 0;

// Generate initial token
function generateInitialToken() {
    const header = {
        alg: "HS256",
        typ: "JWT",
        kid: "default-key"
    };

    const payload = {
        username: "user",
        role: "user",
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor((Date.now() + CONFIG.TOKEN_LIFETIME) / 1000),
        iss: CONFIG.ISSUER,
        jti: "token-" + Math.random().toString(36).substring(2, 10)
    };

    return signToken(header, payload, CONFIG.SECRET_KEY);
}

// Base64 URL-safe encoding
function base64url(source) {
    let encoded = CryptoJS.enc.Base64.stringify(source);
    return encoded
        .replace(/=+$/, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');
}

// Sign token with specified key
function signToken(header, payload, key) {
    const encodedHeader = base64url(CryptoJS.enc.Utf8.parse(JSON.stringify(header)));
    const encodedPayload = base64url(CryptoJS.enc.Utf8.parse(JSON.stringify(payload)));
    const signature = base64url(CryptoJS.HmacSHA256(encodedHeader + "." + encodedPayload, key));
    
    return `${encodedHeader}.${encodedPayload}.${signature}`;
}

// Decode token
function decodeToken(token) {
    try {
        const parts = token.split('.');
        if (parts.length !== 3) return null;

        const header = JSON.parse(CryptoJS.enc.Utf8.stringify(CryptoJS.enc.Base64.parse(parts[0])));
        const payload = JSON.parse(CryptoJS.enc.Utf8.stringify(CryptoJS.enc.Base64.parse(parts[1])));

        return { header, payload, signature: parts[2] };
    } catch (e) {
        if (CONFIG.DEBUG) console.log("[DEBUG] Decode error:", e);
        return null;
    }
}

// Verify token with multiple security checks
function verifyToken(token) {
    attempts++;
    const now = Date.now();
    
    // Rate limiting
    if (attempts > CONFIG.MAX_ATTEMPTS) {
        if (CONFIG.DEBUG) console.log("[SECURITY] Attempt limit exceeded");
        return { valid: false, reason: "Too many attempts. Try again later." };
    }
    
    // Minimum time between attempts
    if (now - lastAttemptTime < 1000) {
        if (CONFIG.DEBUG) console.log("[SECURITY] Too fast attempts");
        return { valid: false, reason: "Attempts too frequent. Slow down." };
    }
    lastAttemptTime = now;

    const decoded = decodeToken(token);
    if (!decoded) {
        return { valid: false, reason: "Invalid token format" };
    }

    // Algorithm verification
    if (decoded.header.alg === "none") {
        return { valid: false, reason: "Unsecured tokens not allowed" };
    }

    // Check expiration
    const currentTime = Math.floor(Date.now() / 1000);
    if (decoded.payload.exp && decoded.payload.exp < currentTime) {
        return { valid: false, reason: "Token expired" };
    }

    // Check issuer
    if (decoded.payload.iss !== CONFIG.ISSUER) {
        return { valid: false, reason: "Invalid token issuer" };
    }

    // Verify signature with proper key
    let key = CONFIG.SECRET_KEY;
    if (decoded.payload.role === "admin") {
        key = CONFIG.ADMIN_SECRET; // Admin tokens use different key
    }

    const checkToken = signToken(decoded.header, decoded.payload, key);
    if (checkToken !== token) {
        return { valid: false, reason: "Invalid token signature" };
    }

    return { valid: true };
}

// Main challenge function
function attemptForgedLogin() {
    const inputToken = document.getElementById("tokenInput").value.trim();
    const resultDiv = document.getElementById("result");
    resultDiv.style.display = "block";

    // Initial validation
    if (!inputToken) {
        resultDiv.className = "error";
        resultDiv.innerHTML = "❌ Please enter a token";
        return;
    }

    const verification = verifyToken(inputToken);
    if (!verification.valid) {
        resultDiv.className = "error";
        resultDiv.innerHTML = `❌ Token verification failed: ${verification.reason}`;
        return;
    }

    const decoded = decodeToken(inputToken);
    if (!decoded) {
        resultDiv.className = "error";
        resultDiv.innerHTML = "❌ Invalid token format";
        return;
    }

    // Final role check
    if (decoded.payload.role === "admin") {
        resultDiv.className = "success";
        resultDiv.innerHTML = `
            🔓 <strong>Admin access granted!</strong><br>
            Flag: <code>CTF{jwt_advanced_bypass_success}</code><br><br>
            <small>You successfully bypassed all security checks!</small>
        `;
        
        if (CONFIG.DEBUG) {
            console.log("%c[SUCCESS] All security checks bypassed!", "color: #20c20e; font-weight: bold;");
        }
    } else {
        resultDiv.className = "error";
        resultDiv.innerHTML = `
            ❌ Access denied. Current role: <strong>${decoded.payload.role}</strong><br>
            <small>The token is valid but doesn't have admin privileges.</small>
        `;
    }
}

// Make functions available globally
window.attemptForgedLogin = attemptForgedLogin;
window.decodeToken = decodeToken;