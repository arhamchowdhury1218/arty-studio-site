document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.querySelector(".menu-toggle");
  var overlay = document.querySelector(".nav-overlay");
  var closeBtn = document.querySelector(".nav-close");

  if (toggle && overlay) {
    toggle.addEventListener("click", function () {
      overlay.classList.add("open");
      document.body.style.overflow = "hidden";
    });
  }
  if (closeBtn && overlay) {
    closeBtn.addEventListener("click", function () {
      overlay.classList.remove("open");
      document.body.style.overflow = "";
    });
  }
  overlay && overlay.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () {
      overlay.classList.remove("open");
      document.body.style.overflow = "";
    });
  });

  document.querySelectorAll(".accordion-item button").forEach(function (btn) {
    btn.addEventListener("click", function () {
      btn.parentElement.classList.toggle("open");
    });
  });

  var subscribeForms = document.querySelectorAll(".subscribe-form");
  subscribeForms.forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var btn = form.querySelector("button");
      if (btn) {
        var original = btn.textContent;
        btn.textContent = "Thanks!";
        setTimeout(function () { btn.textContent = original; }, 2500);
      }
      form.reset();
    });
  });

  var revealEls = document.querySelectorAll(".reveal, .reveal-scale");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("visible"); });
  }

  var parallaxImg = document.querySelector(".cta-band .cta-image img");
  if (parallaxImg) {
    var ticking = false;
    var updateParallax = function () {
      var rect = parallaxImg.parentElement.getBoundingClientRect();
      var vh = window.innerHeight;
      var progress = (vh - rect.top) / (vh + rect.height);
      progress = Math.max(0, Math.min(1, progress));
      var shift = (progress - 0.5) * 60;
      parallaxImg.style.transform = "translateY(" + shift + "px)";
      ticking = false;
    };
    window.addEventListener("scroll", function () {
      if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
      }
    }, { passive: true });
    updateParallax();
  }
});
