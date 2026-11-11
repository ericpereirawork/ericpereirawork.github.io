/* Renders the site from content.js. You should not need to edit this file. */
(function () {
  "use strict";
  var SITE = window.SITE;
  if (!SITE) return;
  var draft = !!(SITE.settings && SITE.settings.showUnpublished);
  var pendingCount = 0;

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
  function $(sel) { return document.querySelector(sel); }

  /* ---------- Link handling ---------- */
  function parseUrl(url) {
    try {
      var u = new URL(String(url).trim());
      return u.protocol === "https:" || u.protocol === "http:" ? u : null;
    } catch (e) { return null; }
  }
  function youTubeId(u) {
    var host = u.hostname.replace(/^(www|m|music)\./, "");
    var id = null, m;
    if (host === "youtu.be") id = u.pathname.split("/")[1];
    else if (host === "youtube.com" || host === "youtube-nocookie.com") {
      if (u.pathname === "/watch") id = u.searchParams.get("v");
      else if ((m = u.pathname.match(/^\/(?:shorts|embed|live)\/([^/?]+)/))) id = m[1];
    }
    return id && /^[\w-]{11}$/.test(id) ? id : null;
  }
  function isInstagram(u) { return /(^|\.)instagram\.com$/.test(u.hostname); }
  function isInstagramPost(u) { return /^\/(?:[\w.]+\/)?(?:reel|reels|p|tv)\/[\w-]+/.test(u.pathname); }

  // Returns { href, platform, thumb, ytId } or null when the item cannot be published.
  function resolve(item) {
    if (!item.url) return null;
    var u = parseUrl(item.url);
    if (item.cover === "none") item = Object.assign({}, item, { cover: "", noThumb: true });
    if (!u) { console.warn('[portfolio] "' + item.title + '": link is not a valid URL — left unpublished.'); return null; }
    var yt = youTubeId(u);
    if (yt) return { href: u.href, platform: "YouTube", ytId: yt, thumb: item.cover || "https://i.ytimg.com/vi/" + yt + "/maxresdefault.jpg" };
    if (isInstagram(u)) {
      if (!isInstagramPost(u)) {
        console.warn('[portfolio] "' + item.title + '": Instagram link must be an individual reel/post, not a profile — left unpublished.');
        return null;
      }
      return { href: u.href, platform: "Instagram", thumb: item.cover || "" };
    }
    if (u.hostname === "drive.google.com") {
      var d = u.pathname.match(/^\/file\/d\/([\w-]+)/);
      if (!d) { console.warn('[portfolio] "' + item.title + '": Google Drive link is not a single file — left unpublished.'); return null; }
      return { href: "https://drive.google.com/file/d/" + d[1] + "/view", platform: "Google Drive", thumb: item.cover || (item.noThumb ? "" : "https://drive.google.com/thumbnail?id=" + d[1] + "&sz=w1280") };
    }
    if (/youtube\.com$|youtu\.be$/.test(u.hostname)) {
      console.warn('[portfolio] "' + item.title + '": YouTube link is not a specific video — left unpublished.');
      return null;
    }
    return { href: u.href, platform: u.hostname.replace(/^www\./, ""), thumb: item.cover || "" };
  }
  window.__portfolioResolve = resolve; // exposed for testing

  /* ---------- Cards ---------- */
  function hue(str) {
    var h = 0;
    for (var i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) % 360;
    return h;
  }
  function fallback(item, note) {
    var f = el("div", "fallback");
    f.style.setProperty("--hue", hue(item.title));
    f.appendChild(el("span", "fallback-title", item.title));
    if (note) f.appendChild(el("span", "fallback-note", note));
    return f;
  }
  function card(item) {
    var link = resolve(item);
    if (!link && !draft) return null;
    if (!link) pendingCount++;

    var c = el("article", "card" + (link ? " live" : "") + (item.span ? " span2" : ""));
    var thumb = el("div", "thumb");
    if (link && link.thumb) {
      var img = el("img");
      img.alt = ""; img.loading = "lazy"; img.decoding = "async"; img.referrerPolicy = "no-referrer";
      img.addEventListener("load", function () {
        // YouTube serves a 120px grey placeholder when no HD thumbnail exists.
        if (link.ytId && !item.cover && img.naturalWidth <= 120 && img.src.indexOf("maxresdefault") > -1) {
          img.src = "https://i.ytimg.com/vi/" + link.ytId + "/hqdefault.jpg";
        }
      });
      img.addEventListener("error", function () {
        if (link.ytId && img.src.indexOf("maxresdefault") > -1) { img.src = "https://i.ytimg.com/vi/" + link.ytId + "/hqdefault.jpg"; return; }
        img.replaceWith(fallback(item, link.platform));
      });
      img.src = link.thumb;
      thumb.appendChild(img);
    } else {
      thumb.appendChild(fallback(item, link ? link.platform : "Cover pending"));
    }
    if (link) thumb.appendChild(el("span", "badge", link.platform));
    c.appendChild(thumb);

    var body = el("div", "card-body");
    body.appendChild(el("h4", "card-title", item.title));
    if (item.artist) body.appendChild(el("p", "card-artist", item.artist));
    if (item.role) {
      var r = el("p", "card-role");
      r.appendChild(el("b", null, "Role"));
      r.appendChild(document.createTextNode(item.role));
      body.appendChild(r);
    }
    if (link) {
      var a = el("a", "watch");
      a.href = link.href; a.target = "_blank"; a.rel = "noopener noreferrer";
      a.innerHTML = '<svg viewBox="0 0 12 12" aria-hidden="true"><path d="M2 1.2v9.6a.6.6 0 0 0 .9.5l8-4.8a.6.6 0 0 0 0-1L2.9.7a.6.6 0 0 0-.9.5z" fill="currentColor"/></svg>';
      a.appendChild(document.createTextNode("Watch"));
      a.setAttribute("aria-label", "Watch " + item.title + (item.artist ? ", " + item.artist : "") + " on " + link.platform + " (opens in a new tab)");
      body.appendChild(a);
    } else {
      body.appendChild(el("span", "pending", "Link pending"));
    }
    c.appendChild(body);
    return c;
  }

  function row(cat, showHeading) {
    var cards = (cat.items || []).map(card).filter(Boolean);
    if (!cards.length && !draft) return null;

    var sec = el("section", "row reveal");
    sec.id = cat.id || "";
    var head = el("div", "row-head");
    var h = el("h3", null, showHeading ? cat.title : "");
    if (!showHeading) { h.textContent = "Projects"; }
    if (cards.length) h.appendChild(el("span", "row-count", String(cards.length)));
    head.appendChild(h);
    sec.appendChild(head);

    if (!cards.length) {
      sec.appendChild(el("p", "row-empty", "Nothing added yet — add links for this category in content.js."));
      return sec;
    }

    var rail = el("div", "rail" + (cat.layout === "tall" ? " tall" : ""));
    rail.tabIndex = 0;
    rail.setAttribute("role", "group");
    rail.setAttribute("aria-label", cat.title + " projects, scrollable");
    cards.forEach(function (c) { rail.appendChild(c); });

    var arrows = el("div", "row-arrows");
    var prev = el("button", null, "←"), next = el("button", null, "→");
    prev.type = next.type = "button";
    prev.setAttribute("aria-label", "Scroll " + cat.title + " back");
    next.setAttribute("aria-label", "Scroll " + cat.title + " forward");
    function step(dir) {
      var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      rail.scrollBy({ left: dir * rail.clientWidth * 0.8, behavior: reduce ? "auto" : "smooth" });
    }
    prev.addEventListener("click", function () { step(-1); });
    next.addEventListener("click", function () { step(1); });
    function sync() {
      var max = rail.scrollWidth - rail.clientWidth;
      arrows.hidden = max <= 4;
      prev.disabled = rail.scrollLeft <= 4;
      next.disabled = rail.scrollLeft >= max - 4;
    }
    rail.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    requestAnimationFrame(sync);
    arrows.appendChild(prev); arrows.appendChild(next);
    head.appendChild(arrows);

    sec.appendChild(rail);
    return sec;
  }

  /* ---------- Hero ---------- */
  var hero = SITE.hero || {};
  if (hero.name) $('[data-hero="name"]').textContent = hero.name;
  if (hero.tagline) $('[data-hero="tagline"]').textContent = hero.tagline;
  if (hero.quote) $('[data-hero="quote"]').textContent = "“" + hero.quote + "”";

  /* ---------- Work ---------- */
  var catWrap = $("[data-categories]"), chips = $("[data-chips]");
  (SITE.categories || []).forEach(function (cat) {
    var r = row(cat, true);
    if (!r) return;
    catWrap.appendChild(r);
    var li = el("li"), a = el("a", null, cat.title);
    a.href = "#" + cat.id;
    li.appendChild(a); chips.appendChild(li);
  });
  if (!catWrap.children.length) {
    catWrap.appendChild(el("p", "row-empty", "Projects will appear here soon."));
    chips.hidden = true;
  }

  /* ---------- AI Next ---------- */
  var ai = SITE.aiNext || { items: [] };
  var aiRows = ai.rows || [{ id: "ai-projects", title: "Projects", layout: ai.layout, items: ai.items }];
  var aiWrap = $("[data-ai]");
  aiRows.forEach(function (r) { var n = row(r, true); if (n) aiWrap.appendChild(n); });
  if (!aiWrap.children.length) { $("#ai-next").hidden = true; var aiNav = $('.nav-links a[href="#ai-next"]'); if (aiNav) aiNav.parentNode.hidden = true; }

  /* ---------- About ---------- */
  var about = $("[data-about]");
  ((SITE.about && SITE.about.paragraphs) || []).forEach(function (p) { about.appendChild(el("p", null, p)); });

  /* ---------- Contact ---------- */
  var c = SITE.contact || {}, list = $("[data-contact]"), any = false;
  function contactBtn(label, href, opts) {
    var a = el("a", "btn " + (opts && opts.primary ? "btn-primary" : "btn-glass"), label);
    a.href = href;
    if (opts && opts.external) { a.target = "_blank"; a.rel = "noopener noreferrer"; }
    if (opts && opts.download) a.setAttribute("download", "");
    list.appendChild(a); any = true;
  }
  if (c.email) contactBtn(c.email, "mailto:" + c.email, { primary: true });
  if (c.phone) contactBtn(c.phone, "tel:" + c.phone.replace(/[^\d+]/g, ""));
  if (c.whatsapp && parseUrl(c.whatsapp)) contactBtn("WhatsApp", c.whatsapp, { external: true });
  if (c.linkedin && parseUrl(c.linkedin)) contactBtn("LinkedIn", c.linkedin, { external: true });
  if (c.instagram && parseUrl(c.instagram)) contactBtn("Instagram", c.instagram, { external: true });
  if (c.resume) contactBtn("Download résumé", c.resume, { download: true });
  if (any) {
    $("[data-hero-contact]").hidden = false;
  } else if (draft) {
    list.appendChild(el("p", "contact-note", "Contact details and résumé will appear here once they are added in content.js."));
  } else {
    $("#contact").hidden = true;
    $("[data-nav-contact]").hidden = true;
  }

  /* ---------- Draft notice, year ---------- */
  if (draft && pendingCount) {
    var pill = $("[data-draft]");
    pill.textContent = "Draft preview · " + pendingCount + " project" + (pendingCount === 1 ? "" : "s") + " awaiting links";
    pill.hidden = false;
  }
  $("[data-year]").textContent = new Date().getFullYear();

  /* ---------- Reveal + active nav ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var ro = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); ro.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -8% 0px" });
    reveals.forEach(function (n) { ro.observe(n); });

    var navLinks = {};
    document.querySelectorAll(".nav-links a").forEach(function (a) { navLinks[a.getAttribute("href").slice(1)] = a; });
    var so = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        var a = navLinks[e.target.id];
        if (!a) return;
        if (e.isIntersecting) {
          Object.keys(navLinks).forEach(function (k) { navLinks[k].removeAttribute("aria-current"); });
          a.setAttribute("aria-current", "true");
        } else if (a.getAttribute("aria-current")) a.removeAttribute("aria-current");
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    Object.keys(navLinks).forEach(function (id) { var s = document.getElementById(id); if (s) so.observe(s); });
  } else {
    reveals.forEach(function (n) { n.classList.add("in"); });
  }
})();
