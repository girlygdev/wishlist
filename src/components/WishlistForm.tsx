import { useState, useEffect } from "react";
import { WishlistItem, Avatar } from "@/types/wishlist";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface WishlistFormProps {
  item?: WishlistItem;
  onSubmit: (title: string, description?: string, link?: string) => void;
  onCancel: () => void;
}

export const WishlistForm = ({ item, onSubmit, onCancel }: WishlistFormProps) => {
  const [title, setTitle] = useState(item?.title || "");
  const [description, setDescription] = useState(item?.description || "");
  const [link, setLink] = useState(item?.link || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onSubmit(title, description.trim() || undefined, link.trim() || undefined);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title" className='mb-2'>Wish Item</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What do you wish for?"
          maxLength={100}
          required
        />
      </div>
      <div>
        <Label htmlFor="description" className='mb-2'>Description (optional)</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Tell us more about it..."
          maxLength={500}
          rows={3}
        />
      </div>
      <div>
        <Label htmlFor="link" className='mb-2'>Link (optional)</Label>
        <Input
          id="link"
          type="url"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="https://example.com/product"
          maxLength={500}
        />
      </div>
      <div className="flex gap-3 justify-end">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" className="bg-primary hover:bg-primary/90">
          {item ? "Update" : "Add"} Wish
        </Button>
      </div>
    </form>
  );
};
