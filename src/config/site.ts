export const siteConfig = {
  name: "FAILED",
  tagline: "SAME CHAINS. DIFFERENT OUTCOME.",
  headline: "FAILED",
  subheadline: "Most tokens fail.\nWe just measure how.",
  description: "Onchain signals. One failure score. Measure the failure before becoming exit liquidity.",
  
  // Centralized Social & Protocol Links
  links: {
    x: "https://x.com/failed_onchain", // Centralized X / Twitter URL
    github: "https://github.com/failed-onchain",
    docs: "#how-it-works",
    app: "/app",
    contractAddress: "0x0000000000000000000000000000000000000000",
  },
  
  // Navigation Items
  navItems: [
    { label: "About", href: "#about" },
    { label: "How it Works", href: "#how-it-works" },
    { label: "X", href: "https://x.com/failed_onchain", isExternal: true },
  ],

  // Sample App Config
  supportedChains: [
    { id: "sol", name: "SOL", color: "#9945FF" },
    { id: "base", name: "BASE", color: "#0052FF" },
    { id: "eth", name: "ETH", color: "#627EEA" },
  ]
};
