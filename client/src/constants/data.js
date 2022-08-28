import lamps from "../assets/images/home/lamps.png";
import smallTree from "../assets/images/home/small-tree.png";
import sofa from "../assets/images/home/sofa.png";

import { ReactComponent as Dollar } from "../assets/icons/aboutUs/dollar.svg";
import { ReactComponent as Gift } from "../assets/icons/aboutUs/gift.svg";
import { ReactComponent as Phone } from "../assets/icons/aboutUs/ic-phone.svg";
import { ReactComponent as Plane } from "../assets/icons/aboutUs/ic-plane.svg";
import { ReactComponent as House } from "../assets/icons/contactUs/ic-house.svg";
import { ReactComponent as Mail } from "../assets/icons/contactUs/ic-mail.svg";
import { logout, updatePassword, updateProfile } from "./functions";

export const productCategory = [
  {
    title: "Apartment",
    onClick: (setFieldValue, name) => setFieldValue(name, "Apartment"),
  },
  {
    title: "villa",
    onClick: (setFieldValue, name) => setFieldValue(name, "villa"),
  },
  {
    title: "Studio",
    onClick: (setFieldValue, name) => setFieldValue(name, "Studio"),
  },
  {
    title: "Townhouse",
    onClick: (setFieldValue, name) => setFieldValue(name, "Townhouse"),
  },
  {
    title: "Twin house,",
    onClick: (setFieldValue, name) => setFieldValue(name, "Twin house,"),
  },
  {
    title: "house",
    onClick: (setFieldValue, name) => setFieldValue(name, "house"),
  },
];

//user - header - name is unique
export const shope = {
  // name
  pages: [
    { name: "Home", to: "/" },
    { name: "Shope", to: "/shope" },
    { name: "Create Product", to: "/createProduct" },
    { name: "Contact", to: "/contact" },
    { name: "About Us", to: "/about" },
    { name: "Blog", to: "/blog" },
    {
      name: "Sale",
      to: "/sale",
      className: "!text-accent-red",
    },
  ],
};
// user - header dropdown - title
export const userDropdown = [
  {
    title: "update Profile",
    onClick: updateProfile,
    className: "",
  },
  {
    title: "update password",
    onClick: updatePassword,
    className: "",
  },
  {
    title: "Logout",
    onClick: logout,
    className:
      "grid place-items-center text-lg font-medium bg-secondary-darker shadow-[0px_1px_6px_var(--secondary-darker)] w-[96%] text-white mx-auto mb-2",
  },
];

// home - cards - imgAlt
export const homeCards = [
  {
    bgColor: "bg-accent-red",
    img: sofa,
    imgAlt: "sofa",
    position: "-bottom-8",
    desc: "“Owning a home is a keystone of wealth… both financial affluence and emotional security.”",
  },
  {
    bgColor: "bg-neutral-lighter text-neutral-darkest",
    img: smallTree,
    imgAlt: "small trees",
    position: "",
    desc: "“A man travels the world over in search of what he needs and returns home to find it.”",
  },
  {
    bgColor: "bg-accent-yellow",
    img: lamps,
    imgAlt: "lamps",
    position: "-top-8",
    desc: "“The problem with real estate is that it’s local. You have to understand the local market.” ",
  },
];

// about us - icon - title
export const aboutCard = [
  { Icon: Plane, title: "Free World Delivery", t2: "Orders over $200" },
  { Icon: Dollar, title: "Money Back Guarantee", t2: "Within 30 days" },
  { Icon: Phone, title: "Online Support", t2: "Free support system 24/7" },
  { Icon: Gift, title: "Member Gift", t2: "Coupon at weekend" },
];

// contact us faq - index (unique)
export const faqData = [
  {
    que: "What Shipping Methods Are Available?",
    ans: `Sed quis nunc efficitur, gravida orci sed, gravida felis. Quisque non euismod felis. Suspendisse consectetur, tellus in condimentum fringilla, turpis massa facilisis augue, eget tempor nibh dui in dolor. Donec sagittis scelerisque est. Nam tristique porta ligula, vel viverra sem eleifend nec. Nulla sed purus augue, eu euismod tellus. Nam mattis eros nec mi sagittis sagittis. Vestibulum suscipit cursus bibendum. Integer at justo eget sem auctor auctor eget vitae arcu. Nam tempor malesuada porttitor. Nulla quis dignissim ipsum. Aliquam pulvinar iaculis justo, sit amet interdum sem hendrerit vitae. Vivamus vel erat tortor. Nulla facilisi. In nulla quam, lacinia eu aliquam ac, aliquam in nisl.
		<br />1. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
		<br />2. Maecenas ullamcorper est et massa mattis condimentum.
		<br />3. Vestibulum sed massa vel ipsum imperdiet malesuada id tempus nisl.
		<br />4. Etiam nec massa et lectus faucibus ornare congue in nunc.
		<br />5. Mauris eget diam magna, in blandit turpis.
		<br />
		<br />
		In cursus faucibus tortor eu vestibulum. Ut eget turpis ac justo porta varius. Donec vel felis ante, ac vehicula ipsum. Quisque sed diam metus. Quisque eget leo sit amet erat varius rutrum vitae dapibus lectus. Vivamus et sapien ante. Suspendisse potenti. Fusce in tellus est, ac consequat lacus. Nulla risus massa, commodo in imperdiet ut, ornare in leo. Duis pellentesque sagittis lorem, sed mollis lorem venenatis id.`,
  },
  {
    que: "Do You Ship Internationally?",
    ans: "Sed quis nunc efficitur, gravida orci sed, gravida felis. Quisque non euismod felis. Suspendisse consectetur, tellus in condimentum fringilla, turpis massa facilisis augue",
  },
  {
    que: "How Long Will It Take To Get My Package?",
    ans: "Sed quis nunc efficitur, gravida orci sed, gravida felis. Quisque non euismod felis. Suspendisse consectetur, tellus in condimentum fringilla, turpis massa facilisis augue",
  },
  {
    que: "What Payment Methods Are Accepted?",
    ans: "Sed quis nunc efficitur, gravida orci sed, gravida felis. Quisque non euismod felis. Suspendisse consectetur, tellus in condimentum fringilla, turpis massa facilisis augue",
  },
  {
    que: "What Happens If There Is A Pricing Error?",
    ans: "Sed quis nunc efficitur, gravida orci sed, gravida felis. Quisque non euismod felis. Suspendisse consectetur, tellus in condimentum fringilla, turpis massa facilisis augue",
  },
  {
    que: "How do I place an Order?",
    ans: "Sed quis nunc efficitur, gravida orci sed, gravida felis. Quisque non euismod felis. Suspendisse consectetur, tellus in condimentum fringilla, turpis massa facilisis augue",
  },
  {
    que: "Who Should I Contact If I Have Any Queries?",
    ans: "Sed quis nunc efficitur, gravida orci sed, gravida felis. Quisque non euismod felis. Suspendisse consectetur, tellus in condimentum fringilla, turpis massa facilisis augue",
  },
];

// contact use & footer - title

export const contactInfo = [
  {
    Icon: House,
    title: "Gulberg C street #6 house #89, Faisalabad, Pakistan",
    href: "",
  },
  {
    Icon: Phone,
    title: "03011800058, 03061800058",
    link: "tel:+92011800058",
  },
  {
    Icon: Mail,
    title: "danishsjjd@gmail.com",
    link: "mailto:danishsjjd@gmail.com",
  },
];
