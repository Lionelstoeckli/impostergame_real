let players = [];
let currentPlayerIndex = 0;
let imposterIndex = -1;
let chosenWord = '';
let chosenStarterIndex = -1;

const wordPool = [
    "Pizza", "Kaktus", "Vulkan", "Banane", "Schnee", "Raumschiff", "Tiger",
    "Pyramide", "Zug", "Fernseher", "Brille", "Giraffe", "Strand", "Geist", "Ballon",
    "Schlüssel", "Lampe", "Katze", "Roboter", "Dschungel", "Eisberg", "Wüste",
    "Krokodil", "Spiegel", "Hexe", "Stuhl", "Papier", "Rakete", "Toaster", "Besen",
    "Mikrofon", "Koffer", "Insel", "Magnet", "Sturm", "Schloss", "Krone",
    "Berg", "Fußball", "Zahnbürste", "Laptop", "Elefant", "Autobahn", "Gesicht",
    "Schmetterling", "Handschuh", "Löwe", "Schlange", "Flugzeug", "Dinosaurier",
    "Uhr", "Trommel", "Seil", "Kamera", "Treppe", "Rakete", "Kerze", "Monster",
    "Zauberer", "Buch", "Bleistift", "Eimer", "Pinsel", "Drache", "Schuh", "Gabel",
    "Helm", "Brücke", "Kanu", "Pfanne", "Wal", "Wolke", "Feuerwehr", "Zelt",
    "Kissen", "Kuh", "Karotte", "Walze", "Telefon", "Planet", "Kristall", "Leiter",
    "Schere", "Kuchen", "Geige", "Besen", "Fernrohr", "Papagei", "Garten", "Höhle",
    "Traktor", "Meteor", "Tunnel", "Robbe", "Zirkus", "Wikinger", "Känguru", "Nebel",
    "Krake", "Pinsel", "Bagger", "Blume", "Auge", "Waschmaschine", "Schneemann",
    "Tintenfisch", "König", "Schwamm", "Raketenrucksack", "Roboterarm", "Mala", "Fortnite",
    "Gti Fahrer", "Phasmophobia", "Stücki", "Box Box Box", "Minecraft", "Baum", "Elefantenrüssel",
    "Salamander", "Pinguin", "Jason", "Ritter", "Urlaub", "Durchgefallen", "Informatik", "Gruppen", "Kaiserpinguin",
    "Pokemon", "GTAV", "Fussball", "Tasche", "Krokodil", "Emojies", "Beinhaare", "Sucuk", "Lamm", 
    "Bauchschmerzen", "PI", "Geister", "Römer", "Russland", "Ukraine", "Deutschland", "Merkel", "Trump",
    "Obama", "9/11", "Socken", "Fetisch", "Getränk", "Polizei", "Brutal", "Datenschutz", "Sprich Deutsch du Hurensohn",
    "Ikea", "Döner", "Amboss", "Hühnchen", "Goldene Scar","Clash of Clans", "Gangbang", "Katze", "Hund",
    "Kevin", "Nabelschnur", "Hinterherlaufen", "Chatgpt", "Battlepass", "Skin", "Gold Gold Gold", "Eier"
  ];

function addPlayer() {
  const nameInput = document.getElementById("playerName");
  const name = nameInput.value.trim();
  if (name === '') return;

  if (players.includes(name)) {
    alert("Name existiert bereits!");
    return;
  }

  players.push(name);
  nameInput.value = '';
  updatePlayerList();
}

function updatePlayerList() {
  const list = document.getElementById("playerList");
  list.innerHTML = '';
  players.forEach((name, index) => {
    const div = document.createElement('div');
    div.textContent = name + " ";
    const delBtn = document.createElement('button');
    delBtn.textContent = "❌";
    delBtn.style.backgroundColor = "#dc3545";
    delBtn.onclick = () => {
      players.splice(index, 1);
      updatePlayerList();
    };
    div.appendChild(delBtn);
    list.appendChild(div);
  });
}

function startGame() {
  if (players.length < 3) {
    alert("Mindestens 3 Spieler erforderlich!");
    return;
  }

  chosenWord = wordPool[Math.floor(Math.random() * wordPool.length)];
  imposterIndex = Math.floor(Math.random() * players.length);
  chosenStarterIndex = Math.floor(Math.random() * players.length);
  currentPlayerIndex = 0;

  document.getElementById("setupScreen").classList.add("hidden");
  showTransitionScreen();
}

function showTransitionScreen() {
  if (currentPlayerIndex < players.length) {
    document.getElementById("nextPlayerName").textContent = players[currentPlayerIndex];
    document.getElementById("transitionScreen").classList.remove("hidden");
    document.getElementById("playerScreen").classList.add("hidden");
    document.getElementById("endScreen").classList.add("hidden");
  } else {
    showEndScreen();
  }
}

function showPlayerScreen() {
  const name = players[currentPlayerIndex];
  const isImposter = currentPlayerIndex === imposterIndex;

  document.getElementById("currentPlayerName").textContent = name;
  document.getElementById("wordDisplay").textContent = isImposter
    ? "❗ Du bist der Imposter! Versuche das Wort zu erraten."
    : `🔐 Dein Wort ist: "${chosenWord}"`;

  document.getElementById("playerScreen").classList.remove("hidden");
  document.getElementById("transitionScreen").classList.add("hidden");
}

function nextPlayer() {
  currentPlayerIndex++;
  showTransitionScreen();
}

function showEndScreen() {
  document.getElementById("playerScreen").classList.add("hidden");
  document.getElementById("transitionScreen").classList.add("hidden");
  document.getElementById("endScreen").classList.remove("hidden");

  const starter = players[chosenStarterIndex];
  document.getElementById("starterName").textContent = starter;
}

function restartGame() {
  chosenWord = wordPool[Math.floor(Math.random() * wordPool.length)];
  imposterIndex = Math.floor(Math.random() * players.length);
  chosenStarterIndex = Math.floor(Math.random() * players.length);
  currentPlayerIndex = 0;
  showTransitionScreen();
}

function goHome() {
  players = [];
  currentPlayerIndex = 0;
  document.getElementById("playerList").innerHTML = '';
  document.getElementById("setupScreen").classList.remove("hidden");
  document.getElementById("transitionScreen").classList.add("hidden");
  document.getElementById("playerScreen").classList.add("hidden");
  document.getElementById("endScreen").classList.add("hidden");
}
