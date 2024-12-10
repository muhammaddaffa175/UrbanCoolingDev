import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged, 
    updateProfile 
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

import { saveUserData,} from './firestore.js'; // Import firestore.js functions
import app from './app.js';

const auth = getAuth(app);

// Register new user
export function registerUser(email, password, username) {
    return createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            // Update profile with username
            return updateProfile(user, {
                displayName: username
            })
            .then(() => {
                // Save user data to Firestore
                return saveUserData(user.uid, username, email);  // Use the function from firestore.js
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
        window.location.href = "/frontend/index.html"; // Redirect to the main page after registration
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
        window.location.href = "/frontend/index.html"; // Redirect to the main page after login
    } catch (error) {
        console.error("Error during login:", error.message);
        alert("Login failed: " + error.message);
    }
});

onAuthStateChanged(auth, (user) => {
    const loginButton = document.getElementById("log-in");
    const userDisplay = document.getElementById("usernameDisplay");

    if (user) {
        console.log("User logged in:", user.uid);
        loginButton.style.display = "none";  // Menyembunyikan tombol login
        userDisplay.style.display = "block"; // Menampilkan username
        userDisplay.textContent = user.displayName || "Profile"; // Menampilkan nama pengguna atau "Profile"
        userDisplay.href = "/frontend/profile/profile.html"; // Menautkan ke halaman profil
    } else {
        console.log("User not logged in.");
        loginButton.style.display = "block";  // Menampilkan tombol login
        userDisplay.style.display = "none";  // Menyembunyikan username
    }
});

// Log out button in the profile page
document.getElementById("logout-button")?.addEventListener("click", async () => {
    try {
        await logoutUser();
        alert("Logged out successfully!");
        window.location.href = "/frontend/index.html"; // Redirect to main page after logout
    } catch (error) {
        console.error("Error during logout:", error.message);
        alert("Logout failed: " + error.message);
    }
});
