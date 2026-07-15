// ============================================================
// ข้อมูลผลงานทั้งหมด — ดึงจาก Google Drive
// ============================================================

const GOOGLE_DRIVE_API_KEY = "AIzaSyAwbPNa6hNZcI2mcCJ4fO-nEo81_idzuSI";

function driveImg(id) { return `https://drive.google.com/thumbnail?id=${id}&sz=w1600`; }
function driveThumb(id) { return `https://drive.google.com/thumbnail?id=${id}&sz=w400`; }
function drivePdf(id) { return `https://drive.google.com/file/d/${id}/preview`; }
function drivePdfLink(id) { return `https://drive.google.com/file/d/${id}/view`; }
function driveVideoEmbed(id) { return `https://drive.google.com/file/d/${id}/preview`; }

// ===== ข้อมูลผู้ใช้ =====
const profile = {
  fullName: "Kanokpol Saenmueangma",
  fullNameTh: "กนกพล แสนเมืองมา",
  nickname: "หมอก",
  nicknameEn: "Mhok",
  tagline: "Content Creator & Data Analysis",
  school: "มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี — คณะวิทยาศาสตร์ สาขาคณิตศาสตร์",
  aboutImage: driveImg("1F7hgmuEx6XwyL_TmaD5YPct95-R6ccbV"),
};

const worksData = [
  // ===================== 1. Dream Runner X =====================
  {
    id: "dream-runner-x",
    icon: "gamepad",
    titleTh: "Dream Runner X",
    titleEn: "Game Content | Marketing",
    subtitleTh: "เกมแนววิ่งแข่งของบริษัท Varisoft — ผมรับหน้าที่สร้างคอนเทนต์โปรโมทเกม ตั้งแต่ภาพ คลิป สกิลตัวละคร ไปจนถึง End Credit ครับ",
    subtitleEn: "A racing game by Varisoft — I created promotional content including images, videos, character skill showcases, and end credits.",
    subcategories: [
      {
        titleTh: "ภาพโพสต์โซเชียล",
        titleEn: "Social Media Posts",
        icon: "image",
        type: "images",
        items: [
          { thumb: driveThumb("1_sXhloPHx2X2qyYqqUB2tfETK7MzB6Ro"), full: driveImg("1_sXhloPHx2X2qyYqqUB2tfETK7MzB6Ro"), alt: "Post Facebook Content" },
          { thumb: driveThumb("1801nSE5SSx3-PkamXzkDCemtv2s1W9CR"), full: driveImg("1801nSE5SSx3-PkamXzkDCemtv2s1W9CR"), alt: "Post Content 1" },
          { thumb: driveThumb("1qXZSWkVfWY-7b4c81FVT-cy2Px_jdkjH"), full: driveImg("1qXZSWkVfWY-7b4c81FVT-cy2Px_jdkjH"), alt: "Post Content 2" },
          { thumb: driveThumb("14aenGj7yKRbRdwVElW4_e0Wv4zBOMMxt"), full: driveImg("14aenGj7yKRbRdwVElW4_e0Wv4zBOMMxt"), alt: "Post Content 3" },
          { thumb: driveThumb("1d2uvi6htaSaSdIlQh6Vz0nvlqRP0_EJa"), full: driveImg("1d2uvi6htaSaSdIlQh6Vz0nvlqRP0_EJa"), alt: "Post Content 4" },
          { thumb: driveThumb("1VqRGnIrLgMjCqMW8il3FRYt7v6zZz1qf"), full: driveImg("1VqRGnIrLgMjCqMW8il3FRYt7v6zZz1qf"), alt: "Post Content 5" },
          { thumb: driveThumb("1to7v7OjmgjvBINvRg6n-eKlv2jDuY0Z8"), full: driveImg("1to7v7OjmgjvBINvRg6n-eKlv2jDuY0Z8"), alt: "Post Content 6" },
          { thumb: driveThumb("1OJeTKOC0CF-vMAoz8HWXZu64VIcPeBwT"), full: driveImg("1OJeTKOC0CF-vMAoz8HWXZu64VIcPeBwT"), alt: "Post Content 7" },
          { thumb: driveThumb("1ItkRgiTKES15Y2HkJRLxIWTf-1hulyr0"), full: driveImg("1ItkRgiTKES15Y2HkJRLxIWTf-1hulyr0"), alt: "Post Facebook แจก" },
        ],
      },
      {
        titleTh: "คลิปวิดีโอแนวตั้ง (Reels / TikTok)",
        titleEn: "Portrait Videos",
        icon: "video",
        type: "videos",
        orientation: "portrait",
        items: [
          { id: "1BhEbDambTQVb1TuEdWCNJHFvVF5IoZuF", titleTh: "บ้านเบื้องหลัง", titleEn: "Behind the Scenes" },
          { id: "1w1RN5Q75y0GLE0KD7V4gJPL2cS0VDfYG", titleTh: "งาน Commart", titleEn: "Commart Event" },
          { id: "1xlZYxQqnkD14RqFq4n-2f6lWYA5kHYiI", titleTh: "งานเสร็จแล้วงดสั่งเพิ่ม", titleEn: "Sold Out — No More Orders" },
          { id: "1Pjk2OdVkwhYtNGJTjyIjCnMHkKow2gC2", titleTh: "คอนเทนต์วิ่ง", titleEn: "Running Content" },
          { id: "1Oc_Y1B3wGi0hshTAt5pHjEQnjP95xP9p", titleTh: "คอนเทนต์เกมใหม่", titleEn: "New Game Content" },
          { id: "1IQfyJ5YM2mx-e-ZxTQs3uxH573Il7wep", titleTh: "เข้าเส้นชัยไม่ทัน", titleEn: "Too Late to Finish" },
          { id: "1w1nPjOQ4fpfGXsqIQSfh-5ptItUWnQCR", titleTh: "โดนสกิลใส่ไม่หยุด", titleEn: "Unstunned by Skills" },
        ],
      },
      {
        titleTh: "คลิปวิดีโอแนวนอน (YouTube / Facebook)",
        titleEn: "Landscape Videos",
        icon: "video",
        type: "videos",
        orientation: "landscape",
        items: [
          { id: "1cjzqStIc23FkVctjm8mxP3gBjevk7S4K", titleTh: "ชุดบอลโลก", titleEn: "World Cup Outfit" },
        ],
      },
      {
        titleTh: "สกิลตัวละคร",
        titleEn: "Character Skills",
        icon: "bolt",
        type: "videos",
        orientation: "landscape",
        cols: 2,
        items: [
          { id: "1A4Z0fbSaRUSzmMNRYnHHfPDHypo7MwLd", titleTh: "สกิลตัวละคร — Ace", titleEn: "Character Skill — Ace" },
          { id: "19ZomyVche54tVMto3JjdzoKnTys2OecZ", titleTh: "สกิลตัวละคร — Blaze", titleEn: "Character Skill — Blaze" },
          { id: "1n39UIoxRwHtku6xIsEAZ_QwBltIMGIKP", titleTh: "สกิลตัวละคร — Milin", titleEn: "Character Skill — Milin" },
          { id: "1rCfN0LRwpEEx46UwXJROzGDcwcjjDvkF", titleTh: "สกิลตัวละคร — Vivian", titleEn: "Character Skill — Vivian" },
        ],
      },
      {
        titleTh: "End Credit แนวนอน",
        titleEn: "End Credit — Landscape",
        icon: "film",
        type: "videos",
        orientation: "landscape",
        items: [
          { id: "1V14sCjMxJx0QvhYAiQkNRUF8dYBmsAfX", titleTh: "End Credit — แนวนอน", titleEn: "End Credit — Landscape" },
        ],
      },
      {
        titleTh: "End Credit แนวตั้ง",
        titleEn: "End Credit — Portrait",
        icon: "film",
        type: "videos",
        orientation: "portrait",
        items: [
          { id: "13_LeaqIs_9thCpAmdl6zoejb1f5GD865", titleTh: "End Credit — แนวตั้ง", titleEn: "End Credit — Portrait" },
        ],
      },
    ],
  },

  // ===================== 2. Catch Me Wooo! =====================
  {
    id: "catch-me-wooo",
    icon: "ghost",
    titleTh: "Catch Me Wooo!",
    titleEn: "Social Content | Storyboard",
    subtitleTh: "เกมแนวไล่จับผี เล่นกับเพื่อน — ผมรับผิดชอบสร้างคอนเทนต์โซเชียล รวมถึงออกแบบ Storyboard สำหรับวิดีโอโฆษณาครับ",
    subtitleEn: "A ghost-catching party game to play with friends — I created social content and designed the advertising storyboard.",
    subcategories: [
      {
        titleTh: "5 สถานที่สุดหลอน",
        titleEn: "5 Scariest Places",
        icon: "image",
        type: "images",
        items: [
          { thumb: driveThumb("1NBRBNq_5_oFLv3jbNaD3PfIqmSy9ze8P"), full: driveImg("1NBRBNq_5_oFLv3jbNaD3PfIqmSy9ze8P"), alt: "5 สถานที่สุดหลอน (1)" },
          { thumb: driveThumb("1RZIbge7ApL2Odr-zk37B74JwZgCT21Oe"), full: driveImg("1RZIbge7ApL2Odr-zk37B74JwZgCT21Oe"), alt: "5 สถานที่สุดหลอน (6)" },
          { thumb: driveThumb("1hsF85Ky_nkTv_9LpZg30zMi_ssYqSlo_"), full: driveImg("1hsF85Ky_nkTv_9LpZg30zMi_ssYqSlo_"), alt: "5 สถานที่สุดหลอน (7)" },
          { thumb: driveThumb("1vBmmdcfnVAF-fbgiygqslfywcQroaUE1"), full: driveImg("1vBmmdcfnVAF-fbgiygqslfywcQroaUE1"), alt: "5 สถานที่สุดหลอน (8)" },
          { thumb: driveThumb("1XlecNwW94pAmgBxaP8jBIABelrMrb7aR"), full: driveImg("1XlecNwW94pAmgBxaP8jBIABelrMrb7aR"), alt: "5 สถานที่สุดหลอน (9)" },
          { thumb: driveThumb("153G9Ut--9BmdvzvgQZ6EHfVc8LP9P6by"), full: driveImg("153G9Ut--9BmdvzvgQZ6EHfVc8LP9P6by"), alt: "5 สถานที่สุดหลอน (10)" },
          { thumb: driveThumb("123P5AwRGqwgxvQL8KeBqE1u0i-TsY3sv"), full: driveImg("123P5AwRGqwgxvQL8KeBqE1u0i-TsY3sv"), alt: "5 สถานที่สุดหลอน (11)" },
        ],
      },
      {
        titleTh: "นิสัยของผี",
        titleEn: "Ghost Behaviors",
        icon: "image",
        type: "images",
        items: [
          { thumb: driveThumb("1trm23-cTFD4qkViQ1727K9rXUUvehhFJ"), full: driveImg("1trm23-cTFD4qkViQ1727K9rXUUvehhFJ"), alt: "นิสัยของผี (1)" },
          { thumb: driveThumb("138xf02EYvIvxNALih-5V1WfrKk0yOA4p"), full: driveImg("138xf02EYvIvxNALih-5V1WfrKk0yOA4p"), alt: "นิสัยของผี (6)" },
          { thumb: driveThumb("1nssF4rxPJEKzqcfQ5pTdloqtiPgDcTR7"), full: driveImg("1nssF4rxPJEKzqcfQ5pTdloqtiPgDcTR7"), alt: "นิสัยของผี (8)" },
          { thumb: driveThumb("1opPq4qZoOUnyj42P_X8t7EQsCNDc9wOt"), full: driveImg("1opPq4qZoOUnyj42P_X8t7EQsCNDc9wOt"), alt: "นิสัยของผี (10)" },
          { thumb: driveThumb("1_B7-ryqsvgoLfCDugJ4_ORYe-V9dCezF"), full: driveImg("1_B7-ryqsvgoLfCDugJ4_ORYe-V9dCezF"), alt: "นิสัยของผี (12)" },
          { thumb: driveThumb("1zDudzT3rpfOHJ02-cw4l_kruF9M-k5HG"), full: driveImg("1zDudzT3rpfOHJ02-cw4l_kruF9M-k5HG"), alt: "นิสัยของผี (13)" },
        ],
      },
      {
        titleTh: "Storyboard",
        titleEn: "Storyboard",
        icon: "layout",
        type: "summary",
        summary: {
          icon: "film",
          title: "Storyboard ของวิดีโอโฆษณาเกม Catch Me Wooo!",
          titleEn: "Storyboard for Catch Me Wooo! Video Ad",
          points: [
            "ผมออกแบบ Flow ของวิดีโอตั้งแต่ต้นจนจบครับ / Designed the full video flow from start to finish.",
            "กำหนดมุมกล้อง อารมณ์ และการเคลื่อนไหวในแต่ละ scene / Defined camera angles, mood, and motion for each scene.",
            "เน้นการเล่าเรื่องแบบสนุก ตื่นเต้น เหมาะกับกลุ่มเป้าหมาย / Focused on fun, exciting storytelling suited to the target audience.",
            "ประสานงานกับทีมอนิเมชันเพื่อสร้างวิดีโอตัวจริงครับ / Coordinated with the animation team to produce the final video.",
          ],
        },
      },
    ],
  },

  // ===================== 3. Data Analysis =====================
  {
    id: "data-analysis",
    icon: "chart",
    titleTh: "การวิเคราะห์ข้อมูล",
    titleEn: "Data Analysis",
    subtitleTh: "งานวิเคราะห์ข้อมูลผู้เล่นเกม Dream Runner X และวางแผนกลยุทธ์ธุรกิจ — ผมทำงานที่บริษัท Varisoft ครับ",
    subtitleEn: "Player behavior analysis and business strategy planning for Dream Runner X — at Varisoft.",
    subcategories: [
      {
        titleTh: "ผลงานวิเคราะห์ข้อมูล",
        titleEn: "Analytics Work",
        icon: "chart",
        type: "summary",
        summary: {
          icon: "trending-up",
          title: "ผลงานด้านการวิเคราะห์ข้อมูล",
          titleEn: "Data Analytics Work",
          points: [
            "ผมวิเคราะห์ข้อมูลผู้เล่นจาก Database รายเดือน (พ.ย. 2023 – ต.ค. 2024) เพื่อดูพฤติกรรมการเล่น / Analyzed monthly player data (Nov 2023 – Oct 2024) to understand gameplay behavior.",
            "วิเคราะห์ Retention Rate, ARPU, Conversion Rate และตัวชี้วัดสำคัญอื่น ๆ / Analyzed Retention Rate, ARPU, Conversion Rate, and other key metrics.",
            "จัดทำ SWOT Analysis ของเกม Dream Runner X เพื่อวางแผนกลยุทธ์การตลาด / Built a SWOT Analysis for Dream Runner X to plan marketing strategy.",
            "นำเสนอผลการวิเคราะห์ต่อทีมพัฒนาเกมและทีมการตลาดเพื่อนำไปปรับปรุงเกม / Presented findings to the game development and marketing teams for improvement.",
            "สร้าง Dashboard และรายงานประจำเดือนเพื่อติดตามสถานะเกมครับ / Created dashboards and monthly reports to track game performance.",
          ],
        },
      },
    ],
  },

  // ===================== 4. Showreel =====================
  {
    id: "showreel",
    icon: "play-circle",
    titleTh: "โชว์รีล",
    titleEn: "Showreel",
    subtitleTh: "รวมผลงานคลิปของบริษัท Varisoft ที่ผมมีส่วนร่วมในการสร้างครับ",
    subtitleEn: "A compilation of Varisoft video projects I contributed to.",
    subcategories: [
      {
        titleTh: "โชว์รีล — แนวนอน",
        titleEn: "Showreel — Landscape",
        icon: "video",
        type: "videos",
        orientation: "landscape",
        items: [
          { id: "1_N6vb19j73ti1ZedqGBGN0eblhbVwIz6", titleTh: "โชว์รีล — Varisoft", titleEn: "Showreel — Varisoft" },
        ],
      },
    ],
  },

  // ===================== 5. University Projects =====================
  {
    id: "university",
    icon: "graduation",
    titleTh: "โปรเจคมหาวิทยาลัย",
    titleEn: "University Projects",
    subtitleTh: "โปรเจคต่าง ๆ ระหว่างเรียนที่มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี — คณะวิทยาศาสตร์ สาขาคณิตศาสตร์ครับ",
    subtitleEn: "Projects from my studies at King Mongkut's University of Technology Thonburi — Faculty of Science, Mathematics Department.",
    subcategories: [
      {
        titleTh: "ทำนายราคาทองคำ (Python)",
        titleEn: "Gold Price Prediction (Python)",
        icon: "trending-up",
        type: "summary",
        summary: {
          icon: "trending-up",
          title: "ทำนายราคาทองคำ — Python",
          titleEn: "Gold Price Prediction — Python",
          points: [
            "ผมสร้างโมเดลพยากรณ์ราคาทองคำด้วย Pandas, NumPy และ Scikit-learn / Built a gold price forecasting model with Pandas, NumPy, and Scikit-learn.",
            "เตรียมและทำความสะอาดข้อมูล Time-series สำหรับใช้สร้างโมเดล / Prepared and cleaned time-series data for modeling.",
            "ประเมินประสิทธิภาพของโมเดลด้วย metrics ที่เหมาะสมครับ / Evaluated model performance using appropriate metrics.",
          ],
        },
      },
      {
        titleTh: "วิเคราะห์ข้อมูลลูกค้าและยอดขาย",
        titleEn: "Customer & Sales Insight Analytics",
        icon: "chart",
        type: "summary",
        summary: {
          icon: "chart",
          title: "วิเคราะห์ข้อมูลลูกค้าและยอดขาย",
          titleEn: "Customer & Sales Insight Analytics",
          points: [
            "ผมวิเคราะห์ข้อมูลค้าปลีกขนาดใหญ่เพื่อหาแนวโน้มยอดขายและกลุ่มลูกค้า / Analyzed large-scale retail data to identify sales trends and customer segments.",
            "สร้าง Interactive Dashboard ด้วย Excel และ Google Sheets / Built interactive dashboards with Excel and Google Sheets.",
            "ทำ Automation สรุปข้อมูลเพื่อช่วยตัดสินใจครับ / Automated data summaries to support decision-making.",
          ],
        },
      },
      {
        titleTh: "วิเคราะห์ความสัมพันธ์และถดถอย (SPSS)",
        titleEn: "Regression & Relationship Analysis (SPSS)",
        icon: "chart",
        type: "summary",
        summary: {
          icon: "chart",
          title: "วิเคราะห์ความสัมพันธ์และถดถอย — SPSS",
          titleEn: "Regression & Relationship Analysis — SPSS",
          points: [
            "ผมวิเคราะห์ความสัมพันธ์ระหว่างตัวแปรด้วย SPSS / Analyzed relationships between variables using SPSS.",
            "ใช้ Correlation และ Regression Analysis ศึกษาผลกระทบของตัวแปรอิสระต่อตัวแปรตาม / Used correlation and regression analysis to study how independent variables affect the dependent variable.",
            "เลือกใช้สถิติที่เหมาะสมตามชนิดข้อมูลและสมมติฐาน / Selected appropriate statistical tests based on data type and assumptions.",
            "แปลผลสัมประสิทธิ์การถดถอย ค่า correlation และ p-value เพื่อทำรายงานครับ / Interpreted regression coefficients, correlation values, and p-values for reporting.",
          ],
        },
      },
    ],
  },

  // ===================== 6. งานอดิเรก =====================
  {
    id: "hobby",
    icon: "sparkles",
    titleTh: "ผลงานส่วนตัว",
    titleEn: "Personal Works",
    subtitleTh: "ผลงานด้านอื่น ๆ นอกเหนือจากงานประจำของผม — IG ร้านขายของมือสอง, TikTok, และตัดคลิปครับ",
    subtitleEn: "Personal side projects — Instagram shop, TikTok channel, and video editing.",
    subcategories: [
      {
        titleTh: "โซเชียลมีเดียของผม",
        titleEn: "My Social Media",
        icon: "instagram",
        type: "social-pair",
        autoLoad: true,
        instagram: {
          titleTh: "IG — ร้านขายของมือสอง",
          titleEn: "IG — Secondhand Shop",
          url: "https://www.instagram.com/jeans.terr/",
          handle: "@jeans.terr",
        },
        tiktok: {
          titleTh: "TikTok — หมง",
          titleEn: "TikTok — Mong",
          url: "https://www.tiktok.com/@nongmongja",
          handle: "@nongmongja",
        },
      },
      {
        titleTh: "ตัดคลิปเที่ยวคลองถม — แนวตั้ง",
        titleEn: "Klong Thom Trip Video — Portrait",
        icon: "scissors",
        type: "videos",
        orientation: "portrait",
        items: [
          { id: "130swjVAQ8Ykm_ZABbps4g-v3-IaH5MAu", titleTh: "คลิปเที่ยวคลองถม", titleEn: "Klong Thom Trip Clip" },
        ],
      },
    ],
  },
];

if (typeof window !== "undefined") {
  window.worksData = worksData;
  window.GOOGLE_DRIVE_API_KEY = GOOGLE_DRIVE_API_KEY;
  window.profile = profile;
}
