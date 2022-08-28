export const sortOptions = [
  { name: "Best Rating", href: "#", current: false },
  { name: "Newest", href: "#", current: false },
  { name: "Reset", href: "#", current: false },
];
export const subCategories = [
  // top
  { name: "WishList", href: "/wishlist" },
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
];

export const filters = [
  {
    id: "category",
    name: "Category",
    options: [
      { value: "apartment", label: "Apartment", checked: false },
      { value: "villa", label: "villa", checked: false },
      { value: "studio", label: "Studio", checked: false },
      { value: "townhouse", label: "Townhouse", checked: false },
      { value: "house", label: "house", checked: false },
    ],
  },
];
