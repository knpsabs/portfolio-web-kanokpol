// ============================================================
// Main application logic
// ============================================================

(function () {
  "use strict";

  const worksData = window.worksData || [];
  const profile = window.profile || {};

  // ---------- Helpers ----------
  function el(tag, attrs = {}, children = []) {
    const node = document.createElement(tag);
    Object.entries(attrs).forEach(([k, v]) => {
      if (k === "class") node.className = v;
      else if (k === "html") node.innerHTML = v;
      else if (k.startsWith("on") && typeof v === "function") node.addEventListener(k.slice(2), v);
      else if (v !== null && v !== undefined) node.setAttribute(k, v);
    });
    (Array.isArray(children) ? children : [children]).forEach((c) => {
      if (c == null) return;
      node.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
    });
    return node;
  }

  const ZOOM_ICON = window.getIcon ? window.getIcon("zoom") : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/></svg>';
  const PLAY_ICON = window.getIcon ? window.getIcon("play") : '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';
  const CHECK_ICON = window.getIcon ? window.getIcon("check") : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>';

  // ---------- Set Hero Avatar ----------
  function setHeroAvatar() {
    if (profile.aboutImage) {
      const img = document.getElementById("heroAvatar");
      if (img) img.src = profile.aboutImage;
      const navImg = document.getElementById("navAvatar");
      if (navImg) navImg.src = profile.aboutImage;
    }
    // Inject About section icons
    const iconMap = {
      aboutIcon: "user",
      aboutUserIcon: "user",
      aboutIdIcon: "id-card",
      aboutGradIcon: "graduation",
      aboutContactIcon: "mail",
      aboutSkillsIcon: "award",
      aboutBookIcon: "book",
      aboutPhoneIcon: "phone",
      aboutMailIcon: "mail",
      aboutPinIcon: "map-pin",
      contactPhoneIcon: "phone",
      contactMailIcon: "mail",
      contactGithubIcon: "github",
      contactInstagramIcon: "instagram",
      contactFacebookIcon: "facebook",
      contactDiscordIcon: "discord",
    };
    Object.entries(iconMap).forEach(([id, name]) => {
      const node = document.getElementById(id);
      if (node) node.innerHTML = window.getIcon(name);
    });
    // Add body class for sidebar offset (เริ่มตั้งแต่แรก)
    document.body.classList.add("has-sidebar");
    document.getElementById("sideNav").classList.add("is-visible");
  }

  // ---------- Render Navigation ----------
  function renderNav() {
    const navItems = [
      { id: "hero", label: "Home", icon: "home" },
      { id: "about", label: "About", icon: "user" },
      ...worksData.map((w) => ({ id: w.id, label: w.titleEn || w.titleTh || w.title, icon: w.icon })),
      { id: "contact", label: "Contact", icon: "mail" },
    ];

    const navList = document.getElementById("navList");
    const mobileMenu = document.getElementById("mobileMenu");

    navItems.forEach((item) => {
      const iconSvg = item.icon ? window.getIcon(item.icon) : "";
      // Sidebar (desktop)
      navList.appendChild(
        el("li", {}, [
          el("a", { href: `#${item.id}`, "data-target": item.id }, [
            el("span", { class: "nav-icon", html: iconSvg }),
            el("span", { class: "nav-label" }, [item.label]),
          ]),
        ])
      );
      // Mobile
      mobileMenu.appendChild(
        el("a", { href: `#${item.id}`, "data-target": item.id }, [
          el("span", { class: "nav-icon", html: iconSvg }),
          el("span", { class: "nav-label" }, [item.label]),
        ])
      );
    });
  }

  // ---------- Render Works ----------
  function renderWorks() {
    const container = document.getElementById("worksContainer");

    worksData.forEach((category, catIndex) => {
      const section = el("section", { id: category.id, class: "work-section gs-fade" });
      const num = String(catIndex + 1).padStart(2, "0");
      section.appendChild(
        el("div", { class: "work-section__header" }, [
          el("span", { class: "work-section__num" }, [num]),
          el("span", { class: "work-section__icon", html: window.getIcon(category.icon || "sparkles") }),
          el("h2", { class: "work-section__title" }, [
            el("span", { class: "work-section__title-th" }, [category.titleTh || category.title]),
            el("span", { class: "work-section__title-en" }, [category.titleEn || ""]),
          ]),
          el("div", { class: "work-section__divider" }),
          el("p", { class: "work-section__subtitle" }, [
            el("span", { class: "work-section__subtitle-th" }, [category.subtitleTh || category.subtitle || ""]),
            category.subtitleEn ? el("span", { class: "work-section__subtitle-en" }, [category.subtitleEn]) : null,
          ]),
        ])
      );
      section.appendChild(el("span", { class: "work-section__watermark", "aria-hidden": "true" }, [num]));

      const inner = el("div", { class: "work-section__inner" });

      category.subcategories.forEach((sub) => {
        const subBlock = el("div", { class: "subcategory gs-fade" });
        const subIcon = sub.icon ? el("span", { class: "subcategory__icon", html: window.getIcon(sub.icon) }) : null;
        subBlock.appendChild(
          el("h3", { class: "subcategory__title" }, [
            ...(subIcon ? [subIcon] : []),
            el("div", { class: "subcategory__title-wrap" }, [
              el("span", { class: "subcategory__title-th" }, [sub.titleTh || sub.title]),
              sub.titleEn ? el("span", { class: "subcategory__title-en" }, [sub.titleEn]) : null,
            ]),
          ])
        );

        if (sub.type === "images") subBlock.appendChild(renderGallery(sub.items));
        else if (sub.type === "videos") subBlock.appendChild(renderVideos(sub.items, sub.orientation, sub.cols));
        else if (sub.type === "summary") subBlock.appendChild(renderSummary(sub.summary));
        else if (sub.type === "social-embed") subBlock.appendChild(renderSocialEmbed(sub));
        else if (sub.type === "social-pair") subBlock.appendChild(renderSocialPair(sub));

        inner.appendChild(subBlock);
      });

      inner.appendChild(el("div", { class: "work-section__sep" }));
      section.appendChild(inner);
      container.appendChild(section);
    });
  }

  // ---------- Image Gallery ----------
  function renderGallery(images) {
    const gallery = el("div", { class: "gallery" });
    images.forEach((img, i) => {
      const item = el("button", { class: "gallery__item", "aria-label": img.alt || img.title || `รูปที่ ${i + 1}` });
      item.__galleryImages = images;
      item.__galleryIndex = i;
      const src = img.thumb || img.src;
      const full = img.full || img.src;
      item.appendChild(el("img", { src, alt: img.alt || img.title || "", loading: "lazy" }));
      item.appendChild(el("div", { class: "gallery__item-overlay", html: ZOOM_ICON }));
      item.appendChild(el("div", { class: "gallery__counter" }, [`${i + 1}/${images.length}`]));
      item.addEventListener("click", () => openLightbox(images, i));
      gallery.appendChild(item);
    });
    return gallery;
  }

  // ---------- Videos (orientation-aware) ----------
  function renderVideos(videos, orientation, cols) {
    const isPortrait = orientation === "portrait";
    const gridClass = isPortrait ? "video-grid--portrait" : (cols ? "video-grid--2col" : "video-grid--landscape");
    const grid = el("div", { class: `video-grid ${gridClass}` });

    videos.forEach((v) => {
      const card = el("div", { class: "video-card" });
      const frameWrap = el("div", { class: `video-card__frame-wrap ${isPortrait ? "video-card__frame-wrap--portrait" : ""}` });
      const thumb = `https://drive.google.com/thumbnail?id=${v.id}&sz=${isPortrait ? "w600" : "w800"}`;

      // preload thumbnail เพื่อให้โหลดเร็ว
      const preloadImg = new Image();
      preloadImg.src = thumb;

      const previewBtn = el("button", { class: "video-card__preview", "aria-label": `เล่น ${v.title}`, style: `background-image: url('${thumb}')` });
      previewBtn.appendChild(el("div", { class: "video-card__play-icon", html: PLAY_ICON }));

      previewBtn.addEventListener("click", () => {
        // แสดง loading spinner
        frameWrap.innerHTML = "";
        const loader = el("div", { class: "video-card__loader" }, [
          el("div", { class: "video-card__spinner" }),
        ]);
        frameWrap.appendChild(loader);

        // สร้าง iframe (ซ่อนไว้ก่อน)
        const iframe = el("iframe", {
          src: `https://drive.google.com/file/d/${v.id}/preview?embedded=true&rm=minimal`,
          allow: "autoplay; fullscreen",
          allowfullscreen: "",
          style: "opacity:0;transition:opacity 0.5s ease;pointer-events:none;",
          loading: "lazy",
        });
        iframe.addEventListener("load", () => {
          // รอเพิ่มอีก 300ms ให้ Google Drive render เสร็จก่อนแสดง
          setTimeout(() => {
            loader.remove();
            iframe.style.opacity = "1";
            iframe.style.pointerEvents = "auto";
          }, 300);
        });
        frameWrap.appendChild(iframe);
      });

      frameWrap.appendChild(previewBtn);
      card.appendChild(frameWrap);
      const titleWrap = el("div", { class: "video-card__title" }, [
        el("span", { class: "video-card__title-th" }, [v.titleTh || v.title]),
        (v.titleEn && v.titleEn !== (v.titleTh || v.title))
          ? el("span", { class: "video-card__title-en" }, [v.titleEn])
          : null,
      ]);
      card.appendChild(titleWrap);
      grid.appendChild(card);
    });
    return grid;
  }

  // ---------- Summary (แทน PDF) ----------
  function renderSummary(summary) {
    const block = el("div", { class: "summary-card" });
    block.appendChild(
      el("div", { class: "summary-card__icon", html: window.getIcon(summary.icon || "check") })
    );
    block.appendChild(
      el("div", { class: "summary-card__body" }, [
        el("h4", { class: "summary-card__title" }, [
          el("span", { class: "summary-card__title-th" }, [summary.title]),
          summary.titleEn ? el("span", { class: "summary-card__title-en" }, [summary.titleEn]) : null,
        ]),
        el(
          "ul",
          { class: "summary-card__list" },
          summary.points.map((point) => {
            // แยกคู่ภาษาด้วย " / "
            const parts = point.split(" / ");
            const thPart = parts[0] || point;
            const enPart = parts.length > 1 ? parts.slice(1).join(" / ") : null;
            return el("li", { class: "summary-card__item" }, [
              el("span", { class: "summary-card__check", html: CHECK_ICON }),
              el("span", {}, [
                document.createTextNode(thPart),
                enPart ? el("span", { class: "en-part" }, [enPart]) : null,
              ]),
            ]);
          })
        ),
      ])
    );
    return block;
  }

  // ---------- Social Pair (IG + TikTok ข้างกัน) ----------
  function renderSocialPair(sub) {
    const grid = el("div", { class: "social-pair" });

    // Instagram card
    if (sub.instagram) {
      const igCard = el("div", { class: "social-pair__card social-pair__card--ig" });
      igCard.appendChild(
        el("div", { class: "social-pair__head" }, [
          el("span", { class: "social-pair__icon", html: window.getIcon("instagram") }),
          el("div", { class: "social-pair__label-wrap" }, [
            el("span", { class: "social-pair__label-th" }, [sub.instagram.titleTh]),
            sub.instagram.titleEn ? el("span", { class: "social-pair__label-en" }, [sub.instagram.titleEn]) : null,
          ]),
          el("span", { class: "social-pair__handle" }, [sub.instagram.handle]),
        ])
      );
      const igEmbed = el("div", { class: "social-pair__embed" });
      igEmbed._embedData = { type: "instagram", url: sub.instagram.url };
      igCard.appendChild(igEmbed);
      grid.appendChild(igCard);
    }

    // TikTok card
    if (sub.tiktok) {
      const ttCard = el("div", { class: "social-pair__card social-pair__card--tt" });
      ttCard.appendChild(
        el("div", { class: "social-pair__head" }, [
          el("span", { class: "social-pair__icon", html: window.getIcon("music") }),
          el("div", { class: "social-pair__label-wrap" }, [
            el("span", { class: "social-pair__label-th" }, [sub.tiktok.titleTh]),
            sub.tiktok.titleEn ? el("span", { class: "social-pair__label-en" }, [sub.tiktok.titleEn]) : null,
          ]),
          el("span", { class: "social-pair__handle" }, [sub.tiktok.handle]),
        ])
      );
      const ttEmbed = el("div", { class: "social-pair__embed" });
      ttEmbed._embedData = { type: "tiktok", url: sub.tiktok.url };
      ttCard.appendChild(ttEmbed);
      grid.appendChild(ttCard);
    }

    // Auto-load เมื่อเข้าใกล้
    if (sub.autoLoad) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // โหลด embeds ทั้งคู่
            grid.querySelectorAll(".social-pair__embed").forEach((embedEl) => {
              loadSingleEmbed(embedEl, embedEl._embedData);
            });
            observer.disconnect();
          }
        });
      }, { rootMargin: "200px" });
      setTimeout(() => observer.observe(grid), 100);
    }

    return grid;
  }

  // Helper: load a single embed into a container
  function loadSingleEmbed(container, data) {
    if (container.classList.contains("is-loaded")) return;
    container.classList.add("is-loaded");
    container.innerHTML = "";

    if (data.type === "instagram") {
      const blockquote = el("blockquote", {
        class: "instagram-media",
        "data-instgrm-permalink": data.url,
        "data-instgrm-version": "14",
        style: "background:#FFF;border:0;border-radius:12px;margin:0;max-width:540px;min-width:280px;padding:0;width:99.375%;",
      });
      container.appendChild(blockquote);
      loadEmbedScript("https://www.instagram.com/embed.js", () => {
        if (window.instgrm) window.instgrm.Embeds.process();
      });
    } else if (data.type === "tiktok") {
      const username = data.url.replace(/\/$/, "").split("@").pop();
      const iframe = el("iframe", {
        src: "https://www.tiktok.com/embed/@" + username,
        width: "100%",
        height: "580",
        frameborder: "0",
        scrolling: "no",
        allow: "encrypted-media",
        style: "border:none;max-width:340px;width:100%;border-radius:12px;",
      });
      container.appendChild(iframe);
    }

    container.appendChild(
      el("a", { href: data.url, target: "_blank", rel: "noopener", class: "social-pair__link" }, [
        data.type === "instagram" ? "เปิด Instagram →" : "เปิด TikTok →",
      ])
    );
  }

  // ---------- Social Embed (IG/TikTok real-time) ----------
  function renderSocialEmbed(sub) {
    const wrap = el("div", { class: "social-embed social-embed--" + sub.embedType });

    function loadEmbed() {
      if (wrap.classList.contains("social-embed--loaded")) return;
      wrap.innerHTML = "";
      wrap.classList.add("social-embed--loaded");

      if (sub.embedType === "instagram") {
        // Instagram: official oEmbed
        const blockquote = el("blockquote", {
          class: "instagram-media",
          "data-instgrm-permalink": sub.embedUrl,
          "data-instgrm-version": "14",
          style: "background:#FFF;border:0;border-radius:12px;margin:0;max-width:540px;min-width:326px;padding:0;width:99.375%;",
        });
        wrap.appendChild(blockquote);
        loadEmbedScript("https://www.instagram.com/embed.js", () => {
          if (window.instgrm) window.instgrm.Embeds.process();
        });
      } else if (sub.embedType === "tiktok") {
        // TikTok: official profile embed iframe
        // ดึง username จาก URL
        const username = sub.embedUrl.replace(/\/$/, "").split("@").pop();
        const iframe = el("iframe", {
          src: "https://www.tiktok.com/embed/@" + username,
          width: "100%",
          height: "580",
          frameborder: "0",
          scrolling: "no",
          allow: "encrypted-media",
          style: "border:none;max-width:340px;width:100%;border-radius:12px;",
        });
        wrap.appendChild(iframe);
      }

      wrap.appendChild(
        el("a", { href: sub.embedUrl, target: "_blank", rel: "noopener", class: "social-embed__link" }, [
          sub.embedType === "instagram" ? "เปิด Instagram แบบเต็ม →" : "เปิด TikTok แบบเต็ม →",
        ])
      );
    }

    if (sub.autoLoad) {
      // โหลดอัตโนมัติเมื่อ scroll เข้าใกล้
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            loadEmbed();
            observer.disconnect();
          }
        });
      }, { rootMargin: "200px" });
      setTimeout(() => observer.observe(wrap), 100);
    } else {
      // แสดงปุ่มให้คลิก
      const placeholder = el("button", { class: "social-embed__placeholder" }, [
        el("span", { class: "social-embed__placeholder-icon", html: window.getIcon(sub.icon === "instagram" ? "instagram" : "music") }),
        el("span", { class: "social-embed__placeholder-text" }, [
          el("span", { class: "social-embed__placeholder-title" }, [
            sub.embedType === "instagram" ? "ดูโปรไฟล์ Instagram" : "ดูโปรไฟล์ TikTok",
          ]),
          el("span", { class: "social-embed__placeholder-sub" }, ["คลิกเพื่อโหลดแบบ real-time"]),
        ]),
      ]);
      placeholder.addEventListener("click", loadEmbed);
      wrap.appendChild(placeholder);
    }

    return wrap;
  }

  // Helper: load embed script (lazy, only once)
  const loadedEmbedScripts = {};
  function loadEmbedScript(src, onLoad) {
    if (loadedEmbedScripts[src]) {
      if (onLoad) setTimeout(onLoad, 200);
      return;
    }
    loadedEmbedScripts[src] = true;
    const s = document.createElement("script");
    s.src = src;
    s.async = true;
    if (onLoad) s.onload = onLoad;
    document.body.appendChild(s);
  }

  // ---------- Lightbox ----------
  let currentLightboxImages = [];
  let currentLightboxIndex = 0;

  function openLightbox(images, index) {
    currentLightboxImages = images;
    currentLightboxIndex = index;
    updateLightbox();
    document.getElementById("lightbox").hidden = false;
    document.body.style.overflow = "hidden";
  }
  function closeLightbox() {
    document.getElementById("lightbox").hidden = true;
    document.body.style.overflow = "";
  }
  function lightboxNext() {
    currentLightboxIndex = (currentLightboxIndex + 1) % currentLightboxImages.length;
    updateLightbox();
  }
  function lightboxPrev() {
    currentLightboxIndex = (currentLightboxIndex - 1 + currentLightboxImages.length) % currentLightboxImages.length;
    updateLightbox();
  }
  function updateLightbox() {
    const wrap = document.getElementById("lightboxImageWrap");
    const img = currentLightboxImages[currentLightboxIndex];
    wrap.innerHTML = "";
    const full = img.full || img.src;
    wrap.appendChild(el("img", { src: full, alt: img.alt || "Preview" }));
    document.getElementById("lightboxCounter").textContent = `${currentLightboxIndex + 1} / ${currentLightboxImages.length}`;
  }

  // ---------- Smooth scroll ----------
  function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener("click", (e) => {
        const href = link.getAttribute("href");
        if (href === "#") return;
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth" });
          document.getElementById("mobileMenu").classList.remove("open");
          document.getElementById("hamburgerBtn").classList.remove("open");
        }
      });
    });
  }

  // ---------- Chapter navigation ----------
  function setupChapterNavigation() {
    const ids = ["hero", "about", ...worksData.map((work) => work.id), "contact"];
    const chapters = ids.map((id) => document.getElementById(id)).filter(Boolean);
    const previous = document.getElementById("previousChapter");
    const next = document.getElementById("nextChapter");

    const currentIndex = () => {
      let index = 0;
      chapters.forEach((chapter, i) => {
        if (chapter.getBoundingClientRect().top <= window.innerHeight * 0.45) index = i;
      });
      return index;
    };
    const goTo = (direction) => {
      const target = chapters[currentIndex() + direction];
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    previous.addEventListener("click", () => goTo(-1));
    next.addEventListener("click", () => goTo(1));
  }

  // ---------- Active section ----------
  function setupActiveSection() {
    const sections = [{ id: "hero" }, { id: "about" }, ...worksData.map((w) => ({ id: w.id })), { id: "contact" }];

    const onScroll = () => {
      const scrolled = window.scrollY > 50;
      document.querySelector(".mobile-nav").classList.toggle("scrolled", scrolled);

      let current = "hero";
      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = document.getElementById(sections[i].id);
        if (sec) {
          const rect = sec.getBoundingClientRect();
          if (rect.top <= 120) { current = sections[i].id; break; }
        }
      }

      document.querySelectorAll('.side-nav a, .mobile-menu a').forEach((a) => {
        a.classList.toggle("active", a.getAttribute("data-target") === current);
      });

      const labelEl = document.getElementById("mobileActiveLabel");
      if (labelEl) {
        let labelText = "";
        if (current === "hero") labelText = "Home";
        else if (current === "about") labelText = "About";
        else if (current === "contact") labelText = "Contact";
        else {
          const d = worksData.find((w) => w.id === current);
          labelText = d ? (d.titleEn || d.titleTh || d.title) : "";
        }
        labelEl.textContent = labelText;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  function setupHamburger() {
    const btn = document.getElementById("hamburgerBtn");
    const menu = document.getElementById("mobileMenu");
    btn.addEventListener("click", () => {
      btn.classList.toggle("open");
      menu.classList.toggle("open");
    });
  }

  // ---------- Scroll progress bar ----------
  function setupScrollProgress() {
    const bar = document.getElementById("scrollProgress");
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      if (bar) bar.style.width = percent + "%";
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // ---------- Typewriter for hero tag ----------
  function setupTypewriter() {
    const el = document.getElementById("heroTagText");
    if (!el) return;
    const phrases = [
      "PORTFOLIO",
      "DATA ANALYSIS",
      "MARKETING",
      "MHOK",
    ];
    let phraseIdx = 0;
    let charIdx = 0;
    let isDeleting = false;

    function tick() {
      const current = phrases[phraseIdx];
      if (isDeleting) {
        charIdx--;
        el.textContent = current.substring(0, charIdx);
        if (charIdx === 0) {
          isDeleting = false;
          phraseIdx = (phraseIdx + 1) % phrases.length;
          setTimeout(tick, 400);
          return;
        }
        setTimeout(tick, 50);
      } else {
        charIdx++;
        el.textContent = current.substring(0, charIdx);
        if (charIdx === current.length) {
          isDeleting = true;
          setTimeout(tick, 1800);
          return;
        }
        setTimeout(tick, 90);
      }
    }
    setTimeout(tick, 800);
  }

  // ---------- Magnetic buttons (ปุ่มหลุดตามเมาส์เล็กน้อย) ----------
  function setupMagnetic() {
    const targets = document.querySelectorAll(".btn, .contact-card, .social-pair__link");
    targets.forEach((t) => {
      t.addEventListener("mousemove", (e) => {
        const rect = t.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        t.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
      });
      t.addEventListener("mouseleave", () => {
        t.style.transform = "";
      });
    });
  }

  // ---------- Card hover effect (subtle lift + glow) ----------
  function setupCardHover() {
    const cards = document.querySelectorAll(".about-card, .summary-card, .contact-card, .video-card");
    cards.forEach((card) => {
      card.addEventListener("mouseenter", () => {
        card.style.transform = "translateY(-4px)";
      });
      card.addEventListener("mouseleave", () => {
        card.style.transform = "";
      });
    });
  }

  // ---------- GSAP ----------
  function setupGSAP() {
    // ScrollTrigger animations สำหรับ sections (ไม่ใช่ Hero — Hero ใช้ CSS)
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    document.querySelectorAll(".gs-fade").forEach((node) => {
      gsap.fromTo(
        node,
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: node, start: "top 85%", toggleActions: "play none none none" },
        }
      );
    });

  }

  function setupKeyboard() {
    document.addEventListener("keydown", (e) => {
      const lightbox = document.getElementById("lightbox");
      if (!lightbox.hidden) {
        if (e.key === "Escape") closeLightbox();
        if (e.key === "ArrowRight") lightboxNext();
        if (e.key === "ArrowLeft") lightboxPrev();
      }
    });
  }

  function init() {
    setHeroAvatar();
    renderNav();
    renderWorks();
    setupSmoothScroll();
    setupChapterNavigation();
    setupActiveSection();
    setupHamburger();
    setupScrollProgress();
    setupTypewriter();
    setupKeyboard();

    document.getElementById("lightboxClose").addEventListener("click", closeLightbox);
    document.getElementById("lightboxNext").addEventListener("click", lightboxNext);
    document.getElementById("lightboxPrev").addEventListener("click", lightboxPrev);
    document.getElementById("lightbox").addEventListener("click", (e) => {
      if (e.target.id === "lightbox") closeLightbox();
    });

    if (document.readyState === "complete") { setupGSAP(); setupCardHover(); setupMagnetic(); }
    else window.addEventListener("load", () => { setupGSAP(); setupCardHover(); setupMagnetic(); });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
