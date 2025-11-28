import { avatarColors, type Avatar } from "@/types/wishlist";
import { cn } from "@/lib/utils";

interface AvatarSelectorProps {
  selected: Avatar | null;
  onSelect: (avatar: Avatar) => void;
}

const avatars: Avatar[] = ["Red", "Gil", "Navi", "Yna", "Belle", "Daiki", "Toshi", "Hachi", "Lolo"];

export const AvatarSelector = ({ selected, onSelect }: AvatarSelectorProps) => {
  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {avatars.map((avatar) => (
        <button
          key={avatar}
          onClick={() => onSelect(avatar)}
          className={cn(
            "relative w-20 h-20 rounded-full transition-all duration-300",
            avatarColors[avatar],
            selected === avatar
              ? "ring-4 ring-primary scale-110 shadow-festive"
              : "hover:scale-105 opacity-80 hover:opacity-100"
          )}
        >
          <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg">
            {avatar}
          </span>
        </button>
      ))}
    </div>
  );
};
