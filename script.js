
// CreativeConnect JavaScript

console.log("Welcome to CreativeConnect!");

document.addEventListener("DOMContentLoaded", function () {

    console.log("Website loaded successfully!");

});

// Like artwork in the community gallery

function likeArtwork(button) {

    const countElement = button.querySelector("span");

    let currentCount = Number(countElement.textContent);

    if (button.classList.contains("liked")) {

        currentCount--;

        button.classList.remove("liked");

        button.firstChild.textContent = "♡ Like ";

    } else {

        currentCount++;

        button.classList.add("liked");

        button.firstChild.textContent = "♥ Liked ";

    }

    countElement.textContent = currentCount;

}

// Register interest in an event

function registerEvent(button) {

    if (button.classList.contains("registered")) {

        alert("You have already registered interest!");

        return;
    }

    button.textContent = "Interest Registered ✓";

    button.classList.add("registered");

    button.style.backgroundColor = "#24834a";

    alert("Your interest has been registered successfully!");

}

// Approve artwork

function approveArtwork(button) {

    const row = button.closest("tr");

    const statusCell = row.querySelector(".status-cell");

    const status = statusCell.querySelector("span");

    if (!status.classList.contains("status-pending")) {
        alert("This artwork has already been reviewed.");
        return;
    }

    status.textContent = "Approved";

    status.className = "status-approved";

    updatePendingCount();

    alert("Artwork approved successfully!");

}


// Reject artwork

function rejectArtwork(button) {

    const row = button.closest("tr");

    const statusCell = row.querySelector(".status-cell");

    const status = statusCell.querySelector("span");

    if (!status.classList.contains("status-pending")) {
        alert("This artwork has already been reviewed.");
        return;
    }

    status.textContent = "Rejected";

    status.className = "status-rejected";

    updatePendingCount();

    alert("Artwork rejected successfully!");

}


// Update pending artwork count

function updatePendingCount() {

    const pendingItems = document.querySelectorAll(
        ".status-pending"
    );

    const countElement = document.getElementById(
        "pendingCount"
    );

    if (countElement) {

        countElement.textContent = pendingItems.length;

    }

}

/* =========================================
   CREATIVE CONNECT - GALLERY INTERACTIONS
========================================= */

document.addEventListener("DOMContentLoaded", function () {

  // CATEGORY FILTERS
  const filterButtons = document.querySelectorAll(".cc-filter-btn");
  const artworkCards = document.querySelectorAll(".cc-art-card");

  filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {

      filterButtons.forEach(function (btn) {
        btn.classList.remove("active");
      });

      button.classList.add("active");

      const selectedCategory = button.dataset.filter;

      artworkCards.forEach(function (card) {
        const cardCategory = card.dataset.category;

        if (
          selectedCategory === "all" ||
          selectedCategory === cardCategory
        ) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  // LIKE BUTTONS
  const likeButtons = document.querySelectorAll(".cc-like-btn");

  likeButtons.forEach(function (button) {

    button.addEventListener("click", function () {

      const card = button.closest(".cc-art-card");
      const countElement = card.querySelector(".cc-art-like-count");

      let currentCount = parseInt(
        countElement.textContent.replace(/[^0-9]/g, "")
      );

      const isLiked = button.classList.contains("liked");

      if (isLiked) {
        currentCount--;
        button.classList.remove("liked");
        button.textContent = "♡";
        button.setAttribute("aria-pressed", "false");
      } else {
        currentCount++;
        button.classList.add("liked");
        button.textContent = "♥";
        button.setAttribute("aria-pressed", "true");
      }

      countElement.textContent = "♡ " + currentCount;
    });

  });

});

/* CREATIVE CONNECT - EVENTS INTERACTIONS */

document.addEventListener("DOMContentLoaded", function () {

  // EVENT CATEGORY FILTERS
  const filters = document.querySelectorAll(".cc-event-filter");
  const cards = document.querySelectorAll(".cc-event-card");

  filters.forEach(function (button) {
    button.addEventListener("click", function () {
      filters.forEach(function (item) {
        item.classList.remove("active");
      });

      button.classList.add("active");

      const category = button.dataset.filter;

      cards.forEach(function (card) {
        card.style.display =
          category === "all" || card.dataset.category === category
            ? "block"
            : "none";
      });
    });
  });

  // REGISTER INTEREST BUTTONS
  const registerButtons = document.querySelectorAll(".cc-event-register");

  registerButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      button.classList.toggle("registered");

      if (button.classList.contains("registered")) {
        button.textContent = "✓ Interest Registered";
      } else {
        button.textContent = "Register Interest →";
      }
    });
  });

});

/* CREATIVE CONNECT - ADMIN INTERACTIONS */

document.addEventListener("DOMContentLoaded", function () {

  const actionButtons = document.querySelectorAll(
    ".cc-approve-btn, .cc-reject-btn"
  );

  actionButtons.forEach(function (button) {
    button.addEventListener("click", function () {

      const row = button.closest("tr");
      const status = row.querySelector(".cc-status");
      const actionCell = row.querySelector(".cc-admin-actions");

      if (status.textContent.trim() !== "Pending") {
        return;
      }

      if (button.classList.contains("cc-approve-btn")) {
        status.textContent = "Approved";
        status.className = "cc-status approved";
      } else {
        status.textContent = "Rejected";
        status.className = "cc-status rejected";
      }

      actionCell.textContent = "Review completed";

      const pendingCount = document.getElementById("pendingCount");
      const currentCount = Number(pendingCount.textContent);

      pendingCount.textContent = Math.max(0, currentCount - 1);

      const reviewLabel = document.querySelector(".cc-admin-review-label");
      if (reviewLabel) {
        reviewLabel.textContent = pendingCount.textContent + " Pending";
      }
    });
  });

});
