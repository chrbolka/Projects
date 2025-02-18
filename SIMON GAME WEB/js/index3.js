var zluteaudio = new Audio("sounds/yellow.mp3");
var cerveneaudio = new Audio("sounds/red.mp3");
var modreaudio = new Audio("sounds/blue.mp3");
var zeleneaudio = new Audio("sounds/green.mp3");
var gameOveraudio = new Audio("sounds/wrong.mp3");

var nahodne = 0;
var level = 0;
var isGame = false;
var pole_nahodne = [];
var pole_uzivatel = [];
var pocet_prvku = 0;
var kliknuti = 0;

function stiskCervene() {
  cerveneaudio.play();
  $(".redbox").fadeOut(200);
  $(".redbox").fadeIn(200);
}
function stiskZelene() {
  zeleneaudio.play();
  $(".greenbox").fadeOut(200);
  $(".greenbox").fadeIn(200);
}
function stiskZlute() {
  zluteaudio.play();
  $(".yellowbox").fadeOut(200);
  $(".yellowbox").fadeIn(200);
}
function stiskModre() {
  modreaudio.play();
  $(".bluebox").fadeOut(200);
  $(".bluebox").fadeIn(200);
}

function nahodneCislo() {
  return Math.floor(Math.random() * (4 - 1 + 1)) + 1;
}

function gameOver() {
  gameOveraudio.play();
  $("body").removeClass("pozadi_clasic");
  $("body").addClass("pozadigameover");
  document.querySelector(".nadpis").textContent = "Game Over!";
}

function generujSekvenci() {
  nahodne = nahodneCislo();
  pole_nahodne.push(nahodne);

  console.log("Uživatel " + pole_uzivatel);
  console.log("Nahodne  " + pole_nahodne);

  setTimeout(() => {
    if (nahodne == 1) {
      stiskZelene();
    }
    if (nahodne == 2) {
      stiskCervene();
    }
    if (nahodne == 3) {
      stiskZlute();
    }
    if (nahodne == 4) {
      stiskModre();
    }
  }, 250);

  pocet_prvku++;
  console.log(pocet_prvku);

  document.querySelector(".instrukce").textContent = "Level " + level;
}

$(document).ready(function () {
  $(".nadpis").hide().fadeIn(2000);
  $(".nazevhry").hide().fadeIn(3000);

  $(".bluebox").slideUp(100);
  $(".greenbox").slideUp(200);
  $(".redbox").slideUp(100);
  $(".yellowbox").slideUp(400);

  $(".bluebox").slideDown(200);
  $(".greenbox").slideDown(100);
  $(".redbox").slideDown(300);
  $(".yellowbox").slideDown(400);
});

function zacniHru() {
  generujSekvenci();

  document.addEventListener("click", handleClick);

  function handleClick(event) {
    kliknuti++;

    if (event.target.classList.contains("redbox")) {
      stiskCervene();
      pole_uzivatel.push(2);

      if (pole_uzivatel[kliknuti - 1] !== pole_nahodne[kliknuti - 1]) {
        document.removeEventListener("click", handleClick);
        gameOver();
      }
    }
    if (event.target.classList.contains("greenbox")) {
      stiskZelene();
      pole_uzivatel.push(1);
      if (pole_uzivatel[kliknuti - 1] !== pole_nahodne[kliknuti - 1]) {
        document.removeEventListener("click", handleClick);
        gameOver();
      }
    }
    if (event.target.classList.contains("yellowbox")) {
      stiskZlute();
      pole_uzivatel.push(3);
      if (pole_uzivatel[kliknuti - 1] !== pole_nahodne[kliknuti - 1]) {
        document.removeEventListener("click", handleClick);
        gameOver();
      }
    }
    if (event.target.classList.contains("bluebox")) {
      stiskModre();
      pole_uzivatel.push(4);
      if (pole_uzivatel[kliknuti - 1] !== pole_nahodne[kliknuti - 1]) {
        document.removeEventListener("click", handleClick);
        gameOver();
      }
    }

    if (pole_nahodne.length == kliknuti) {
      kliknuti = 0;
      generujSekvenci();
      pole_uzivatel = [];
      level++;
    }
  }

  let posledniPrvek = pole_nahodne[pole_nahodne.length - 1];
}

function cekamNaStartHry() {
  document.querySelector(".instrukce").textContent =
    "Začněte kliknutím kdekoli na stránce...";

  if ("!isGame") {
    document.addEventListener("click", function startGame() {
      isGame = true;
      level = 1;

      document.querySelector(".instrukce").textContent =
        "...hra právě začala...";

      document.removeEventListener("click", startGame);

      if (isGame) zacniHru();
    });
  }
}

cekamNaStartHry();
