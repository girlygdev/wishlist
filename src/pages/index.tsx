import { useState, useEffect } from 'react';
import { WishlistItem, Avatar } from '@/types/wishlist';
import { AvatarSelector } from '@/components/AvatarSelector';

import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Loader, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
	FloatingStar,
	GingerbreadMan,
	HangingStars,
} from '@/components/ChristmasDecorations';
import { WishlistCard } from '@/components/WishlistCard';
import { WishlistForm } from '@/components/WishlistForm';
import { addWishlist, deleteWishlist, editWishlist, fetchWishlists, toggleTaken } from '@/api/wishlistApi';

const STORAGE_KEY = 'christmas-wishlist-2025';
const MAX_ITEMS_PER_USER = 10;

const Index = () => {
	const [currentAvatar, setCurrentAvatar] = useState<Avatar | null>(null);
	const [filterAvatar, setFilterAvatar] = useState<string>('all');
	const [isFormOpen, setIsFormOpen] = useState(false);
	const [editingItem, setEditingItem] = useState<WishlistItem | undefined>();
	const { toast } = useToast();

	const [isLoading, setIsLoading] = useState(true);
	const [wishlist, setWishlist] = useState([]);

	useEffect(() => {
		fetchWishlists().then((data) => {
			setWishlist(data)
			setIsLoading(false)
		}).catch(console.error);
	}, []);

	const handleAddWish = async (
		title: string,
		description?: string,
		link?: string
	) => {
		if (!currentAvatar) return;

		const userItems = wishlist.filter(
			(item) => item.avatar === currentAvatar
		);
		if (userItems.length >= MAX_ITEMS_PER_USER) {
			toast({
				title: 'Maximum wishes reached',
				description: `You can only add up to ${MAX_ITEMS_PER_USER} wishes!`,
			});
			return;
		}

		if (editingItem) {
			const updated = await editWishlist(editingItem._id, { title, description, link });

			setWishlist(
				wishlist.map((item) =>
					item._id === editingItem._id
						? updated
						: item
				)
			);
			toast({
				title: 'Wish updated!',
				description: 'Your wish has been updated successfully.',
			});
		} else {
			const newItem: Partial<WishlistItem> = {
				avatar: currentAvatar,
				title,
				description,
				link,
				createdAt: Date.now(),
			};

			const saved = await addWishlist(newItem);
			setWishlist([...wishlist, saved]);

			toast({
				title: 'Wish added!',
				description: 'Your wish has been added to the list.',
			});
		}

		setIsFormOpen(false);
		setEditingItem(undefined);
	};

	const handleEdit = (item: WishlistItem) => {
		setEditingItem(item);
		setIsFormOpen(true);
	};

	const handleDelete = async (id: string) => {
		await deleteWishlist(id);
		setWishlist(wishlist.filter((item) => item._id !== id));
		toast({
			title: 'Wish removed',
			description: 'Your wish has been removed from the list.',
		});
	};

	const handleToggleTaken = async(id: string, takenBy?: Avatar) => {
		// Call backend API
    const updatedItem = await toggleTaken(id, !!takenBy, takenBy);

    // Update local state with the returned item
    setWishlist(
      wishlist.map((item) =>
        item._id === id ? updatedItem : item
      )
    );

    toast({
      title: takenBy ? "Marked as taken" : "Unmarked",
      description: takenBy
        ? "This wish has been marked as taken."
        : "This wish is available again.",
    });

	};

	const filteredWishlist =
		filterAvatar === 'all'
			? wishlist
			: wishlist.filter((item) => item.avatar === filterAvatar);

	const userItemCount = currentAvatar
		? wishlist.filter((item) => item.avatar === currentAvatar).length
		: 0;

	if (isLoading) {
		return (
			<div className='min-h-screen flex justify-center items-center bg-teal-900'>
				<div className="flex flex-col justify-center items-center gap-2">
					<Loader className='animate-spin text-white h-50' />
					<span className="text-muted text-sm">loading wishes...</span>
				</div>
			</div>
		)
	}

	return (
		<div className='min-h-screen bg-teal-900'>
			{/* Christmas Decorations */}
			<div className='relative min-h-screen overflow-hidden'>
				<HangingStars />
				<GingerbreadMan />
				<FloatingStar />

				<div className='container mx-auto px-4 py-12 relative'>
					<div className='text-center mb-16 mt-24'>
						<h1
							className='text-6xl md:text-7xl font-bold mb-4 text-primary drop-shadow-glow'
							style={{
								fontFamily: 'Comic Sans MS, cursive',
								textShadow: '3px 3px 0px rgba(0,0,0,0.2)',
							}}
						>
							Christmas
							<br />
							Wish List
						</h1>
					</div>

					{/* Avatar Selection */}
					<div className='max-w-2xl mx-auto mb-12'>
						<div className='bg-gradient-to-br from-card to-card/10 p-8 rounded shadow-soft border border-border/50'>
							{!currentAvatar && (
								<>
									<h2 className='text-2xl font-semibold text-center mb-6 text-card-foreground'>
										Who are you?
									</h2>
									<AvatarSelector
										selected={currentAvatar}
										onSelect={setCurrentAvatar}
									/>
								</>
							)}

							{currentAvatar && (
								<p className='text-center text-muted-foreground'>
									Welcome,{' '}
									<span className='font-semibold text-primary'>
										{currentAvatar}
									</span>
									! You have{' '}
									<span className='font-semibold text-accent'>
										{userItemCount}/{MAX_ITEMS_PER_USER}
									</span>{' '}
									wishes
								</p>
							)}
						</div>
					</div>

					{/* Actions and Filter */}
					{currentAvatar && (
						<div className='max-w-6xl mx-auto mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between'>
							<Button
								onClick={() => {
									setEditingItem(undefined);
									setIsFormOpen(true);
								}}
								disabled={userItemCount >= MAX_ITEMS_PER_USER}
								size='lg'
								className='bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow font-semibold'
							>
								<Plus className='mr-2 h-5 w-5' />
								Add New Wish
							</Button>

							<div className='flex items-center gap-3'>
								<span className='text-sm font-medium text-card-foreground'>
									Filter by:
								</span>
								<Select
									value={filterAvatar}
									onValueChange={setFilterAvatar}
								>
									<SelectTrigger className='w-40 bg-card text-card-foreground border-border/50'>
										<SelectValue />
									</SelectTrigger>
									<SelectContent className='bg-card text-card-foreground border-border/50'>
										<SelectItem value='all'>
											All Users
										</SelectItem>
										<SelectItem value='Red'>Red</SelectItem>
										<SelectItem value='Gil'>Gil</SelectItem>
										<SelectItem value='Navi'>
											Navi
										</SelectItem>
										<SelectItem value='Yna'>Yna</SelectItem>
										<SelectItem value='Belle'>
											Belle
										</SelectItem>
										<SelectItem value='Daiki'>
											Daiki
										</SelectItem>
										<SelectItem value='Toshi'>
											Toshi
										</SelectItem>
										<SelectItem value='Hachi'>
											Hachi
										</SelectItem>
										<SelectItem value='Lolo'>
											Lolo
										</SelectItem>
									</SelectContent>
								</Select>
							</div>
						</div>
					)}

					{/* Wishlist Grid */}
					<div className='max-w-6xl mx-auto pb-20'>
						{filteredWishlist.length === 0 ? (
							<div className='text-center py-20'>
								<svg
									viewBox='0 0 50 50'
									className='w-16 h-16 mx-auto mb-4 opacity-50'
								>
									<path
										d='M25 5 L30 20 L45 20 L33 28 L38 43 L25 35 L12 43 L17 28 L5 20 L20 20 Z'
										fill='currentColor'
										className='text-accent'
									/>
								</svg>
								<p className='text-xl text-muted-foreground'>
									{currentAvatar
										? 'No wishes yet. Start adding your Christmas wishes!'
										: 'Select a profile to view and add wishes!'}
								</p>
							</div>
						) : (
							<div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
								{filteredWishlist.map((item) => (
									<WishlistCard
										key={item._id}
										item={item}
										onEdit={handleEdit}
										onDelete={handleDelete}
										onToggleTaken={handleToggleTaken}
										isOwner={currentAvatar === item.avatar}
										currentAvatar={currentAvatar}
									/>
								))}
							</div>
						)}
					</div>
				</div>
			</div>

			{/* Form Dialog */}
			<Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
				<DialogContent className='sm:max-w-md bg-teal-900 text-white'>
					<DialogHeader>
						<DialogTitle className='text-2xl'>
							{editingItem ? 'Edit' : 'Add'} Wish
						</DialogTitle>
					</DialogHeader>
					<WishlistForm
						item={editingItem}
						onSubmit={handleAddWish}
						onCancel={() => {
							setIsFormOpen(false);
							setEditingItem(undefined);
						}}
					/>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default Index;
