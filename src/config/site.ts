export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
).replace(/\/+$/, "");

export type NavLink = { label: string; href: string };
export type NavGroup = { title: string; children: NavLink[] };

/** 首页轮播页（固定 3 篇；少于 3 篇时轮播按实际条数渲染） */
export type CarouselSlide = {
  /** 轮播配图（放 public/images/，宽高比按 790:292 裁切） */
  image: string;
  title: string;
  href: string;
};

/** 右侧游戏信息卡的字段行（原站字段：制作公司/发行公司/发售日期/游戏平台/游戏类型） */
export type GameInfoField = { label: string; value: string };

/** 左视频列的 YouTube 条目（官方频道代表作优先；2–4 个） */
export type VideoItem = { youtubeId: string; title: string };

/**
 * 主题色 token 名（供组件以 var() 引用）。
 * ⚠️ 色值唯一来源 = src/app/globals.css 的 @theme 块，本文件不重复定义色值。
 * 每站正式配色由 g-art-design 从游戏官方素材提取后覆盖 globals.css 的三个主槽位。
 */
export const themeTokens = {
  primary: "--color-primary",
  accent: "--color-accent",
  auxiliary: "--color-auxiliary",
} as const;

export type SiteConfig = {
  /** 游戏名（全站唯一来源） */
  name: string;
  shortName: string;

  /** SEO 三件套 */
  seo: {
    title: string;
    description: string;
    keywords: string;
  };

  /** Hero 大图区（无顶栏，Hero 直顶） */
  hero: {
    /** keyart 大图路径；同时用作内容页右栏 banner */
    image: string;
    eyebrow?: string;
    title: string;
    subtitle?: string;
  };

  /** 首页横向轮播：3 篇，5s 自动换页 */
  carousel: {
    autoPlayMs: number;
    slides: CarouselSlide[];
  };

  /** 右侧游戏信息卡 */
  gameInfo: {
    title: string;
    /** 封面图路径（125×166 比例） */
    cover: string;
    fields: GameInfoField[];
    /** Steam 入口按钮（文案统一 View on Steam ↗） */
    ctaLabel: string;
    ctaHref: string;
  };

  /** 左视频列 YouTube id 列表（2–4 个，数量由右攻略区高度反推） */
  videos: VideoItem[];

  /** 官方链接（页脚展示；建议至少 1 条，其余留空则不渲染） */
  officialLinks: NavLink[];

  /** 全站攻略导航分组（首页攻略区 / 内容页右栏导航树共用；每站按真实内容增减） */
  nav: NavGroup[];

  /** 栏目简介（栏目页 L2 顶部一段话，key=section 目录名；缺省回退到「N guides…」） */
  sectionIntros?: Record<string, string>;

  /** 栏目兑底图池：内容页缺图时按栏目取图，避免与右栏 keyart 同图同屏（扬哥 2026-09-16） */
  sectionFallbackImages?: Record<string, string>;

  /** 页脚 */
  footer: {
    copyright: string;
    contactLabel: string;
    /** 联系方式（邮箱/表单链接文本）；不填则页脚不显示联系位 */
    contact?: string;
  };

  /** 广告位（骨架预制）：填入广告代码（HTML/JS）即生效；留空则完全不渲染不占位 */
  ads?: {
    /** 首页攻略区顶部 banner（内容区宽度） */
    contentBanner?: string;
    /** 页面底部 banner 广告位（页脚上方，每页都有） */
    footerBanner?: string;
    /** 正文中横幅广告位（728×90）：位置在第一屏之后，长文自动多插一个位（同一份代码可多处复用） */
    articleInline?: string;
    /** 正文第二坑位代码（扬哥 2026-09-16：长文双广告位时用不同代码/创意，避免同屏重复）；缺省回退 articleInline */
    articleInline2?: string;
    /** 左右浮动竖幅 160×600 旧写法：只填此字段=左右共用同一单元（同屏创意相同） */
    sideRail?: string;
    /** 左侧竖幅广告单元（独立 key=独立竞价/创意/统计；优先于 sideRail） */
    sideRailLeft?: string;
    /** 右侧竖幅广告单元（独立 key=独立竞价/创意/统计；优先于 sideRail） */
    sideRailRight?: string;
  };
};

export const siteConfig: SiteConfig = {
  name: "Halloween: The Game Wiki",
  shortName: "Halloween: The Game",

  seo: {
    title: "Halloween: The Game Wiki — Guides, Items, Recordings & Maps",
    description:
      "Fan-made Halloween: The Game wiki — survivor & Michael guides, every item explained, all 14 recording locations, escape points per map, editions and specs.",
    keywords: "Halloween The Game, Halloween game wiki, Michael Myers game, Halloween IllFonic game, Halloween The Game guides, Halloween The Game recordings",
  },

  hero: {
    image: "/images/home/keyart.webp",
    eyebrow: "Asymmetric Horror Wiki",
    title: "Halloween: The Game Wiki",
    subtitle: "Guides · Items · Collectibles · Maps",
  },

  carousel: {
    autoPlayMs: 5000,
    slides: [
      {
        image: "/images/carousel/slide-1.webp",
        title: "The Night He Came Home — All 14 Recordings",
        href: "/collectibles/prologue-recordings",
      },
      {
        image: "/images/carousel/slide-2.webp",
        title: "Michael Guide — Every Ability Explained",
        href: "/guides/michael-guide",
      },
      {
        image: "/images/carousel/slide-3.webp",
        title: "Survivor Guide — Escapes, Items & Priorities",
        href: "/guides/survivor-beginner-guide",
      },
    ],
  },

  gameInfo: {
    title: "Halloween: The Game",
    cover: "/images/home/cover.webp",
    fields: [
      { label: "Developer", value: "IllFonic · Further Front" },
      { label: "Publisher", value: "IllFonic Publishing · Gun Interactive" },
      { label: "Release Date", value: "September 8, 2026" },
      { label: "Platforms", value: "PC, PS5, Xbox Series X|S" },
      { label: "Genre", value: "Asymmetric Horror Sandbox" },
    ],
    ctaLabel: "View on Steam ↗",
    ctaHref: "https://store.steampowered.com/app/3219630/Halloween_The_Game/",
  },

  videos: [
    { youtubeId: "DvdFI-NTcGg", title: "Halloween — Official Multiplayer Overview Trailer" },
    { youtubeId: "JqHJNwSTV9c", title: "All Items Explained" },
    { youtubeId: "qVw80T6hUJI", title: "5 Essential Survival Tips" },
    { youtubeId: "JSI5KYZvnMY", title: "Beginner's Guide" },
  ],

  officialLinks: [
    { label: "Steam Page", href: "https://store.steampowered.com/app/3219630/Halloween_The_Game/" },
    { label: "Discord", href: "https://discord.gg/halloweenthegame" },
  ],

  nav: [
    {
      title: "Game Info",
      children: [
        { label: "Editions — Standard vs Deluxe", href: "/intro/game-content-overview" },
        { label: "Release Date & Platforms", href: "/intro/release-date" },
        { label: "Unlock Times & Bonuses by Edition", href: "/intro/unlock-times" },
        { label: "Price — Standard & Deluxe", href: "/intro/price-editions" },
        { label: "Preorder Bonus — Phantom Michael", href: "/intro/preorder-bonus" },
        { label: "System Requirements", href: "/intro/system-requirements" },
      ],
    },
    {
      title: "Guides",
      children: [
        { label: "Survivor Beginner Guide", href: "/guides/survivor-beginner-guide" },
        { label: "Michael Guide — All Abilities", href: "/guides/michael-guide" },
        { label: "XP Farming — Fast Levels", href: "/guides/civilian-xp-farming" },
      ],
    },
    {
      title: "Items",
      children: [
        { label: "Every Item Explained", href: "/items/items-guide" },
        { label: "Purple Items — Lantern, Talisman, Hourglass", href: "/items/purple-items" },
      ],
    },
    {
      title: "Collectibles",
      children: [
        { label: "Prologue Recordings — Logs #2 & #4", href: "/collectibles/prologue-recordings" },
        { label: "Ch1 Recordings — Logs #6 & #8", href: "/collectibles/ch1-recordings" },
        { label: "Ch2 Recordings — Logs #9 & #3", href: "/collectibles/ch2-recordings" },
        { label: "Ch3 Recordings — Logs #1 & #5", href: "/collectibles/ch3-recordings" },
        { label: "Ch4 Recordings — The Babysitters", href: "/collectibles/ch4-recordings" },
        { label: "Ch5 Recordings — Into the Shadows", href: "/collectibles/ch5-recordings" },
      ],
    },
    {
      title: "Maps",
      children: [
        { label: "Escape Points & Radio Spawns — All Maps", href: "/maps/escape-points-radio-spawns" },
      ],
    },
  ],

  sectionIntros: {
    intro: "Everything around the launch: editions, price, unlock times, preorder bonuses and PC specs for Halloween: The Game.",
    guides: "Practical strategy for both sides of Haddonfield — survive as a Hero of Haddonfield or hunt as Michael Myers.",
    items: "Every item in the game, from keys and repair kits to the three purple epics, with usage notes for each.",
    collectibles: "All 14 collectible recordings in Michael's story — eleven Loomis Logs plus three bonus voices — chapter by chapter.",
    maps: "The four multiplayer maps, their escape point pools, and where radios and vehicles spawn.",
  },

  sectionFallbackImages: {
    intro: "/images/intro/release-date.webp",
    guides: "/images/guides/michael-guide.webp",
    items: "/images/items/purple-items.webp",
    collectibles: "/images/collectibles/ch4-recordings.webp",
    maps: "/images/maps/escape-points-radio-spawns.webp",
  },

  footer: {
    copyright:
      "Fan-made wiki. Not affiliated with IllFonic or Gun Interactive.",
    contactLabel: "Contact",
  },

  ads: {
    sideRailLeft: `<script>
  atOptions = {
    'key' : '012099124e3e6efb2dc0bd6b05fdfa9e',
    'format' : 'iframe',
    'height' : 300,
    'width' : 160,
    'params' : {}
  };
</script>
<script src="https://www.highrevenueformat.com/012099124e3e6efb2dc0bd6b05fdfa9e/invoke.js"></script>`,
    sideRailRight: `<script>
  atOptions = {
    'key' : '6bc78c18b40ab521a997e6a246ae2fe5',
    'format' : 'iframe',
    'height' : 600,
    'width' : 160,
    'params' : {}
  };
</script>
<script src="https://www.highrevenueformat.com/6bc78c18b40ab521a997e6a246ae2fe5/invoke.js"></script>`,
  },
};
