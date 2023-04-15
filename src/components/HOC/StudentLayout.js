/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { RiUserSettingsLine, RiFilePaper2Line } from "react-icons/ri";
import { TfiWrite } from "react-icons/tfi";
import { BsGrid1X2Fill, BsFillFileEarmarkLock2Fill } from "react-icons/bs";
import { GrSend, GrHomeOption } from "react-icons/gr";
import { TbTools, TbChartArrows } from "react-icons/tb";
import { MdOutlineSsidChart } from "react-icons/md";
import { SiProtodotio } from "react-icons/si";

import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useRouter } from "next/router";
import Image from "next/image";

const links = [
  {
    href: "/dashboard",
    text: "Dashboard",
    icon: <GrHomeOption />,
  },
  {
    href: "/manage-profile",
    text: "Manage Profile",
    icon: <RiUserSettingsLine />,
  },
  {
    href: "/create-course",
    text: "Create Course",
    icon: <TfiWrite />,
  },
  {
    href: "/courses",
    text: "Courses",
    icon: <BsGrid1X2Fill />,
  },
  {
    href: "/create-exam",
    text: "Create exam",
    icon: <RiFilePaper2Line />,
  },
  {
    href: "/messaging",
    text: "Messaging",
    icon: <GrSend />,
  },
  {
    href: "/manage-course",
    text: "Manage course",
    icon: <TbTools />,
  },
  {
    href: "/manage-resule",
    text: "Result Management",
    icon: <MdOutlineSsidChart />,
  },
  {
    href: "/subscription",
    text: "subscription",
    icon: <SiProtodotio />,
  },
  {
    href: "/exams",
    text: "Exams",
    icon: <BsFillFileEarmarkLock2Fill />,
  },
  {
    href: "/view-progress",
    text: "view progress",
    icon: <TbChartArrows />,
  },
];

export default function StudentLayout({ children }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleMenuOpen = () => {
    setOpen(true);
  };

  const handleMenuClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    // handle logout logic here
  };

  const handleViewProfile = () => {
    // handle view profile logic here
  };

  const isActiveLink = (href) => router.pathname === href;

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-blue-700 text-white shadow-sm py-4 px-6 flex justify-between items-center">
        <button onClick={handleMenuOpen}>
          <GiHamburgerMenu />
        </button>
        <nav className="flex items-center space-x-4">
          <img
            src={"https://avatars.githubusercontent.com/u/61866994?v=4"}
            style={{ height: "30px", width: "30px", borderRadius: "50%" }}
            alt=""
          />
          <button
            onClick={handleViewProfile}
            style={{ margin: "0 15px 0 5px" }}
          >
            akmfozlolhoq@gmailcom
          </button>
          <button onClick={handleLogout}>logout</button>
        </nav>
      </header>

      <Drawer anchor="left" open={open} onClose={handleMenuClose}>
        <div className="px-4 py-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-medium text-gray-800">Menu</h2>
            <button onClick={handleMenuClose}>
              <AiOutlineArrowLeft />
            </button>
          </div>
          <List>
            {links.map(({ href, text, icon }) => (
              <Link href={href} key={href}>
                <ListItem button selected={isActiveLink(href)}>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              </Link>
            ))}
          </List>
        </div>
      </Drawer>

      <main className="flex-grow bg-white">{children}</main>

      <footer className="bg-green-500 text-white py-4 px-6 text-center">
        <p>
          © {new Date().getFullYear()} EdTech Online Examination. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
}
