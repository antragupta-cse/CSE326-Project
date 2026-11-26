
const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function(event) {
  event.preventDefault();

  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value;

  if (!email || !password) {
    alert("Please enter your email and password.");
    return;
  }

  const role = prompt(
    "Enter your demo role: artist, member or admin"
  );

  if (!["artist", "member", "admin"].includes(role)) {
    alert("Invalid role. Please try again.");
    return;
  }

  const user = {
    email: email,
    fullName: email.split("@")[0],
    role: role
  };

  localStorage.setItem("ccCurrentUser", JSON.stringify(user));

  alert("Welcome to CreativeConnect!");

  if (role === "artist") {
    window.location.href = "artist-dashboard.html";
  } else if (role === "member") {
    window.location.href = "index.html";
  } else {
    window.location.href = "admin-dashboard.html";
  }
});
