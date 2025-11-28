export type Avatar = "Red" | "Gil" | "Navi" | "Yna" | "Belle" | "Daiki" | "Toshi" | "Hachi" | "Lolo";

export const avatarColors: Record<string, string> = {
  Red: "bg-lime-800",
  Gil: "bg-pink-800",
  Navi: "bg-blue-800",
  Yna: "bg-amber-600",
  Belle: "bg-violet-800",
  Daiki: "bg-red-800",
  Toshi: "bg-cyan-800",
  Hachi: "bg-orange-600",
  Lolo: "bg-slate-800",
};

export interface WishlistItem {
  _id: string;
  avatar: Avatar;
  title: string;
  description?: string;
  link?: string;
  taken?: boolean;
  takenBy?: Avatar;
  createdAt: number;
}