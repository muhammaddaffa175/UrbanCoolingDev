// Mengatur toggle untuk navbar
const navbarNav = document.querySelector(".navbar-nav");
const hamburger = document.querySelector("#menu");

// Ketika menu di klik, toggle navbar
hamburger.onclick = () => {
  navbarNav.classList.toggle("active");
};

// Menutup navbar saat mengubah ukuran layar
window.addEventListener("resize", () => {
  if (window.innerWidth > 758) {
    navbarNav.classList.remove("active");
  }
});

// Klik di luar navbar untuk menutupnya
document.addEventListener("click", (e) => {
  if (!hamburger.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove("active");
  }
});

// Konfigurasi path halaman
const pagePaths = {
  "material-reflective": "material-reflective/index.html",
  "green-cooling": "green-cooling/index.html",
  "water-cooling": "water-cooling/index.html",
};

// Fungsi untuk memuat halaman berdasarkan parameter page
function loadPage(page) {
  const pagePath = pagePaths[page];

  if (pagePath) {
    fetch(pagePath)
      .then((response) => response.text())
      .then((html) => {
        document.querySelector("#content").innerHTML = html;
      })
      .catch((error) => console.error("Error loading page:", error));
  } else {
    document
      .querySelector(`#${page}`)
      ?.scrollIntoView({ behavior: "smooth" });
  }
}

// Event listener untuk perubahan hash di URL
window.addEventListener("hashchange", () => {
  const page = window.location.hash.substring(1) || "home"; // Default ke "home"
  loadPage(page);
});

// Muat halaman awal berdasarkan hash atau default ke 'home'
window.addEventListener("load", () => {
  const page = window.location.hash.substring(1) || "home"; // Default ke "home"
  loadPage(page);
});

// Fungsi pencarian
const searchButton = document.getElementById("searchButton");
if (searchButton) {
  searchButton.addEventListener("click", () => {
    const searchTerm = document
      .getElementById("searchInput")
      .value.trim()
      .toLowerCase();
    if (searchTerm) {
      alert(`Searching for: ${searchTerm}`);
    } else {
      alert("Please enter a search term.");
    }
  });
}

// Toggle tampilan kolom pencarian
const searchIcon = document.getElementById("search");
if (searchIcon) {
  searchIcon.addEventListener("click", (event) => {
    event.preventDefault();
    const searchContainer = document.getElementById("searchContainer");
    searchContainer.style.display =
      searchContainer.style.display === "none" ? "flex" : "none";
  });
}

// Spesifik untuk Material Reflective
function setupReflectiveInteractions() {
  const reflectiveButtons = document.querySelectorAll(".reflective-btn");

  reflectiveButtons.forEach((button) => {
    button.addEventListener("click", () => {
      alert("Material Reflective action triggered!");
    });
  });
}

// Inisialisasi khusus saat memuat halaman Material Reflective
if (window.location.hash.substring(1) === "material-reflective") {
  setupReflectiveInteractions();
}

// Data untuk kartu Material Reflective
const reflectiveCards = [
  {
    title: "Film Reflektif",
    description:
      "Lapisan film untuk memantulkan cahaya matahari dan mengurangi suhu ruangan.",
    image: "https://via.placeholder.com/300x200",
  },
  {
    title: "Cat Reflektif",
    description:
      "Cat inovatif yang memantulkan panas untuk menjaga bangunan tetap sejuk.",
    image: "https://via.placeholder.com/300x200",
  },
  {
    title: "Atap Reflektif",
    description:
      "Atap yang didesain khusus untuk memantulkan sinar matahari secara efisien.",
    image: "https://via.placeholder.com/300x200",
  },
];

// Fungsi untuk membuat kartu
function createCard(cardData) {
  const card = document.createElement("div");
  card.className = "card";

  const img = document.createElement("img");
  img.src = cardData.image;
  img.alt = cardData.title;

  const title = document.createElement("h3");
  title.textContent = cardData.title;

  const description = document.createElement("p");
  description.textContent = cardData.description;

  card.appendChild(img);
  card.appendChild(title);
  card.appendChild(description);

  return card;
}

// Fungsi untuk merender semua kartu
function renderCards() {
  const cardsContainer = document.querySelector(".cards");

  if (cardsContainer) {
    reflectiveCards.forEach((cardData) => {
      const card = createCard(cardData);
      cardsContainer.appendChild(card);
    });
  } else {
    console.error("Container untuk kartu tidak ditemukan!");
  }
}

// Memanggil fungsi renderCards saat halaman selesai dimuat
document.addEventListener("DOMContentLoaded", renderCards);
