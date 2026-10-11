(function () {
    "use strict";

    var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
    var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };

    /* Footer year */
    var year = $("#year");
    if (year) year.textContent = new Date().getFullYear();

    /* Header turns solid after scrolling */
    var header = $(".site-header");
    var links = $$('.nav a[href^="#"]').filter(function (a) { return a.getAttribute("href").length > 1; });
    function onScroll() {
        header.classList.toggle("scrolled", window.scrollY > 40);
        if (window.scrollY < 200) links.forEach(function (l) { l.removeAttribute("aria-current"); });
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    /* Mobile menu */
    var menuBtn = $(".menu-btn");
    var nav = $("#nav");
    function setMenu(open) {
        nav.classList.toggle("open", open);
        menuBtn.setAttribute("aria-expanded", String(open));
        menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    }
    menuBtn.addEventListener("click", function () { setMenu(!nav.classList.contains("open")); });
    nav.addEventListener("click", function (e) { if (e.target.closest("a")) setMenu(false); });
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && nav.classList.contains("open")) { setMenu(false); menuBtn.focus(); }
    });
    var desktop = window.matchMedia("(min-width: 820px)");
    var onDesktop = function (e) { if (e.matches) setMenu(false); };
    if (desktop.addEventListener) desktop.addEventListener("change", onDesktop);
    else if (desktop.addListener) desktop.addListener(onDesktop);

    /* Highlight the nav link of the section being read */
    if ("IntersectionObserver" in window) {
        var byId = {};
        links.forEach(function (a) { byId[a.getAttribute("href").slice(1)] = a; });
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (en) {
                var a = byId[en.target.id];
                if (!a || !en.isIntersecting || window.scrollY < 200) return;
                links.forEach(function (l) { l.removeAttribute("aria-current"); });
                a.setAttribute("aria-current", "true");
            });
        }, { rootMargin: "-45% 0px -50% 0px" });
        Object.keys(byId).forEach(function (id) {
            var section = document.getElementById(id);
            if (section) io.observe(section);
        });
    }

    /* Scale the live previews to fit their frames */
    $$(".shot-view").forEach(function (view) {
        function fit() { view.style.setProperty("--scale", (view.clientWidth / 1280).toFixed(4)); }
        fit();
        if ("ResizeObserver" in window) new ResizeObserver(fit).observe(view);
        else window.addEventListener("resize", fit);
    });

    /* Contact form: opens the visitor's email app with the message filled in */
    var form = $("#contactForm");
    var status = $("#formStatus");
    if (form) {
        var nameEl = $("#fromName"), emailEl = $("#fromEmail"), messageEl = $("#fromMessage");
        var fields = [nameEl, emailEl, messageEl];

        form.addEventListener("submit", function (e) {
            e.preventDefault();
            fields.forEach(function (f) { f.removeAttribute("aria-invalid"); });

            var name = nameEl.value.trim();
            var email = emailEl.value.trim();
            var message = messageEl.value.trim();

            var bad = null;
            if (!name) bad = nameEl;
            else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) bad = emailEl;
            else if (!message) bad = messageEl;

            if (bad) {
                bad.setAttribute("aria-invalid", "true");
                status.textContent = bad === emailEl
                    ? "Enter a valid email address, such as name@example.com."
                    : "Fill in your " + (bad === nameEl ? "name" : "message") + " and send again.";
                bad.focus();
                return;
            }

            var to = form.getAttribute("data-to");
            if (!to || to.indexOf("example.com") !== -1) {
                status.textContent = "The site owner has not set an email address yet. Open index.html and replace you@example.com.";
                return;
            }

            var subject = "Portfolio message from " + name;
            var body = message + "\n\n" + name + "\n" + email;
            window.location.href = "mailto:" + to + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
            status.textContent = "Your email app should open with the message ready to send. If nothing opens, write to " + to + " directly.";
        });
    }
})();
