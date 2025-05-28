
import { mockUsers } from "@/data/mockData";
import { MenuItem } from "@/types/infiniteMenu";

// Convert mock users to menu items
export const createUserMenuItems = (): MenuItem[] => {
  return mockUsers.slice(0, 12).map(user => ({
    image: `https://picsum.photos/400/400?random=${user.id}&grayscale`,
    link: `/profile/${user.id}`,
    title: user.name,
    description: user.dream
  }));
};
