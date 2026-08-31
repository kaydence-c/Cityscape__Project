const cards = {
  people: [
    {
      title: "Maya, 24",
      kicker: "People",
      distance: "2 mi",
      match: "92%",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=85",
      alt: "Maya smiling outdoors",
      description:
        "New to Austin, always down for live music, thrift runs, and trying the taco place everyone keeps talking about.",
      tags: ["Live music", "Thrifting", "Tacos"],
      mutual: "3 mutual interests",
    },
    {
      title: "Jordan, 26",
      kicker: "People",
      distance: "4 mi",
      match: "87%",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=85",
      alt: "Jordan smiling at the camera",
      description:
        "Designer, casual climber, serious coffee person. Looking for a trivia team that can laugh at losing.",
      tags: ["Climbing", "Coffee", "Trivia"],
      mutual: "2 mutual interests",
    },
  ],
  plans: [
    {
      title: "Indie Night",
      kicker: "Tonight · 7:30 PM",
      distance: "$18",
      match: "96%",
      image: "assets/Concert.png",
      alt: "Crowd at a colorful live concert",
      description:
        "Three local bands, an outdoor stage, and a group from CityScape already heading over.",
      tags: ["Concert", "21+", "East Austin"],
      mutual: "5 people are interested",
    },
    {
      title: "Sunday Run Club",
      kicker: "Sunday · 9:00 AM",
      distance: "Free",
      match: "84%",
      image:
        "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=900&q=85",
      alt: "Friends running together outdoors",
      description:
        "A friendly three-mile loop around Lady Bird Lake. All paces welcome, coffee afterward.",
      tags: ["Outdoors", "Beginner friendly", "Coffee"],
      mutual: "12 people are interested",
    },
  ],
  places: [
    {
      title: "Paperboy",
      kicker: "East Austin · Brunch",
      distance: "1.8 mi",
      match: "89%",
      image:
        "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=900&q=85",
      alt: "Warm neighborhood cafe",
      description:
        "Sunny rooftop, excellent pancakes, and the kind of coffee worth leaving the house for.",
      tags: ["Brunch", "Patio", "Coffee"],
      mutual: "4 friends saved this",
    },
    {
      title: "Laguna Gloria",
      kicker: "West Austin · Art",
      distance: "5 mi",
      match: "82%",
      image:
        "https://images.unsplash.com/photo-1561214115-f2f134cc4912?auto=format&fit=crop&w=900&q=85",
      alt: "Art gallery with paintings",
      description:
        "Sculpture gardens, lakeside paths, and a quiet afternoon plan when downtown feels too loud.",
      tags: ["Art", "Outdoors", "Under $15"],
      mutual: "2 friends saved this",
    },
  ],
};

const modeNotes = {
  people: "Connect over something you already have in common.",
  plans: "Add it to your week, then see who else wants to go.",
  places: "Save it to your bucket list and make a plan later.",
};

let currentMode = "people";
let currentIndex = 0;
let savedCount = 2;

const elements = {
  card: document.querySelector("#discovery-card"),
  image: document.querySelector("#card-image"),
  title: document.querySelector("#card-title"),
  kicker: document.querySelector("#card-kicker"),
  distance: document.querySelector("#card-distance"),
  match: document.querySelector("#match-value"),
  description: document.querySelector("#card-description"),
  tags: document.querySelector("#tag-list"),
  mutual: document.querySelector("#mutual-text"),
  note: document.querySelector("#mode-note"),
  count: document.querySelector("#saved-count"),
  schedule: document.querySelector("#schedule-list"),
  toast: document.querySelector("#toast"),
};

function renderCard() {
  const card = cards[currentMode][currentIndex];
  elements.image.src = card.image;
  elements.image.alt = card.alt;
  elements.title.textContent = card.title;
  elements.kicker.textContent = card.kicker;
  elements.distance.textContent = card.distance;
  elements.match.textContent = card.match;
  elements.description.textContent = card.description;
  elements.mutual.textContent = card.mutual;
  elements.note.textContent = modeNotes[currentMode];
  elements.tags.innerHTML = card.tags
    .map((tag) => `<span class="tag">${tag}</span>`)
    .join("");
}

function nextCard(direction) {
  elements.card.classList.add(
    direction === "save" ? "exit-right" : "exit-left",
  );
  window.setTimeout(() => {
    currentIndex = (currentIndex + 1) % cards[currentMode].length;
    renderCard();
    elements.card.classList.remove("exit-left", "exit-right");
  }, 220);
}

function showToast(message) {
  elements.toast.textContent = message;
  elements.toast.classList.add("show");
  window.setTimeout(() => elements.toast.classList.remove("show"), 1800);
}

document.querySelectorAll(".mode-tab").forEach((button) =>
  button.addEventListener("click", () => {
    currentMode = button.dataset.mode;
    currentIndex = 0;
    document.querySelectorAll(".mode-tab").forEach((tab) => {
      const selected = tab === button;
      tab.classList.toggle("active", selected);
      tab.setAttribute("aria-pressed", selected);
    });
    renderCard();
  }),
);

document.querySelector("#pass-button").addEventListener("click", () => {
  showToast("Passed — showing another option");
  nextCard("pass");
});
document.querySelector("#save-button").addEventListener("click", () => {
  const card = cards[currentMode][currentIndex];
  savedCount += 1;
  elements.count.textContent = savedCount;
  const item = document.createElement("article");
  item.className = "schedule-card pink saved-new";
  item.innerHTML = `<div class="date-block"><strong>NEW</strong><span>SAVED</span></div><div><p class="schedule-type">${currentMode}</p><h3>${card.title}</h3><p>Just added from discovery</p></div><button type="button">•••</button>`;
  elements.schedule.prepend(item);
  showToast(`${card.title} saved to My Stuff ♥`);
  nextCard("save");
});
document
  .querySelector("#details-button")
  .addEventListener("click", () =>
    showToast("Full profiles can come in version two"),
  );
document.querySelector("#filter-button").addEventListener("click", (event) => {
  const button = event.currentTarget;
  button.classList.toggle("active");
  button.setAttribute("aria-pressed", button.classList.contains("active"));
  showToast(
    button.classList.contains("active")
      ? "Personalized picks are on"
      : "Showing all nearby picks",
  );
});
document
  .querySelectorAll("[data-open-stuff]")
  .forEach((button) =>
    button.addEventListener("click", () =>
      document.querySelector("#my-stuff").scrollIntoView(),
    ),
  );
renderCard();
