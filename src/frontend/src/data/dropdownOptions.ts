import NavEntry from "../types/NavEntry";

const username = localStorage.getItem("auth_username")
  ? localStorage.getItem("auth_username")
  : "";

const dropdownOptions: NavEntry[][] = [
  [
    {
      url: "/workshop",
      text: "Workshop",
      isLink: true,
    },
    {
      url: "/learn",
      text: "Learn",
      isLink: true,
    },
  ],
  [
    {
      url: `/profile/${username}`,
      text: "Profile",
      isLink: true,
    },
    {
      text: "Logout",
      isLink: false,
    },
  ],
];

export default dropdownOptions;
