/* ============================================
   RELATORIO VANTT — ANIMATIONS
   ============================================ */

document.addEventListener("DOMContentLoaded", function () {
  // Fade-in on scroll
  var fadeElements = document.querySelectorAll(".fade-in");
  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );

  fadeElements.forEach(function (el) {
    observer.observe(el);
  });

  // Animate impact bars on scroll
  var bars = document.querySelectorAll(".impact-bar-fill");
  var barObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.width = entry.target.getAttribute("data-width");
          barObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  bars.forEach(function (bar) {
    bar.style.width = "0%";
    barObserver.observe(bar);
  });

  // Animate score numbers counting up
  var scoreElements = document.querySelectorAll(".score-after[data-target]");
  var scoreObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateNumber(entry.target);
          scoreObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  scoreElements.forEach(function (el) {
    scoreObserver.observe(el);
  });

  function animateNumber(el) {
    var target = parseInt(el.getAttribute("data-target"), 10);
    var start = parseInt(el.getAttribute("data-start") || "0", 10);
    var duration = 1200;
    var startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = Math.round(start + (target - start) * eased);
      el.textContent = current;
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }

  // Animate big numbers
  var bigNumbers = document.querySelectorAll(".big-number[data-target]");
  var numObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateBigNumber(entry.target);
          numObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  bigNumbers.forEach(function (el) {
    numObserver.observe(el);
  });

  function animateBigNumber(el) {
    var target = el.getAttribute("data-target");
    var suffix = el.getAttribute("data-suffix") || "";
    var numTarget = parseFloat(target);
    var duration = 1500;
    var startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = (numTarget * eased).toFixed(
        target.includes(".") ? 1 : 0
      );
      el.textContent = current + suffix;
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }
});
