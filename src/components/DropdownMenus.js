import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import styles from "../styles/Dropdowns.module.css";

import { CgMore } from "react-icons/cg";
import { HiPencilAlt, HiTrash } from "react-icons/hi";

const Dots = React.forwardRef(({ onClick }, ref) => (
    <div
      className={styles.Toggle}
      ref={ref}
      onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
    >
        <CgMore />
        </div>
  ));


export const ConfigDropdown = ({handleEdit, handleDelete}) => {

    return (
        <Dropdown className="ml-auto" drop="left">
            <Dropdown.Toggle as={Dots} />
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