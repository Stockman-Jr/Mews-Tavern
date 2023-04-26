import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import styles from "../styles/Dropdowns.module.css";

import Avatar from "./Avatar";

import { GiPokecog } from "react-icons/gi";
import { IoMdArrowDropdown } from "react-icons/io";
import { HiPencilAlt, HiTrash } from "react-icons/hi";
import { useHistory } from "react-router";

const Cog = React.forwardRef(({ onClick }, ref) => (
    <div
      className={styles.Toggle}
      ref={ref}
      onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
    >
        <GiPokecog />
        </div>
  ));

const AvatarDrop = React.forwardRef(({ onClick, src }, ref) => (
    <div
      className={styles.ToggleArrow}
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      <Avatar src={src} />
      <IoMdArrowDropdown />
    </div>
  ));


export const ConfigDropdown = ({handleEdit, handleDelete}) => {
    return (
        <Dropdown className="ml-auto" drop="left">
            <Dropdown.Toggle as={Cog} />
            <Dropdown.Menu
                className="text-center"
                popperConfig={{ strategy: "fixed" }}
            >
                <Dropdown.Item
                    className={styles.DropdownItem}
                    onClick={handleEdit}
                    aria-label="edit"
                >
                    <HiPencilAlt />
                </Dropdown.Item>
                <Dropdown.Item
                    className={styles.DropdownItem}
                    onClick={handleDelete}
                    aria-label="delete"
                >
                    <HiTrash />
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export const ProfileMenuDropdown = ({ id, profileAvatar }) => {
    const history = useHistory();
    return (
      <Dropdown className="mr-auto" drop="down">
        <Dropdown.Toggle as={AvatarDrop} src={profileAvatar} />
        <Dropdown.Menu className={`${styles.DropMenuProfile} text-center mr-2`}>
          <Dropdown.Item
            onClick={() => history.push(`/profiles/${id}`)}
            aria-label="edit"
          >
            <small>Profile</small>
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => history.push(`/profiles/${id}/edit`)}
            aria-label="edit"
          >
           <small>Edit profile</small>
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => history.push(`/profiles/${id}/edit/account`)}
            aria-label="edit-password-username"
          >
            <small>Account settings</small>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  };