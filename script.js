const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');


hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    navLinks.classList.toggle('show');
});

navLinks.addEventListener('click', (e) => {
    e.stopPropagation();
});


document.addEventListener('click', () => {
    navLinks.classList.remove('show');
});





let userData = null;
let userEvents = [];
let appliedOpportunities = new Set();

const opportunities = [
    {
        id: 1,
        title: "Food Bank Assistant",
        category: "Hunger Relief",
        description: "Help sort and distribute food to families in need. Join our compassionate team making a direct impact on hunger in our community.",
        hours: "4 hours/week",
        location: "Downtown",
        organization: "Community Food Bank",
        nextDate: new Date(2025, 5, 13, 9, 0),
        duration: 4,
        skills: ["Cooking", "Administrative"],
        image: "https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?w=800&h=600&fit=crop",
    },
    {
        id: 2,
        title: "Animal Shelter Volunteer",
        category: "Animal Care",
        description: "Care for rescued animals by feeding, walking, and providing companionship. Help these furry friends find their forever homes.",
        hours: "6 hours/week",
        location: "North Side",
        organization: "Happy Paws Shelter",
        nextDate: new Date(2025, 5, 14, 10, 0),
        duration: 6,
        skills: ["Animal Care", "Manual Labor"],
        image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&h=600&fit=crop",
    },
    {
        id: 3,
        title: "Youth Mentor",
        category: "Education & Mentorship",
        description: "Guide and inspire young people through educational activities and life skills development. Be the positive influence they need.",
        hours: "3 hours/week",
        location: "Community Center",
        organization: "Youth Development Center",
        nextDate: new Date(2025, 5, 16, 15, 0),
        duration: 3,
        skills: ["Teaching", "Mentoring"],
        image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=600&fit=crop",
    },
    {
        id: 4,
        title: "Senior Companion",
        category: "Elderly Support",
        description: "Provide friendship and assistance to elderly community members. Share stories, play games, and brighten their day.",
        hours: "2 hours/week",
        location: "Various Locations",
        organization: "Golden Years Care",
        nextDate: new Date(2025, 5, 15, 14, 0),
        duration: 2,
        skills: ["Healthcare", "Administrative"],
        image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&h=600&fit=crop",
    },
    {
        id: 5,
        title: "Environmental Cleanup",
        category: "Environment",
        description: "Join our team in cleaning parks, beaches, and natural areas. Help preserve the environment for future generations.",
        hours: "5 hours/week",
        location: "City Parks",
        organization: "Green Earth Initiative",
        nextDate: new Date(2025, 5, 15, 8, 0),
        duration: 5,
        skills: ["Manual Labor", "Gardening"],
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
    },
    {
        id: 6,
        title: "Reading Tutor",
        category: "Education & Mentorship",
        description: "Help children develop reading skills and foster a love for learning. Make education accessible and enjoyable for all.",
        hours: "4 hours/week",
        location: "Local Schools",
        organization: "Literacy Foundation",
        nextDate: new Date(2025, 5, 17, 15, 0),
        duration: 4,
        skills: ["Teaching", "Mentoring"],
        image: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=800&h=600&fit=crop",
    },
    {
        id: 7,
        title: "Community Garden Helper",
        category: "Sustainability",
        description: "Grow fresh produce for local food banks while teaching sustainable gardening practices to community members.",
        hours: "3 hours/week",
        location: "Riverside Community Garden",
        organization: "Urban Harvest Project",
        nextDate: new Date(2025, 5, 19, 16, 0),
        duration: 3,
        skills: ["Gardening", "Teaching"],
        image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=600&fit=crop",
    },
    {
        id: 8,
        title: "Homeless Shelter Support",
        category: "Homelessness",
        description: "Provide meals, organize donations, and offer support services to individuals experiencing homelessness in our community.",
        hours: "5 hours/week",
        location: "Central Shelter",
        organization: "Safe Haven Outreach",
        nextDate: new Date(2025, 5, 20, 11, 0),
        duration: 5,
        skills: ["Cooking", "Administrative"],
        image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&h=600&fit=crop",
    },
];
const sampleReviews = [
    {
        org: "Community Food Bank",
        rating: "5",
        reviewText: "Amazing organization! They make such a difference in our community. The staff is incredibly supportive and the work is truly meaningful.",
        user: "Riya",
        date: "June 14, 2025"
    },
    {
        org: "Happy Paws Shelter",
        rating: "4",
        reviewText: "Love volunteering here! The animals are adorable and the team really cares about their welfare. It's such a rewarding experience.",
        user: "Rahul",
        date: "June 14, 2025"
    },
    {
        org: "Youth Development Center",
        rating: "5",
        reviewText: "Working with young people here has been life-changing. The mentorship programs are well-structured and you can see real impact.",
        user: "Shreya",
        date: "June 13, 2025"
    },
    {
        org: "Green Earth Initiative",
        rating: "4",
        reviewText: "Great environmental work! Love participating in the cleanup drives and community gardening projects. Making our city greener one step at a time.",
        user: "Piyush",
        date: "June 13, 2025"
    },
    {
        org: "Literacy Foundation",
        rating: "5",
        reviewText: "Teaching reading skills to children is so fulfilling. The foundation provides excellent training and resources for volunteers.",
        user: "Riya",
        date: "June 11, 2025"
    },
    {
        org: "Golden Years Care",
        rating: "4",
        reviewText: "Spending time with elderly community members is incredibly rewarding. Their stories and wisdom are inspiring.",
        user: "Rahul",
        date: "June 11 , 2025"
    }
];

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
        password: existing.password || "",
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

function createOpportunityCard(opportunity) {
    const card = document.createElement("div");
    card.className = "opportunity-card";

    const isApplied = appliedOpportunities.has(opportunity.id);


    const skillsHTML = opportunity.skills ?
        `<div class="skills-required">
<div class="skills-list">
${opportunity.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
</div>
</div>` : '';

    card.innerHTML = `
<div class="opportunity-card-content">
<img src="${opportunity.image}" alt="${opportunity.title}" />
<h3>${opportunity.title}</h3>
<p>${opportunity.description}</p>
<div class="opportunity-category">${opportunity.category}</div>
<div class="opportunity-details">
<div><i class="fas fa-clock"></i> ${opportunity.hours}</div>
<div><i class="fas fa-map-marker-alt"></i> ${opportunity.location}</div>
<div><i class="fas fa-building"></i> ${opportunity.organization}</div>
</div>
${skillsHTML}
<button class="apply-btn ${isApplied ? "applied" : ""}"
data-opportunity-id="${opportunity.id}"
${isApplied ? "disabled" : ""}>
${isApplied ? "Applied" : "Apply Now"}
</button>
</div>
`;

    return card;
}

function generateOpportunityCards() {
    const grid = document.getElementById("opportunityGrid");
    if (!grid) return;

    grid.innerHTML = "";
    opportunities.forEach((opportunity) => {
        const card = createOpportunityCard(opportunity);
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
    if (!eventsContainer) return;

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

    if (!totalHoursEl || !totalOrganizationsEl || !totalEventsEl) return;

    const totalHours = userEvents.reduce((sum, event) => sum + event.duration, 0);
    const uniqueOrganizations = new Set(userEvents.map((event) => event.organization));

    totalHoursEl.textContent = totalHours;
    totalOrganizationsEl.textContent = uniqueOrganizations.size;
    totalEventsEl.textContent = userEvents.length;
}

function displayReviews() {
    const reviewList = document.getElementById("reviewList");
    if (!reviewList) return;


    const userReviews = JSON.parse(localStorage.getItem("reviews")) || [];


    const allReviews = [...userReviews, ...sampleReviews];

    reviewList.innerHTML = "";

    if (allReviews.length === 0) {
        reviewList.innerHTML = "<p>No reviews yet. Be the first to write one!</p>";
        return;
    }

    allReviews.forEach((review) => {
        const card = document.createElement("div");
        card.className = "review-card";
        card.innerHTML = `
<h4>Organization: <span class="org-name">${review.org}</span></h4>
<p><strong>Rating:</strong> ${"⭐".repeat(parseInt(review.rating))}</p>
<p class="review-text">"${review.reviewText}"</p>
<small class="review-footer">— <strong>${review.user}</strong>, ${review.date}</small>
`;
        reviewList.appendChild(card);
    });
}


function updateReviewFormVisibility() {
    const reviewFormContainer = document.getElementById("reviewFormContainer");
    if (!reviewFormContainer) return;

    if (userData && userData.username) {
        reviewFormContainer.style.display = "block";
    } else {
        reviewFormContainer.style.display = "none";
    }
}

function filterOpportunities() {
    const searchInput = document.getElementById("searchInput");
    const categorySelect = document.getElementById("categorySelect");
    const skillsSelect = document.getElementById("skillsSelect");

    if (!searchInput || !categorySelect || !skillsSelect) return;

    const keyword = searchInput.value.toLowerCase();
    const selectedCategory = categorySelect.value;
    const selectedSkill = skillsSelect.value;

    const filtered = opportunities.filter((op) => {
        const matchesKeyword =
            op.title.toLowerCase().includes(keyword) ||
            op.organization.toLowerCase().includes(keyword) ||
            op.description.toLowerCase().includes(keyword);

        const matchesCategory = selectedCategory === "" || op.category === selectedCategory;

        const matchesSkill = selectedSkill === "" ||
            (op.skills && op.skills.includes(selectedSkill));

        return matchesKeyword && matchesCategory && matchesSkill;
    });

    renderOpportunities(filtered);
}

function renderOpportunities(filtered = opportunities) {
    const grid = document.getElementById("opportunityGrid");
    if (!grid) return;

    grid.innerHTML = "";

    if (filtered.length === 0) {
        grid.innerHTML = '<p style="text-align: center; color: #666;">No opportunities found matching your criteria.</p>';
        return;
    }

    filtered.forEach((op) => {
        const card = createOpportunityCard(op);
        grid.appendChild(card);
    });
}

function openLoginModal() {
    const modal = document.getElementById("loginModal");
    if (modal) {
        modal.style.display = "flex";
    }
}



function switchToLogin() {
    const loginModal = document.getElementById("loginModal");
    const signupModal = document.getElementById("signupModal");

    if (signupModal) signupModal.style.display = "none";
    if (loginModal) loginModal.style.display = "flex";
}

function updateAuthUI() {
    const authButtons = document.getElementById("authButtons");
    const userGreeting = document.getElementById("userGreeting");
    const usernameDisplay = document.getElementById("usernameDisplay");

    if (!authButtons || !userGreeting || !usernameDisplay) return;

    if (userData && userData.username) {
        authButtons.style.display = "none";
        userGreeting.style.display = "block";
        usernameDisplay.textContent = userData.username;
        updateReviewFormVisibility();
    } else {
        authButtons.style.display = "block";
        userGreeting.style.display = "none";
        updateReviewFormVisibility();
    }
}

function logout() {
    userData = null;
    userEvents = [];
    appliedOpportunities = new Set();
    updateAuthUI();
    updateCalendarDisplay();
    updateStats();
    generateOpportunityCards();


    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => modal.style.display = 'none');
}


document.addEventListener("DOMContentLoaded", function () {

    generateOpportunityCards();
    updateCalendarDisplay();
    updateStats();
    displayReviews();
    updateAuthUI();


    const searchInput = document.getElementById("searchInput");
    const categorySelect = document.getElementById("categorySelect");
    const skillsSelect = document.getElementById("skillsSelect");

    if (searchInput) {
        searchInput.addEventListener("input", filterOpportunities);
    }
    if (categorySelect) {
        categorySelect.addEventListener("change", filterOpportunities);
    }
    if (skillsSelect) {
        skillsSelect.addEventListener("change", filterOpportunities);
    }


    document.addEventListener("click", function (e) {
        if (e.target.classList.contains("apply-btn") && !e.target.disabled) {
            if (!userData || !userData.username) {
                alert("Please login to apply for opportunities.");
                openLoginModal();
                return;
            }

            const opportunityId = parseInt(e.target.dataset.opportunityId);
            const opportunity = opportunities.find((op) => op.id === opportunityId);

            if (opportunity) {
                appliedOpportunities.add(opportunityId);
                addEventToCalendar(opportunity);
                e.target.textContent = "Applied";
                e.target.classList.add("applied");
                e.target.disabled = true;
                alert(`Successfully applied for ${opportunity.title}!`);
            }
        }
    });


    const loginModal = document.getElementById("loginModal");
    const signupModal = document.getElementById("signupModal");
    const openLoginBtn = document.getElementById("openLogin");
    const openSignupBtn = document.getElementById("openSignup");
    const logoutBtn = document.getElementById("logoutButton");


    if (openLoginBtn) {
        openLoginBtn.addEventListener("click", openLoginModal);
    }
    if (openSignupBtn) {
        openSignupBtn.addEventListener("click", function () {
            if (signupModal) signupModal.style.display = "flex";
        });
    }


    if (logoutBtn) {
        logoutBtn.addEventListener("click", logout);
    }


    document.addEventListener("click", function (e) {
        if (e.target.classList.contains("close-button")) {
            const modal = e.target.closest(".modal");
            if (modal) modal.style.display = "none";
        }
        if (e.target.classList.contains("modal")) {
            e.target.style.display = "none";
        }
    });


    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const email = document.getElementById("loginEmail").value;
            const password = document.getElementById("loginPassword").value;


            const userKey = `userData-${email}`;
            const savedUser = JSON.parse(localStorage.getItem(userKey));

            if (savedUser && savedUser.password === password) {
                userData = {
                    username: savedUser.username,
                    email: savedUser.email,
                    skills: savedUser.skills || []
                };
                loadUserData();
                updateAuthUI();
                updateCalendarDisplay();
                updateStats();
                generateOpportunityCards();
                loginModal.style.display = "none";
                alert(`Welcome back, ${userData.username}!`);
            } else {
                alert("Invalid email or password. Please try again.");
            }
        });
    }


    const signupForm = document.getElementById("signupForm");
    if (signupForm) {
        signupForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const username = document.getElementById("signupUsername").value;
            const email = document.getElementById("signupEmail").value;
            const password = document.getElementById("signupPassword").value;
            const skillsSelect = document.getElementById("signupSkills");
            const selectedSkills = Array.from(skillsSelect.selectedOptions).map(option => option.value);


            const userKey = `userData-${email}`;
            if (localStorage.getItem(userKey)) {
                alert("An account with this email already exists. Please login instead.");
                return;
            }


            userData = {
                username: username,
                email: email,
                skills: selectedSkills
            };


            const userInfo = {
                username: username,
                email: email,
                password: password,
                skills: selectedSkills,
                events: [],
                opportunities: []
            };
            localStorage.setItem(userKey, JSON.stringify(userInfo));

            updateAuthUI();
            signupModal.style.display = "none";
            alert(`Welcome, ${username}! Your account has been created successfully.`);
        });
    }


    const reviewForm = document.getElementById("reviewForm");
    if (reviewForm) {
        reviewForm.addEventListener("submit", function (e) {
            e.preventDefault();

            if (!userData || !userData.username) {
                alert("Please login to submit a review.");
                return;
            }

            const org = document.getElementById("orgSelect").value;
            const rating = document.getElementById("rating").value;
            const reviewText = document.getElementById("reviewText").value;

            const review = {
                org: org,
                rating: rating,
                reviewText: reviewText,
                user: userData.username,
                date: new Date().toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                })
            };


            const reviews = JSON.parse(localStorage.getItem("reviews")) || [];
            reviews.unshift(review);
            localStorage.setItem("reviews", JSON.stringify(reviews));


            reviewForm.reset();

            displayReviews();

            alert("Thank you for your review!");
        });
    }


    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                navLinks.classList.remove('show');
            }
        });
    });


    renderOpportunities();
});

function switchToSignup() {
    const loginModal = document.getElementById("loginModal");
    const signupModal = document.getElementById("signupModal");

    if (loginModal) loginModal.style.display = "none";
    if (signupModal) signupModal.style.display = "flex";
}

window.switchToSignup = switchToSignup
window.openLoginModal = openLoginModal;
window.switchToSignup = switchToSignup;
window.switchToLogin = switchToLogin;
