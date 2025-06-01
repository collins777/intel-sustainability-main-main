// Scroll to timeline section with smooth animation when arrow is clicked
document.addEventListener("DOMContentLoaded", function () {
  var arrow = document.getElementById("downArrow");
  if (arrow) {
    arrow.addEventListener("click", function () {
      var timelineSection = document.querySelector("section");
      if (timelineSection) {
        timelineSection.scrollIntoView({ behavior: "smooth" });
      }
      // Animate arrow on click
      arrow.classList.add("arrow-clicked");
      setTimeout(function () {
        arrow.classList.remove("arrow-clicked");
      }, 500);
    });
  }
});
// Mobile: Toggle .active on timeline-card to show/hide overlay p
function isMobile() {
  return window.matchMedia("(max-width: 600px)").matches;
}

document.addEventListener("DOMContentLoaded", function () {
  var cards = document.querySelectorAll(".timeline-card");
  cards.forEach(function (card) {
    card.addEventListener("click", function (e) {
      if (isMobile()) {
        // Remove .active from all cards except this one
        cards.forEach(function (c) {
          if (c !== card) c.classList.remove("active");
        });
        card.classList.toggle("active");
      }
    });
  });
});

// GOOGLE TRANSLATE RTL DETECTION SCRIPT

// This script checks if the page language is right-to-left (RTL)
// and updates the 'dir' attribute on the <html> element accordingly.
// It works with Google Translate and updates dynamically.

// List of RTL language codes
var rtlLangs = ["ar", "he", "fa", "ur"];

function updateDirForLang() {
  // Try to detect the language from Google Translate or <html lang="">
  var html = document.documentElement;
  var lang =
    html.getAttribute("lang") ||
    (window.google &&
      window.google.translate &&
      window.google.translate.getPageLanguage &&
      window.google.translate.getPageLanguage()) ||
    "";

  // Google Translate may set a cookie with the language code
  var gtCookie = document.cookie.match(/googtrans=\/[a-z]{2}\/([a-z]{2})/i);
  if (gtCookie && gtCookie[1]) {
    lang = gtCookie[1];
  }

  // If the language is RTL, set dir="rtl", else dir="ltr"
  if (rtlLangs.indexOf(lang) !== -1) {
    html.setAttribute("dir", "rtl");
  } else {
    html.setAttribute("dir", "ltr");
  }
}

// Run on page load
updateDirForLang();

// Listen for Google Translate events (if available)
document.addEventListener("DOMSubtreeModified", function (e) {
  // Check if the translation changed
  updateDirForLang();
});

// Also check periodically in case Google Translate changes without events
setInterval(updateDirForLang, 1000);
