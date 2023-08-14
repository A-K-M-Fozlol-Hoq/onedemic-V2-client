/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { BsGrid1X2Fill } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { GrSend } from "react-icons/gr";
import { MdOutlineSsidChart } from "react-icons/md";
import { RiFilePaper2Line, RiUserSettingsLine } from "react-icons/ri";
import { SiProtodotio } from "react-icons/si";
import { TbChartArrows, TbTools } from "react-icons/tb";
import { TfiWrite } from "react-icons/tfi";

import { logout } from "@/features/auth/authSlice";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

const links = [
  // {
  //   href: "/dashboard",
  //   text: "Dashboard",
  //   icon: <GrHomeOption />,
  // },
  {
    href: "/dashboard/manage-profile",
    text: "Manage Profile",
    icon: <RiUserSettingsLine />,
  },
  {
    href: "/dashboard/create-course",
    text: "Create Course",
    icon: <TfiWrite />,
  },
  {
    href: "/dashboard/courses",
    text: "Courses",
    icon: <BsGrid1X2Fill />,
  },
  {
    href: "/dashboard/create-exam",
    text: "Create exam",
    icon: <RiFilePaper2Line />,
  },
  {
    href: "/dashboard/messaging",
    text: "Messaging",
    icon: <GrSend />,
  },
  {
    href: "/dashboard/manage-course",
    text: "Manage course",
    icon: <TbTools />,
  },
  {
    href: "/dashboard/manage-result",
    text: "Result Management",
    icon: <MdOutlineSsidChart />,
  },
  {
    href: "/dashboard/subscription",
    text: "subscription",
    icon: <SiProtodotio />,
  },
  // {
  //   href: "/dashboard/exams",
  //   text: "Exams",
  //   icon: <BsFillFileEarmarkLock2Fill />,
  // },
  {
    href: "/dashboard/view-progress",
    text: "view progress",
    icon: <TbChartArrows />,
  },
];

export default function TeacherDashboardLayout({ children }) {
  const dispatch = useDispatch();
  const { push } = useRouter();
  const { user } = useSelector((state) => state.auth);

  // useEffect(() => {
  //   if (user.role !== "student" || user.role !== "teacher") {
  //     push("/createProfile");
  //   }
  // }, []);
  const [open, setOpen] = useState(true);
  const router = useRouter();

  const handleMenuOpen = () => {
    setOpen(true);
  };

  const handleMenuClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    // handle logout logic here
    dispatch(logout());
    push("/");
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
            src={user.profile}
            style={{ height: "30px", width: "30px", borderRadius: "50%" }}
            alt=""
          />
          <button
            onClick={handleViewProfile}
            style={{ margin: "0 15px 0 5px" }}
          >
            {user?.email}
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
          © {new Date().getFullYear()} OneDemic Online Examination. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
}
