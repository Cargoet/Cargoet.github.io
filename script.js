// Coordonnées et informations à afficher
var markers = [
  {
    X1: 1000,
    Y1: 500,
    X2: 1100,
    Y2: 550,
    Info: "72"
  },
  {
    X1: 10,
    Y1: 50,
    X2: 110,
    Y2: 55,
    Info: "72"
  },
  {
    X1: 17429,
    Y1: 9218,
    X2: 17465,
    Y2: 9242,
    Info: "72"
  }
];

// Récupérer l'élément contenant la carte
var map = document.getElementById("map");
var mapImage = map.querySelector("img");

// Variables pour le déplacement de la carte
var isDragging = false;
var mouseStartX = 0;
var mouseStartY = 0;
var mapStartX = 0;
var mapStartY = 0;

// Parcourir les marqueurs et créer les zones sensibles
markers.forEach(function(marker, index) {
  var infoBox = document.createElement("div");
  infoBox.className = "info-box";
  infoBox.textContent = marker.Info;
  infoBox.style.left = marker.X1 + (marker.X2 - marker.X1) / 2 + "px";
  infoBox.style.top = marker.Y1 + (marker.Y2 - marker.Y1) / 2 + "px";

  var infoMarker = document.createElement("img");
  infoMarker.src = "marker.png"; // Spécifiez le chemin de votre image de marqueur
  infoMarker.className = "info-marker";
  infoMarker.style.left = marker.X1 + (marker.X2 - marker.X1) / 2 + "px";
  infoMarker.style.top = marker.Y1 + (marker.Y2 - marker.Y1) / 2 + "px";

  infoMarker.addEventListener("mouseover", function() {
    infoBox.style.display = "block";
  });

  infoMarker.addEventListener("mouseout", function() {
    infoBox.style.display = "none";
  });

  map.appendChild(infoMarker);
  map.appendChild(infoBox);
});

// Gestionnaires d'événements pour le déplacement de la carte
map.addEventListener("mousedown", function(event) {
  isDragging = true;
  mouseStartX = event.clientX;
  mouseStartY = event.clientY;
  mapStartX = map.scrollLeft;
  mapStartY = map.scrollTop;
  event.preventDefault(); // Empêcher la sélection de texte lors du déplacement de la carte
});

map.addEventListener("mousemove", function(event) {
  if (isDragging) {
    var deltaX = event.clientX - mouseStartX;
    var deltaY = event.clientY - mouseStartY;

    map.scrollLeft = mapStartX - deltaX;
    map.scrollTop = mapStartY - deltaY;
  }
});

map.addEventListener("mouseup", function() {
  isDragging = false;
});

// Gestionnaire d'événements pour la molette de la souris
map.addEventListener("wheel", function(event) {
  event.preventDefault(); // Empêcher le comportement par défaut de la molette

  var mapImage = document.getElementById("map-image");
  var mouseX = event.clientX - map.getBoundingClientRect().left;
  var mouseY = event.clientY - map.getBoundingClientRect().top;

  // Facteur de zoom pour ajuster la vitesse de zoom
  var zoomFactor = 0.1;

  // Calculer le facteur de zoom en fonction de la direction de la molette
  var zoomDelta = event.deltaY > 0 ? -zoomFactor : zoomFactor;

  // Calculer les nouvelles dimensions de l'image
  var newWidth = mapImage.width * (1 + zoomDelta);
  var newHeight = mapImage.height * (1 + zoomDelta);

  // Calculer les coordonnées du point de l'image sur lequel la souris est positionnée
  var mouseXRatio = mouseX / mapImage.width;
  var mouseYRatio = mouseY / mapImage.height;

  // Calculer les nouvelles coordonnées de défilement pour centrer le zoom sur le point de la souris
  var scrollLeft = (map.scrollLeft + mouseX) * (newWidth / mapImage.width) - mouseX;
  var scrollTop = (map.scrollTop + mouseY) * (newHeight / mapImage.height) - mouseY;

  // Appliquer le zoom en modifiant les dimensions de l'image
  mapImage.style.width = newWidth + "px";
  mapImage.style.height = newHeight + "px";

  // Définir les nouvelles coordonnées de défilement pour centrer le zoom
  map.scrollLeft = scrollLeft;
  map.scrollTop = scrollTop;
});
