import type { GameAccount, GameCategory, Promotion } from "./types";

export const FEATURED_ACCOUNTS: GameAccount[] = [
  {
    id: 1,
    gameTitle: "Valorant",
    image: "https://picsum.photos/seed/valorant/400/300",
    description: "Rank Immortal, Vandal Skin, Full Agents",
    price: "1,500,000₫",
    badge: "Hot",
  },
  {
    id: 2,
    gameTitle: "Genshin Impact",
    image: "https://picsum.photos/seed/genshin/400/300",
    description: "AR55, 5* Characters (Diluc, Keqing)",
    price: "2,000,000₫",
    badge: "Hot",
  },
  {
    id: 3,
    gameTitle: "Roblox",
    image: "https://picsum.photos/seed/roblox/400/300",
    description: "Full Gamepass, Rare Items, Blox Fruits",
    price: "800,000₫",
    badge: "New",
  },
  {
    id: 4,
    gameTitle: "League of Legends",
    image: "https://picsum.photos/seed/lol/400/300",
    description: "Diamond IV, 100+ Skins, All Champs",
    price: "1,200,000₫",
    badge: "Hot",
  },
];

export const PROMOTIONS: Promotion[] = [
  {
    id: 1,
    title: "Hè Sôi Động - Giảm 20% Đơn Hàng Đầu Tiên",
    description: "Khám phá hàng ngàn tài khoản chất lượng ngay hôm nay.",
    code: "CHA08ANS0",
    bgColor: "bg-gradient-to-r from-sky-400 to-cyan-300",
    image: "https://picsum.photos/seed/summer/300/300",
    textColor: "text-white",
  },
  {
    id: 2,
    title: "Gói VIP Ưu Đãi - Tặng Skin Trị Giá 500k",
    description: "Khám phá hàng ngàn tặng skin trị giá 500k.",
    code: "VIPGIFT",
    bgColor: "bg-gradient-to-r from-indigo-800 to-purple-700",
    image: "https://picsum.photos/seed/vip/300/300",
    textColor: "text-white",
  },
];

export const POPULAR_GAMES: GameCategory[] = [
  {
    id: 1,
    title: "Genshin Impact",
    image: "https://picsum.photos/seed/game1/200/300",
  },
  {
    id: 2,
    title: "Valorant",
    image: "https://picsum.photos/seed/game2/200/300",
  },
  { id: 3, title: "Roblox", image: "https://picsum.photos/seed/game3/200/300" },
  {
    id: 4,
    title: "Minecraft",
    image: "https://picsum.photos/seed/game4/200/300",
  },
  {
    id: 5,
    title: "League of Legends",
    image: "https://picsum.photos/seed/game5/200/300",
  },
  {
    id: 6,
    title: "PUBG Mobile",
    image: "https://picsum.photos/seed/game6/200/300",
  },
  {
    id: 7,
    title: "Free Fire",
    image: "https://picsum.photos/seed/game7/200/300",
  },
  {
    id: 8,
    title: "FIFA Online 4",
    image: "https://picsum.photos/seed/game8/200/300",
  },
];
