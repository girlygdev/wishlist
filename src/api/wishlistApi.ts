import { WishlistItem, Avatar } from "@/types/wishlist";

const API_URL = import.meta.env.VITE_API_URL

// ✅ Fetch all wishlist items
export async function fetchWishlists(): Promise<WishlistItem[]> {
  const res = await fetch(`${API_URL}/api/wishlist`);
  if (!res.ok) throw new Error("Failed to fetch wishlists");
  return res.json();
}

// ✅ Retrieve a single wishlist item by ID
export async function getWishlist(id: string): Promise<WishlistItem> {
  const res = await fetch(`${API_URL}/api/wishlist/${id}`);
  if (!res.ok) throw new Error("Failed to fetch wishlist item");
  return res.json();
}

// ✅ Add a new wishlist item
export async function addWishlist(item: Partial<WishlistItem>): Promise<WishlistItem> {
  const res = await fetch(`${API_URL}/api/wishlist`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });
  if (!res.ok) throw new Error("Failed to add wishlist item");
  return res.json();
}

// ✅ Edit an existing wishlist item
export async function editWishlist(
  id: string,
  updates: Partial<WishlistItem>
): Promise<WishlistItem> {
  const res = await fetch(`${API_URL}/api/wishlist/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  if (!res.ok) throw new Error("Failed to update wishlist item");
  return res.json();
}

// ✅ Mark item as taken/untaken
export async function toggleTaken(
  id: string,
  taken: boolean,
  takenBy?: Avatar
): Promise<WishlistItem> {
  const res = await fetch(`${API_URL}/api/wishlist/${id}/taken`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ taken, takenBy }),
  });
  if (!res.ok) throw new Error("Failed to toggle wishlist item");
  return res.json();
}

// ✅ Delete a wishlist item
export async function deleteWishlist(id: string): Promise<{ message: string }> {
  const res = await fetch(`${API_URL}/api/wishlist/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete wishlist item");
  return res.json();
}