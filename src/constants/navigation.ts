export const NAVIGATION_PATHS = [
  { key: "home", path: "" },
  { key: "about" },
  {
    key: "services",
    childs: [
      { key: "indonesian-visa-processing" },
      { key: "stay-and-work-permit" },
      { key: "passport-processing" },
      { key: "foreign-visa-processing" },
      { key: "company-legalization" },
    ],
  },
  {
    key: "news",
    hiddenChilds: [
      { key: "immigration-law" },
      { key: "kitas-vs-kitap" },
      { key: "visa-c17-extension" },
    ],
  },
  { key: "contact" },
];

export const STATIC_NAVIGATION_KEYS = NAVIGATION_PATHS.filter(
  (obj) => obj.key !== "services" && obj.key !== "news"
).map((obj) => obj.path ?? obj.key);

export const SERVICES_NAVIGATION_KEYS = NAVIGATION_PATHS.find(
  (obj) => obj.key === "services"
)!.childs!.map((obj) => obj.key);

export const SERVICES_NAVIGATION_PATHS = NAVIGATION_PATHS.find(
  (obj) => obj.key === "services"
)!.childs!.map((obj) => `/services/${obj.key}`);

export const NEWS_NAVIGATION_KEYS = NAVIGATION_PATHS.find(
  (obj) => obj.key === "news"
)!.hiddenChilds!.map((obj) => obj.key);
