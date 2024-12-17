"use client";

import Image from "next/image";
import React, { FC, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useRouter } from "next/navigation";
import { Divider } from "@mui/material";

const navlinks = [
  { name: "NEW IN", url: "/new-in" },
  { name: "SHOP", url: "/shop" },
  { name: "SALE", url: "/sale" },
  { name: "RTW", url: "/rtw" },
  { name: "COLLECTIONS", url: "/collections" },
  { name: "BRIDAL", url: "/bridal" },
];

const MobileNavbar: FC = () => {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box
      sx={{
        width: 250,
        fontFamily: "font-montserrat",
        color: "#363435",
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <List>
        <ListItem>
          <Image
            src="/assets/main_logo.svg"
            alt="logo"
            width={62}
            height={36}
          />
        </ListItem>
      </List>
      <Divider />
      <List>
        {navlinks.map((link, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton>
              {/* <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon> */}
              <ListItemText
                onClick={() => router.push(link.url)}
                primary={link.name}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div className="flex flex-col fixed z-50 w-full block md:hidden">
      <div className="w-full h-[32px] bg-custom-radial text-center font-montserrat font-medium text-sm texxt-[#333333]">
        TEXT TEXT TEXT TEXT
      </div>
      <div className="w-full flex justify-between py-[1rem] px-[2rem] bg-[#fafafa]">
        <GiHamburgerMenu
          onClick={toggleDrawer(true)}
          className="text-[#4f4f4f] relative top-[0.7rem]"
          size={25}
        />
        <Drawer
          sx={{
            height: "60vh",
            flexShrink: 0,
            // backgroundColor: "#363435",
            "& .MuiDrawer-paper": {
              height: "60vh",
              boxSizing: "border-box",
            },
          }}
          open={open}
          onClose={toggleDrawer(false)}
        >
          {DrawerList}
        </Drawer>
        <div className="">
          <Image
            src="/assets/main_logo.svg"
            alt="logo"
            width={62}
            height={36}
            onClick={() => router.push("/")}
          />
        </div>
        <div className="flex justify-between w-[25%]">
          <div className="flex justify-between w-full">
            <FiSearch
              className="text-[#4f4f4f] relative top-[0.7rem] ml-[0.1rem]"
              size={25}
            />
            <AiOutlineShoppingCart
              className="text-[#4f4f4f] relative top-[0.7rem] ml-[0.7rem]"
              size={25}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileNavbar;
