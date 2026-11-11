/* =====================================================================
   SITE CONTENT — this is the only file you need to edit.

   HOW TO PUBLISH A PROJECT
   • url   → paste the exact video link.
             YouTube: any watch / youtu.be / shorts link. The thumbnail is
                      pulled automatically from that exact video.
             Instagram: must be the individual reel or post link
                      (instagram.com/reel/XXXX/). Profile links are rejected.
   • cover → optional image path, e.g. "covers/charged.jpg".
             Needed for Instagram and non-YouTube links (put the image in
             the "covers" folder). For YouTube it overrides the auto thumbnail.
   • role  → optional. Only shown when filled in.
   • views → optional number, e.g. views: 1250000 shows "1.3M views" beside
             the Watch button. Leave it out to show nothing.
   • artist→ optional small line under the title.

   A project with an empty url has no watch button. It shows as
   "Link pending" while settings.showUnpublished is true, and is hidden
   completely when you set it to false.
   ===================================================================== */

window.SITE = {
  settings: {
    // true  = draft preview: projects without links appear as "Link pending".
    // false = live mode: only projects with a working link are shown.
    showUnpublished: false,
    // Shown as a tooltip on view counts. The numbers are a snapshot, typed into
    // each project as views: 123456 — they do not update by themselves.
    viewsAsOf: "11 November 2026",
  },

  hero: {
    name: "Eric Pereira",
    tagline: "Post-production and AI video pipelines for entertainment and brand work.",
    quote:
      "My work sits between traditional post-production and AI-generated video, spanning entertainment, advertising and digital content.",
  },

  // layout: "wide" = 16:9 cards, "tall" = 9:16 cards (reels)
  categories: [
    {
      id: "stand-up",
      title: "Comedy Stand-up Specials",
      layout: "wide",
      items: [
        { title: "Delulu Express", artist: "Zakir Khan", role: "", url: "https://youtu.be/RbfddNS7eSY", views: 262252, cover: "" },
        { title: "MannPasand", artist: "Zakir Khan", role: "", url: "https://youtu.be/_Yy4DxzUzzI", views: 540515, cover: "" },
        { title: "Haq Se Single", artist: "Zakir Khan", role: "", url: "https://youtu.be/S_sgxcTZmuo", views: 1958297, cover: "" },
        { title: "Mood Kharaab", artist: "Biswa Kalyan Rath", role: "", url: "https://youtu.be/V_c-oLhaR_4", views: 128494, cover: "" },
        { title: "Sushi", artist: "Biswa Kalyan Rath", role: "", url: "https://youtu.be/Q_tcVu5am68", views: 497785, cover: "" },
        { title: "Biswa Mast Aadmi", artist: "Biswa Kalyan Rath", role: "", url: "https://youtu.be/mcMqCGuvudA", views: 732037, cover: "" },
        { title: "Who Are You", artist: "Rahul Subramanian", role: "", url: "https://youtu.be/o9Km_3wKA5g", views: 69590, cover: "" },
        { title: "Rahul Talks To People", artist: "Prime Video India", role: "", url: "https://youtu.be/gMs8Kr2sQ5M", views: 185755, cover: "" },
      ],
    },
    {
      id: "ott",
      title: "OTT Shows",
      layout: "wide",
      items: [
        { title: "Chacha Vidhayak Hain Humare", artist: "Season 3 · Amazon miniTV", role: "", url: "https://youtu.be/tLO1tKoJfRs", views: 461757, cover: "" },
      ],
    },
    {
      id: "dvc",
      title: "DVC Ads",
      layout: "wide",
      items: [
        { title: "Faster Onboarding", artist: "Cashfree Payments", role: "", url: "https://youtu.be/d0hzN9Tb-gY", views: 827706, cover: "" },
        { title: "Move Fast", artist: "Cashfree Payments", role: "", url: "https://youtu.be/fTxMp6tfCrw", views: 3843727, cover: "" },
        { title: "OPPO F25 Pro 5G", artist: "OPPO India", role: "", url: "https://youtu.be/W1zZMqo4VVg", views: 6708626, cover: "" },
        { title: "Good Mornings feat. Biswa Kalyan", artist: "WhatsApp", role: "", url: "https://youtu.be/4xvnbz19mag", views: 10638001, cover: "" },
        { title: "Good Mornings feat. Gurleen Pannu", artist: "WhatsApp", role: "", url: "https://youtu.be/oI2dV1zMLls", views: 2901065, cover: "" },
        { title: "Good Mornings feat. Aakash Gupta", artist: "WhatsApp", role: "", url: "https://youtu.be/EF_067kg9es", views: 5530267, cover: "" },
        { title: "#MakeItSpecial", artist: "OnePlus India", role: "", url: "https://youtu.be/JdiuWnqSNxg", views: 162513201, cover: "" },
      ],
    },
    {
      id: "marketing",
      title: "Marketing",
      layout: "wide",
      items: [
        { title: "Killer Soup Trailer Reaction", artist: "Netflix India", role: "", url: "https://youtu.be/hMnph8eSqck", views: 3193158, cover: "" },
        { title: "Hilarious Truth About Sunscreens", artist: "Plum · S1E1", role: "", url: "https://youtu.be/Pnp8_SFZEWk", views: 1180259, cover: "" },
        { title: "How NOT to Do Skincare", artist: "Plum · S1E3", role: "", url: "https://youtu.be/kSJK6-FfrzA", views: 1012978, cover: "" },
        { title: "Effort Meets Chemistry", artist: "Plum × Milind Soman", role: "", url: "https://www.youtube.com/watch?v=zFmB3OtHxAA", views: 585063, cover: "" },
        { title: "The Shortest Interview with Jackie Shroff", artist: "OnePlus 13s · Chalchitra Talks", role: "", url: "https://youtu.be/rEHwOdw9lRY", views: 39594, cover: "" },
      ],
    },
    {
      id: "branded",
      title: "Branded Content",
      layout: "wide",
      items: [
        { title: "Knights Dugout Podcast EP 2", artist: "Kolkata Knight Riders", role: "", url: "https://youtu.be/T8xj9Axgxgs", views: 922610, cover: "" },
        { title: "GoibiBRO Birthday Sale", artist: "Goibibo", role: "", url: "https://youtu.be/J6LGVaG8icI", views: 1178783, cover: "" },
        { title: "Vir Das & Kalki", artist: "The Durex Podcast · EP 1", role: "", url: "https://youtu.be/v9-CljO9EpI", views: 1149949, cover: "" },
        { title: "Real Talk With MostlySane & Adarsh Gourav", artist: "The Durex Podcast", role: "", url: "https://youtu.be/YSdhgCHgA8Y", views: 727535, cover: "" },
        { title: "Rohan & Vir Das: The Ultimate Comedy Watchlist", artist: "IMDb", role: "", url: "https://youtu.be/thvmOXByaxg", views: 158109, cover: "" },
        { title: "The Ultimate ‘Film Bro’ Watchlist", artist: "Rohan Joshi & Kullu · IMDb", role: "", url: "https://youtu.be/OJ_6F74v1a0", views: 204299, cover: "" },
      ],
    },
    {
      id: "music-videos",
      title: "Music Videos",
      layout: "wide",
      items: [
        { title: "BREEZER Tribe 1 O' 1", artist: "feat. Yashraj", role: "", url: "https://youtu.be/eHQjTHLjS8w", views: 5254, cover: "" },
        { title: "Jaadugari", artist: "Maahi · Saregama Originals", role: "", url: "https://youtu.be/23wy9R_YZGM", views: 5828049, cover: "" },
        { title: "Why Is She Running?", artist: "Cosmix", role: "", url: "https://www.instagram.com/reel/DYWP2dxyMba/", cover: "covers/cosmix-why-is-she-running.jpg" },
      ],
    },
    {
      id: "reels",
      title: "Reels",
      layout: "tall",
      // Add one line per reel. Instagram cards need a cover image, e.g. cover: "covers/vespa.jpg".
      // NOT PUBLISHED: https://www.instagram.com/reel/C4zpB0LPlzO/ — Instagram reports this reel as unavailable.
      items: [
        { title: "Date With Vespa", artist: "Vespa India", role: "", url: "https://www.instagram.com/reel/DPTe6H7DQLi/", cover: "covers/vespa-date-with-vespa.jpg" },
        { title: "One Take", artist: "Head & Shoulders × Varun Thakur", role: "", url: "https://www.instagram.com/reel/DW6MNs-Ag1j/", cover: "covers/head-shoulders-one-take.jpg" },
        { title: "Alag Hain", artist: "Head & Shoulders × Anuj Gupta", role: "", url: "https://www.instagram.com/reel/DWYuYbzjKDx/", cover: "covers/head-shoulders-alag-hain.jpg" },
        { title: "Elevator Pitch", artist: "Head & Shoulders × Rohan Joshi", role: "", url: "https://www.instagram.com/reel/DXdvAeqz7t-/", cover: "covers/head-shoulders-elevator-pitch.jpg" },
        { title: "End of Reason Sale", artist: "Myntra", role: "", url: "https://www.instagram.com/reel/DY9d6KZJH6t/", cover: "covers/myntra-end-of-reason-sale.jpg" },
        { title: "Happily Never After", artist: "CeraVe × Tanmay Bhat", role: "", url: "https://www.instagram.com/reel/DTXU429jA6u/", cover: "covers/cerave-happily-never-after.jpg" },
      ],
    },
  ],

  // AI Next is split into rows. Add a line to a row's items to publish a new piece.
  // Google Drive links work too (the file must be shared as "Anyone with the link").
  // span: true gives a landscape piece a double-width card in a row of vertical ones.
  aiNext: {
    title: "AI Next",
    rows: [
      {
        id: "ai-brand",
        title: "Brand Projects",
        layout: "tall",
        items: [
          { title: "Charged: Teaser", artist: "Micro drama", role: "AI visuals, editing and finishing.", url: "https://www.instagram.com/reel/DcpjL0zy4Pt/", cover: "covers/charged-teaser.jpg" },
          { title: "Charged: Episode 1", artist: "Micro drama", role: "AI visuals, editing and finishing.", url: "https://www.instagram.com/reel/DctGJWiyV55/", cover: "covers/charged-episode-1.jpg" },
          { title: "Myntra: Father's Day", artist: "AI video", role: "AI visuals, editing and finishing.", url: "https://www.instagram.com/reel/DZzaUT7J9ue/", cover: "covers/myntra-fathers-day.jpg" },
          { title: "Fur Jaden × Batman Batpack", artist: "Fur Jaden", role: "", url: "https://www.instagram.com/reel/DYjRfSLuFjd/", cover: "covers/fur-jaden-batpack.jpg" },
        ],
      },
      {
        id: "ai-concepts",
        title: "Concept Work",
        layout: "tall",
        items: [
          { title: "Baby Driver", artist: "AI concept", role: "", url: "https://www.instagram.com/reel/DfgqxWrN1M1/", cover: "covers/baby-driver.jpg" },
          { title: "Anime Concept", artist: "AI concept", role: "", url: "https://www.instagram.com/reel/DaXLvjrt3Uz/", cover: "covers/anime-concept.jpg" },
          { title: "The Last Plum Blossom", artist: "AI concept", role: "", url: "https://drive.google.com/file/d/1IX_r4TqgK5VvTCv0XmHnyxeNzGTgiBxq/view", cover: "none", span: true }, // Drive's own preview frame is black; cover: "none" shows the title plate until a cover image is added
          { title: "Trailer", artist: "AI concept", role: "", url: "https://drive.google.com/file/d/17UDghN2i8tdqj4tqvNla0B9MoKFtkzVn/view", cover: "" },
        ],
      },
    ],
  },

  about: {
    paragraphs: [
      "I'm a post-production and AI video professional with hands-on editing experience.",
      "My work sits between traditional post-production and AI-generated video, spanning entertainment, advertising and digital content — stand-up comedy specials, OTT shows, DVC ads, marketing films and short-form reels, alongside AI video pipelines.",
    ],
  },

  // Leave a field empty to hide it. The hero "Contact" button and the
  // résumé download appear automatically once the relevant field is filled.
  contact: {
    email: "ericpereirawork@gmail.com",      // e.g. "name@example.com"
    phone: "+91 75070 27680",      // e.g. "+971 50 000 0000"
    whatsapp: "https://wa.me/917507027680",   // full link, e.g. "https://wa.me/971500000000"
    linkedin: "https://www.linkedin.com/in/eric-pereira-82355260",   // full profile link
    instagram: "",  // full profile link
    resume: "files/Eric-Pereira-CV.pdf",     // file path, e.g. "files/Eric-Pereira-Resume.pdf"
  },
};
