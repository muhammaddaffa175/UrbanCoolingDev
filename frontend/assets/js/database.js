import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";

// Function to save user data in Firebase Realtime Database
export function saveUserData(userId, username, email) {
    const db = getDatabase();
    // Reference to a specific location in the database where user data will be stored
    const userRef = ref(db, 'users/' + userId);

    // Set the user data in the database
    return set(userRef, {
        username: username,
        email: email
    }).then(() => {
        console.log("User data saved successfully!");
    }).catch((error) => {
        console.error("Error saving user data: ", error);
    });
}
