import { list, check, todo, home } from "./Icons";

export const menu = [
  {
    id: 1,
    title: "All Tasks",
    icon: home,
    link: "/",
  },
  {
    id: 2,
    title: "Important!",
    icon: list,
    link: "/important",
  },
  {
    id: 3,
    title: "Completed!",
    icon: check,
    link: "/completed",
  },
  {
    id: 4,
    title: "Do It Now",
    icon: todo,
    link: "/incomplete",
  },
];

export const auth = [
    {
        id: 5,
        title: 'Sign in',
        // icon: todo,
        link: '/signin',
    },
    {
        id: 6,
        title: 'Sign up',
        // icon: todo,
        link: '/signup',
    },
];
