// auth.js
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged, 
    updateProfile 
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";
import { saveUserData} from './database.js';
import app from './app.js';

const auth = getAuth(app);
const db = getDatabase(app);

// Register new user
export function registerUser(email, password, username) {
    return createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            // Update profile dengan username
            return updateProfile(user, {
                displayName: username
            })
            .then(() => {
                // Simpan data pengguna ke Firebase Realtime Database
                return saveUserData(user.uid, username, email);
            });
        });
}

// Login existing user
export function loginUser(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
}

// Logout user
export function logoutUser() {
    return signOut(auth);
}

// Event listeners for login and registration buttons
document.getElementById("button_register")?.addEventListener("click", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email_register").value;
    const password = document.getElementById("psw_register").value;
    const username = document.getElementById("username").value;

    try {
        await registerUser(email, password, username);
        alert("Registration successful!");
        window.location.href = "../index.html"; // Redirect to the main page after registration
    } catch (error) {
        console.error("Error during registration:", error.message);
        alert("Registration failed: " + error.message);
    }
});

document.getElementById("button_login")?.addEventListener("click", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email_login").value;
    const password = document.getElementById("psw_login").value;

    try {
        await loginUser(email, password);
        alert("Login successful!");
        window.location.href = "../index.html"; // Redirect to the main page after login
    } catch (error) {
        console.error("Error during login:", error.message);
        alert("Login failed: " + error.message);
    }
});

// Listen for authentication state changes
onAuthStateChanged(auth, (user) => {
    const loginButton = document.getElementById("log-in");
    const userDisplay = document.getElementById("usernameDisplay");

    if (user) {
        console.log("User logged in:", user.uid);
        loginButton.style.display = "none";
        userDisplay.style.display = "block";
        userDisplay.textContent = user.displayName || "Profile";
        userDisplay.href = "profile.html";
    } else {
        console.log("User not logged in.");
        loginButton.style.display = "block";
        userDisplay.style.display = "none";
    }
});

// Log out button in the profile page
document.getElementById("logout-button")?.addEventListener("click", async () => {
    try {
        await logoutUser();
        alert("Logged out successfully!");
        window.location.href = "index.html"; // Redirect to main page after logout
    } catch (error) {
        console.error("Error during logout:", error.message);
        alert("Logout failed: " + error.message);
    }
});
