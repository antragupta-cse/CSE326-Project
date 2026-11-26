
console.log("CreativeConnect register.js is running!");

import { auth, db } from "./firebase.js";

import {
  createUserWithEmailAndPassword,
  updateProfile
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";

import {
  doc,
  setDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

const registerForm = document.getElementById("registerForm");

if (!registerForm) {
  console.error("Registration form not found!");
} else {

  registerForm.addEventListener("submit", async function(event) {

    console.log("REGISTER BUTTON CLICKED!");

    event.preventDefault();

    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("registerEmail").value.trim();
    const password = document.getElementById("registerPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const role = document.getElementById("userRole").value;
    const agreeTerms = document.getElementById("agreeTerms").checked;

    // Validate fields

    if (!fullName || !email || !password || !confirmPassword || !role) {
      alert("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      alert("Password must contain at least 6 characters.");
      return;
    }

    if (!agreeTerms) {
      alert("Please accept the terms and conditions.");
      return;
    }

    if (!["artist", "member"].includes(role)) {
      alert("Please select a valid account role.");
      return;
    }

    const submitButton = registerForm.querySelector(
      'button[type="submit"]'
    );

    if (submitButton) submitButton.disabled = true;

    try {

      // STEP 1: Create Firebase account

      console.log("STEP 1: Starting Firebase account creation");

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      console.log("STEP 2: Firebase account created", user.uid);

      // STEP 2: Save user's display name

      await updateProfile(user, {
        displayName: fullName
      });

      // STEP 3: Save user information in Firestore

      console.log("STEP 3: Saving user profile to Firestore");

      await setDoc(doc(db, "users", user.uid), {
        fullName: fullName,
        email: email,
        role: role,
        createdAt: serverTimestamp()
      });

      // STEP 4: Confirm Firestore save

      console.log("STEP 4: User profile saved successfully!");

      alert("Registration successful! Welcome to CreativeConnect.");

      // Redirect according to role

      if (role === "artist") {
        window.location.href = "artist-dashboard.html";
      } else {
        window.location.href = "index.html";
      }

    } catch (error) {

      console.error("FULL FIREBASE ERROR:", error);

      alert(error.code + " : " + error.message);

    } finally {

      if (submitButton) submitButton.disabled = false;

    }

  });
}
