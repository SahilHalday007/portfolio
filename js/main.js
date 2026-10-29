(function () {
  "use strict";

  /* ============================================================
     daily click counter store (shared by browser and node tests)
     ============================================================ */
  function makeCounterStore(win) {
    var KEY = "sh007_cat_clicks";

    function localDateStr(d) {
      d = d || new Date();
      var m = ("0" + (d.getMonth() + 1)).slice(-2);
      var day = ("0" + d.getDate()).slice(-2);
      return d.getFullYear() + "-" + m + "-" + day;
    }

    function read() {
      try {
        var raw = win.localStorage.getItem(KEY);
        if (!raw) return null;
        var data = JSON.parse(raw);
        if (!data || typeof data.date !== "string" || typeof data.count !== "number" || !isFinite(data.count)) return null;
        return data;
      } catch (err) {
        return null;
      }
    }

    function write(date, count) {
      try {
        win.localStorage.setItem(KEY, JSON.stringify({ date: date, count: count }));
        return true;
      } catch (err) {
        return false;
      }
    }

    function todayCount() {
      var today = localDateStr();
      var data = read();
      if (!data || data.date !== today) return 0;
      return Math.max(0, Math.floor(data.count));
    }

    function bump() {
      var today = localDateStr();
      var count = todayCount() + 1;
      write(today, count);
      return count;
    }

    return { read: read, write: write, todayCount: todayCount, bump: bump, localDateStr: localDateStr };
  }

  if (typeof module !== "undefined" && module.exports) module.exports = makeCounterStore;

  if (typeof document === "undefined") {
    var assert = require("assert");
    var fakeStorage = null;
    var store = makeCounterStore({
      localStorage: {
        getItem: function () { return fakeStorage; },
        setItem: function (k, v) { fakeStorage = v; }
      }
    });

    assert.strictEqual(store.todayCount(), 0, "empty storage starts at 0");
    assert.strictEqual(store.bump(), 1, "first bump is 1");
    assert.strictEqual(store.bump(), 2, "second bump is 2");
    store.write("1999-01-01", 41);
    assert.strictEqual(store.todayCount(), 0, "stale date resets to 0");
    assert.strictEqual(store.bump(), 1, "bump after reset is 1");
    fakeStorage = "{not json";
    assert.strictEqual(store.todayCount(), 0, "malformed storage returns 0");
    store.write(store.localDateStr(new Date()), -5);
    assert.strictEqual(store.todayCount(), 0, "negative counts clamp to 0");
    assert.ok(/^\d{4}-\d{2}-\d{2}$/.test(store.localDateStr(new Date())), "date format is YYYY-MM-DD");
    console.log("PASS: counter self-check (fresh, bump, stale-reset, malformed, clamp, format)");
    return;
  }

  document.documentElement.classList.remove("no-js");
  document.documentElement.classList.add("js");

  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  /* ============================================================
     mobile nav
     ============================================================ */
  var navToggle = $("#nav-toggle");
  var mobileNav = $("#mobile-nav");

  function closeMobileNav() {
    navToggle.setAttribute("aria-expanded", "false");
    mobileNav.hidden = true;
  }

  if (navToggle && mobileNav) {
    navToggle.addEventListener("click", function () {
      var open = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!open));
      mobileNav.hidden = open;
    });
    $$("a", mobileNav).forEach(function (a) {
      a.addEventListener("click", closeMobileNav);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !mobileNav.hidden) closeMobileNav();
    });
  }

  /* ============================================================
     scroll progress
     ============================================================ */
  var progress = $("#scroll-progress");
  if (progress) {
    var onScrollProgress = function () {
      var doc = document.documentElement;
      var max = doc.scrollHeight - doc.clientHeight;
      progress.style.width = (max > 0 ? (doc.scrollTop / max) * 100 : 0) + "%";
    };
    window.addEventListener("scroll", onScrollProgress, { passive: true });
    onScrollProgress();
  }

  /* ============================================================
     scroll reveals
     ============================================================ */
  var reveals = $$(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    var ioAlive = false;
    var revealObserver = new IntersectionObserver(function (entries) {
      ioAlive = true;
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });
    reveals.forEach(function (el) { revealObserver.observe(el); });
    // safety net: never leave content hidden if IO never delivers
    setTimeout(function () {
      if (!ioAlive) {
        reveals.forEach(function (el) { el.classList.add("is-visible"); });
      }
    }, 2500);
  } else {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ============================================================
     active nav highlight
     ============================================================ */
  var navLinks = $$(".site-nav a");
  var sections = navLinks.map(function (a) {
    return document.getElementById(a.getAttribute("href").slice(1));
  }).filter(Boolean);
  if ("IntersectionObserver" in window && sections.length) {
    var navObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (a) {
          a.classList.toggle("is-active", a.getAttribute("href") === "#" + entry.target.id);
        });
      });
    }, { rootMargin: "-35% 0px -55% 0px" });
    sections.forEach(function (s) { navObserver.observe(s); });
  }

  /* ============================================================
     project notes (progressive disclosure)
     ============================================================ */
  $$(".details-toggle").forEach(function (btn) {
    var panel = document.getElementById(btn.getAttribute("aria-controls"));
    if (!panel) return;
    btn.addEventListener("click", function () {
      var open = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!open));
      panel.hidden = open;
    });
  });

  /* ============================================================
     terminal
     ============================================================ */
  var termOutput = $("#term-output");
  var termInput = $("#term-input");
  var termLive = $("#term-live");

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function printLine(cls, html) {
    var p = document.createElement("p");
    p.className = "term-line " + (cls || "") + " new";
    p.innerHTML = html;
    termOutput.appendChild(p);
    termOutput.scrollTop = termOutput.scrollHeight;
  }

  function printCmd(raw) {
    printLine("cmd", '<span class="t-prompt">sahil@tanzania:~$</span> ' + esc(raw));
  }

  function announce(msg) {
    if (termLive) termLive.textContent = msg;
  }

  function scrollToSection(id) {
    var target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  var CMD = {
    help: function () {
      return [
        { cls: "gap", html: "<span class='t-strong'>available commands</span>" },
        { cls: "dim", html: "  help        list commands" },
        { cls: "dim", html: "  whoami      who I am, in one screen" },
        { cls: "dim", html: "  about       my background &amp; philosophy" },
        { cls: "dim", html: "  projects    jump to selected work" },
        { cls: "dim", html: "  stack       the toolbox" },
        { cls: "dim", html: "  contact     ways to reach me" },
        { cls: "dim", html: "  cat         the resident pet" },
        { cls: "dim", html: "  clear       wipe this terminal" },
        { cls: "dim", html: "tip: press ESC to clear the input line" }
      ];
    },
    whoami: function () {
      return [
        { cls: "", html: "<span class='t-strong'>sahil halday007</span> — embedded systems &amp; ai engineer" },
        { cls: "dim", html: "technical trainer @ toio · based in tanzania" },
        { cls: "dim", html: "works across: ai · full-stack · edtech · ar · cv · hardware" }
      ];
    },
    about: function () {
      scrollToSection("about");
      return [
        { cls: "ok", html: "scrolling to [03] ABOUT …" }
      ];
    },
    projects: function () {
      scrollToSection("work");
      return [
        { cls: "", html: "selected public repositories:" },
        { cls: "dim", html: "  senseplay_analytics_engine · toio_games · fablab-management-system" },
        { cls: "dim", html: "  toio-edugame · geospatial-ar · quiz_generator · opencv_game_development" },
        { cls: "ok", html: "scrolling to [02] SELECTED WORK …" }
      ];
    },
    stack: function () {
      scrollToSection("capabilities");
      return [
        { cls: "", html: "<span class='t-strong'>frontend</span>   react · typescript · javascript · tailwind · vite" },
        { cls: "", html: "<span class='t-strong'>backend</span>    python · fastapi · node.js · express · groq" },
        { cls: "", html: "<span class='t-strong'>data</span>      postgresql · supabase · redis · pgvector · celery" },
        { cls: "", html: "<span class='t-strong'>hw &amp; vision</span> arduino · makey makey · opencv · a-frame · ar.js" },
        { cls: "ok", html: "scrolling to [04] CAPABILITIES …" }
      ];
    },
    contact: function () {
      scrollToSection("contact");
      return [
        { cls: "", html: "email: <a href='mailto:sahil@toio.or.tz'>sahil@toio.or.tz</a>" },
        { cls: "", html: "github: <a href='https://github.com/SahilHalday007' rel='noopener'>github.com/SahilHalday007</a>" },
        { cls: "ok", html: "scrolling to [05] CONTACT …" }
      ];
    },
    cat: function () {
      return [
        { cls: "", html: "<span class='t-strong'>there's a cat on this page.</span> bottom-right corner. it counts your clicks (locally, this device only). go pet it." }
      ];
    },
    ls: function () {
      return [
        { cls: "", html: "about/  work/  capabilities/  contact/  cat/" },
        { cls: "dim", html: "7 public repositories linked under work/" }
      ];
    },
    sudo: function () {
      return [
        { cls: "err", html: "permission denied: you are not in the sudoers file. this incident will not be reported." }
      ];
    },
    clear: function () {
      while (termOutput.firstChild) termOutput.removeChild(termOutput.firstChild);
      return null;
    }
  };

  function boot() {
    printLine("dim", "welcome to the sahiltop 9000 — a friendly terminal for a human-friendly site");
    printLine("dim", "type <span class='t-strong'>help</span> and press enter, or tap a quick command below");
    printLine("", "<span class='t-strong'>current session:</span> explorer@your-device · read-only (it's a portfolio, after all)");
    printLine("gap", "<span class='t-prompt'>sahil@tanzania:~$</span> <span class='t-block' aria-hidden='true' style='display:inline-block;width:8px;height:14px;vertical-align:-2px;background:var(--cyan);animation:cursor-blink 1.1s steps(1) infinite'></span>");
  }

  function run(raw) {
    var cmd = raw.trim().toLowerCase();
    printCmd(raw);
    var handler = CMD[cmd] || null;
    var out;
    if (handler) {
      out = handler();
      if (out) out.forEach(function (l) { printLine(l.cls, l.html); });
      announce("Command " + raw.trim() + " executed");
    } else if (cmd) {
      printLine("err", "command not found: " + esc(raw.trim()) + " — try 'help'");
      announce("Unknown command. Try help.");
    }
  }

  if (termOutput && termInput) {
    boot();
    termInput.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        var raw = termInput.value;
        termInput.value = "";
        run(raw);
      } else if (e.key === "Escape") {
        termInput.value = "";
      }
    });
    termOutput.addEventListener("click", function () { termInput.focus(); });
    $$(".chip", $(".term-window")).forEach(function (chip) {
      chip.addEventListener("click", function () {
        var cmd = chip.getAttribute("data-cmd");
        termInput.value = cmd;
        run(cmd);
        termInput.value = "";
        termInput.focus();
      });
    });
  }

  /* ============================================================
     cat + daily local click counter
     ============================================================ */
  var CounterStore = makeCounterStore(window);

  var catButton = $("#cat-button");
  var catBubble = $("#cat-bubble");
  var catCounter = $("#cat-counter");
  var catWidget = $("#cat-widget");
  var bubbleTimer = null;

  var CAT_SAYINGS = [
    "purrr. <span class='t-strong'>+1 trust</span>",
    "*blink* I was watching the logs.",
    "meow is cat for hello.",
    "I keep the cursor company.",
    "clicking me compiles nothing, but it's fun.",
    "10 PRINT \"PURR\"; 20 GOTO 10",
    "grep -r 'cat' . — found me.",
    "feeding time is all the time.",
    "this terminal has excellent mice."
  ];

  function showBubble(msg, count) {
    catBubble.innerHTML = msg + "<span class='bubble-count'>YOUR CLICKS TODAY · THIS DEVICE: " + count + "</span>";
    catBubble.hidden = false;
    if (bubbleTimer) clearTimeout(bubbleTimer);
    bubbleTimer = setTimeout(function () { catBubble.hidden = true; }, 4200);
  }

  function react() {
    var count = CounterStore.bump();
    var msg = CAT_SAYINGS[Math.floor(Math.random() * CAT_SAYINGS.length)];

    catCounter.textContent = count;
    catCounter.classList.add("show");
    catCounter.classList.remove("bump");
    void catCounter.offsetWidth;
    catCounter.classList.add("bump");

    catButton.classList.remove("reacting");
    void catButton.offsetWidth;
    catButton.classList.add("reacting");

    showBubble(msg, count);
  }

  if (catButton && catBubble && catCounter && catWidget) {
    var initial = CounterStore.todayCount();
    if (initial > 0) {
      catCounter.textContent = initial;
      catCounter.classList.add("show");
    }
    catButton.addEventListener("click", react);
    catButton.addEventListener("animationend", function (e) {
      if (e.animationName === "cat-hop") catButton.classList.remove("reacting");
    });
  }
})();
