import { WishlistItem, Avatar, avatarColors } from "@/types/wishlist";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2, ExternalLink } from "lucide-react";

interface WishlistCardProps {
  item: WishlistItem;
  onEdit: (item: WishlistItem) => void;
  onDelete: (id: string) => void;
  onToggleTaken: (id: string, takenBy?: Avatar) => void;
  isOwner: boolean;
  currentAvatar?: Avatar | null;
}

export const WishlistCard = ({ item, onEdit, onDelete, onToggleTaken, isOwner, currentAvatar }: WishlistCardProps) => {
  return (
    <Card className={`p-6 hover:shadow-glow transition-all duration-300 bg-teal-700 border-border/50 ${item.taken ? 'opacity-75' : ''}`}>
      <div className="flex items-start gap-4">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0 ${avatarColors[item.avatar]}`}>
          {item.avatar.charAt(0)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className={`font-semibold text-lg text-card-foreground`}>
                  {item.title}
                </h3>
                {item.taken && (
                  <Badge variant="secondary" className="text-xs">
                    This wish is taken.
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground">by {item.avatar}</p>
            </div>
            {isOwner && (
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEdit(item)}
                  className="h-8 w-8 text-card-foreground/70 hover:text-card-foreground hover:bg-background/20"
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDelete(item._id)}
                  className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
          {item.description && (
            <p className={`text-card-foreground/80 mb-3 ${item.taken ? 'line-through' : ''}`}>
              {item.description}
            </p>
          )}
          
          <div className="flex items-center justify-between gap-4 mt-3">
            {item.link && (
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
              >
                <ExternalLink className="h-4 w-4" />
                View Link
              </a>
            )}
            
            {!isOwner && currentAvatar && !item.taken && (
              <div className="flex items-center gap-2">
                <Checkbox
                  id={`taken-${item._id}`}
                  checked={item.taken || false}
                  onCheckedChange={(checked) => onToggleTaken(item._id, checked ? currentAvatar : undefined)}
                />
                <label
                  htmlFor={`taken-${item._id}`}
                  className="text-sm font-medium text-card-foreground cursor-pointer"
                >
                  Take this wish
                </label>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};
