function scrollToSection(id) {
  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
}

const opportunities = [
  {
    id: 1,
    title: "Food Bank Assistant",
    category: "Hunger Relief",
    description:
      "Help sort and distribute food to families in need. Join our compassionate team making a direct impact on hunger in our community.",
    hours: "4 hours/week",
    location: "Downtown",
    organization: "Community Food Bank",
    nextDate: new Date(2025, 5, 13, 9, 0),
    duration: 4,
    image:
      "https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?w=800&h=600&fit=crop",
  },
  {
    id: 2,
    title: "Animal Shelter Volunteer",
    category: "Animal Care",
    description:
      "Care for rescued animals by feeding, walking, and providing companionship. Help these furry friends find their forever homes.",
    hours: "6 hours/week",
    location: "North Side",
    organization: "Happy Paws Shelter",
    nextDate: new Date(2025, 5, 14, 10, 0),
    duration: 6,
    image:
      "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&h=600&fit=crop",
  },
  {
    id: 3,
    title: "Youth Mentor",
    category: "Education & Mentorship",
    description:
      "Guide and inspire young people through educational activities and life skills development. Be the positive influence they need.",
    hours: "3 hours/week",
    location: "Community Center",
    organization: "Youth Development Center",
    nextDate: new Date(2025, 5, 16, 15, 0),
    duration: 3,
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=600&fit=crop",
  },
  {
    id: 4,
    title: "Senior Companion",
    category: "Elderly Support",
    description:
      "Provide friendship and assistance to elderly community members. Share stories, play games, and brighten their day.",
    hours: "2 hours/week",
    location: "Various Locations",
    organization: "Golden Years Care",
    nextDate: new Date(2025, 5, 15, 14, 0),
    duration: 2,
    image:
      "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&h=600&fit=crop",
  },
  {
    id: 5,
    title: "Environmental Cleanup",
    category: "Environment",
    description:
      "Join our team in cleaning parks, beaches, and natural areas. Help preserve the environment for future generations.",
    hours: "5 hours/week",
    location: "City Parks",
    organization: "Green Earth Initiative",
    nextDate: new Date(2025, 5, 15, 8, 0),
    duration: 5,
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
  },
  {
    id: 6,
    title: "Reading Tutor",
    category: "Education & Mentorship",
    description:
      "Help children develop reading skills and foster a love for learning. Make education accessible and enjoyable for all.",
    hours: "4 hours/week",
    location: "Local Schools",
    organization: "Literacy Foundation",
    nextDate: new Date(2025, 5, 17, 15, 0),
    duration: 4,
    image:
      "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=800&h=600&fit=crop",
  },
  {
    id: 8,
    title: "Community Garden Helper",
    category: "Sustainability",
    description:
      "Grow fresh produce for local food banks while teaching sustainable gardening practices to community members.",
    hours: "3 hours/week",
    location: "Riverside Community Garden",
    organization: "Urban Harvest Project",
    nextDate: new Date(2025, 5, 19, 16, 0),
    duration: 3,
    image:
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=600&fit=crop",
  },
  {
    id: 9,
    title: "Homeless Shelter Support",
    category: "Homelessness",
    description:
      "Provide meals, organize donations, and offer support services to individuals experiencing homelessness in our community.",
    hours: "5 hours/week",
    location: "Central Shelter",
    organization: "Safe Haven Outreach",
    nextDate: new Date(2025, 5, 20, 11, 0),
    duration: 5,
    image:
      "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&h=600&fit=crop",
  },
];

let userData = JSON.parse(localStorage.getItem("userData")) || null;
let userEvents = [];
let appliedOpportunities = new Set();

function getUserKey() {
  return userData?.email ? `userData-${userData.email}` : null;
}

function saveUserData() {
  const key = getUserKey();
  if (!key) return;

  const existing = JSON.parse(localStorage.getItem(key)) || {};
  const userInfo = {
    username: userData.username,
    email: userData.email,
    password: existing.password || "", // ✅ Keep original password
    events: userEvents,
    opportunities: [...appliedOpportunities],
  };
  localStorage.setItem(key, JSON.stringify(userInfo));
}

function loadUserData() {
  const key = getUserKey();
  if (!key) return;
  const saved = JSON.parse(localStorage.getItem(key));
  if (saved) {
    userEvents = saved.events || [];
    appliedOpportunities = new Set(saved.opportunities || []);
  } else {
    userEvents = [];
    appliedOpportunities = new Set();
  }
}

function generateOpportunityCards() {
  const grid = document.getElementById("opportunityGrid");
  grid.innerHTML = "";
  opportunities.forEach((opportunity) => {
    const card = document.createElement("div");
    card.className = "opportunity-card";
    const isApplied = appliedOpportunities.has(opportunity.id);
    card.innerHTML = `
<img src="${opportunity.image}" alt="${opportunity.title}" />
<h3>${opportunity.title}</h3>
<p>${opportunity.description}</p>
<div class="opportunity-category"><strong>Category:</strong> ${
      opportunity.category
    }</div>
<div class="opportunity-details">
<div><i class="fas fa-clock"></i> ${opportunity.hours}</div>
<div><i class="fas fa-map-marker-alt"></i> ${opportunity.location}</div>
<div><i class="fas fa-building"></i> ${opportunity.organization}</div>
</div>
<button class="apply-btn ${isApplied ? "applied" : ""}"
data-opportunity-id="${opportunity.id}"
${isApplied ? "disabled" : ""}>
${isApplied ? "Applied" : "Apply Now"}
</button>
`;

    grid.appendChild(card);
  });
}

function addEventToCalendar(opportunity) {
  const event = {
    id: opportunity.id,
    title: opportunity.title,
    date: new Date(opportunity.nextDate),
    location: opportunity.location,
    organization: opportunity.organization,
    duration: opportunity.duration,
  };
  userEvents.push(event);
  saveUserData();
  updateCalendarDisplay();
  updateStats();
}

function updateCalendarDisplay() {
  const eventsContainer = document.getElementById("upcomingEvents");
  eventsContainer.innerHTML = "";
  if (userEvents.length === 0) {
    eventsContainer.innerHTML =
      '<p style="color: #666; text-align: center;">No upcoming events. Apply for opportunities to see them here!</p>';
    return;
  }
  userEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
  userEvents.forEach((event) => {
    const eventDate = new Date(event.date);
    const dateString = eventDate.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const timeString = eventDate.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    const eventCard = document.createElement("div");
    eventCard.className = "event-card";
    eventCard.innerHTML = `
                <div class="event-date">${dateString}</div>
                <div class="event-title">${event.title}</div>
                <div class="event-details">${timeString} | ${event.location}</div>
                <div class="event-organization">${event.organization}</div>
            `;
    eventsContainer.appendChild(eventCard);
  });
}

function updateStats() {
  const totalHoursEl = document.getElementById("totalHours");
  const totalOrganizationsEl = document.getElementById("totalOrganizations");
  const totalEventsEl = document.getElementById("totalEvents");

  const totalHours = userEvents.reduce((sum, event) => sum + event.duration, 0);
  const now = new Date();
  const monthlyHours = userEvents
    .filter((event) => {
      const date = new Date(event.date);
      return (
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear()
      );
    })
    .reduce((sum, event) => sum + event.duration, 0);
  const uniqueOrganizations = new Set(
    userEvents.map((event) => event.organization)
  );

  totalHoursEl.textContent = totalHours;

  totalOrganizationsEl.textContent = uniqueOrganizations.size;
  totalEventsEl.textContent = userEvents.length;
}

document.addEventListener("DOMContentLoaded", () => {
  const loginModal = document.getElementById("loginModal");
  const signupModal = document.getElementById("signupModal");
  const openLogin = document.getElementById("openLogin");
  const openSignup = document.getElementById("openSignup");
  const authButtons = document.getElementById("authButtons");
  const userGreeting = document.getElementById("userGreeting");
  const usernameDisplay = document.getElementById("usernameDisplay");
  const logoutButton = document.getElementById("logoutButton");

  if (userData) {
    loadUserData();
    authButtons.style.display = "none";
    userGreeting.style.display = "block";
    usernameDisplay.textContent = userData.username;
  }

  generateOpportunityCards();
  updateCalendarDisplay();
  updateStats();

  openLogin.addEventListener(
    "click",
    () => (loginModal.style.display = "flex")
  );
  openSignup.addEventListener(
    "click",
    () => (signupModal.style.display = "flex")
  );
  document.querySelectorAll(".close-button").forEach((btn) =>
    btn.addEventListener("click", () => {
      loginModal.style.display = "none";
      signupModal.style.display = "none";
    })
  );

  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href").substring(1);
      document.getElementById(targetId).scrollIntoView({ behavior: "smooth" });
    });
  });

  document.getElementById("signupForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("signupUsername").value.trim();
    const email = document.getElementById("signupEmail").value.trim();
    const password = document.getElementById("signupPassword").value.trim();

    if (username && email && password) {
      const userKey = `userData-${email}`;
      const userObj = {
        username,
        email,
        password,
        events: [],
        opportunities: [],
      };

      localStorage.setItem(userKey, JSON.stringify(userObj));
      localStorage.setItem("userData", JSON.stringify({ username, email }));

      userData = { username, email };
      userEvents = [];
      appliedOpportunities = new Set();

      authButtons.style.display = "none";
      userGreeting.style.display = "block";
      usernameDisplay.textContent = username;
      signupModal.style.display = "none";

      document.getElementById("signupUsername").value = "";
      document.getElementById("signupEmail").value = "";
      document.getElementById("signupPassword").value = "";

      generateOpportunityCards();
      updateCalendarDisplay();
      updateStats();
    }
  });

  document.getElementById("loginForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const emailInput = document.getElementById("loginEmail");
    const passwordInput = document.getElementById("loginPassword");
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    const userKey = `userData-${email}`;
    const storedUser = JSON.parse(localStorage.getItem(userKey));

    if (!storedUser) {
      alert("No user found with this email. Please sign up first.");
      return;
    }

    if (storedUser.password !== password) {
      alert("Incorrect password. Please try again.");
      return;
    }

    userData = { username: storedUser.username, email };
    localStorage.setItem("userData", JSON.stringify(userData));
    loadUserData();

    authButtons.style.display = "none";
    userGreeting.style.display = "block";
    usernameDisplay.textContent = storedUser.username || email;
    loginModal.style.display = "none";

    emailInput.value = "";
    passwordInput.value = "";

    generateOpportunityCards();
    updateCalendarDisplay();
    updateStats();
  });

  logoutButton.addEventListener("click", () => {
    saveUserData();
    userData = null;
    localStorage.removeItem("userData");
    userEvents = [];
    appliedOpportunities.clear();
    authButtons.style.display = "flex";
    userGreeting.style.display = "none";
    generateOpportunityCards();
    updateCalendarDisplay();
    updateStats();
  });

  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("apply-btn")) {
      e.preventDefault();
      if (!userData) {
        alert("Please login first to apply for opportunities.");
        loginModal.style.display = "flex";
        return;
      }
      const opportunityId = parseInt(
        e.target.getAttribute("data-opportunity-id")
      );
      if (appliedOpportunities.has(opportunityId)) {
        alert("You have already applied for this opportunity!");
        return;
      }
      const opportunity = opportunities.find((op) => op.id === opportunityId);
      if (opportunity) {
        appliedOpportunities.add(opportunityId);
        addEventToCalendar(opportunity);
        saveUserData();
        e.target.textContent = "Applied";
        e.target.disabled = true;
        alert(
          `Successfully applied for ${opportunity.title}! Check your calendar for the upcoming event.`
        );
      }
    }
  });
});
const grid = document.getElementById("opportunityGrid");
const searchInput = document.getElementById("searchInput");
const categorySelect = document.getElementById("categorySelect");

function renderOpportunities(filtered = opportunities) {
  grid.innerHTML = "";

  if (filtered.length === 0) {
    grid.innerHTML = "<p>No opportunities found.</p>";
    return;
  }

  filtered.forEach((op) => {
    const card = document.createElement("div");
    card.className = "opportunity-card";
    card.innerHTML = `
<img src="${op.image}" alt="${op.title}" />
<h3>${op.title}</h3>
<p><strong>Category:</strong> ${op.category}</p>
<p><strong>Organization:</strong> ${op.organization}</p>
<p>${op.description}</p>
<p><strong>Location:</strong> ${op.location}</p>
<p><strong>Next Date:</strong> ${new Date(op.nextDate).toLocaleString()}</p>
`;
    grid.appendChild(card);
  });
}

function filterOpportunities() {
  const keyword = searchInput.value.toLowerCase();
  const selectedCategory = categorySelect.value;

  const filtered = opportunities.filter((op) => {
    const matchesKeyword =
      op.title.toLowerCase().includes(keyword) ||
      op.organization.toLowerCase().includes(keyword);

    const matchesCategory =
      selectedCategory === "" || op.category === selectedCategory;

    return matchesKeyword && matchesCategory;
  });

  renderOpportunities(filtered);
}

renderOpportunities();

searchInput.addEventListener("input", filterOpportunities);
categorySelect.addEventListener("change", filterOpportunities);
