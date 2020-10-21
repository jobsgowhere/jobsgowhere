import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { Menu, MenuItem, MenuLink, StyledMenuItem } from "../../components/Menu";
import { FullProfile } from "../../types";
import Button from "../Button";

const ProfileImage = styled.img`
  border-radius: 100%;
  height: 4rem;
  width: 4rem;
`;

const ProfileIcon = () => (
  <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M20 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const MyPostsIcon = () => (
  <svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M19 13a2 2 0 0 1-2 2H5l-4 4V3a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const LogoutIcon = () => (
  <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

type Props = {
  isLoggedIn: boolean;
  handleLogin: () => void;
  handleLogout: () => void;
  profile: FullProfile | null;
};

const UserNav: React.FC<Props> = function ({ isLoggedIn, handleLogin, handleLogout, profile }) {
  if (isLoggedIn) {
    return (
      <ul>
        <li>
          <Link to="/posts/new">
            <Button secondary>New Post</Button>
          </Link>
        </li>
        <li>
          <Menu button={<ProfileImage src={profile?.picture ?? ""} height="64" width="64" />}>
            <MenuLink as={Link} to="/profile">
              <StyledMenuItem>
                <ProfileIcon />
                Profile
              </StyledMenuItem>
            </MenuLink>
            <MenuLink as={Link} to="/my-posts">
              <StyledMenuItem>
                <MyPostsIcon />
                My Posts
              </StyledMenuItem>
            </MenuLink>
            <MenuItem as={StyledMenuItem} onSelect={handleLogout}>
              <LogoutIcon />
              Log Out
            </MenuItem>
          </Menu>
        </li>
      </ul>
    );
  } else {
    return (
      <a onClick={handleLogin}>
        <Button primary>Sign In</Button>
      </a>
    );
  }
};

export default UserNav;
