import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import styles from "../styles/Dropdowns.module.css";

import { CgMore } from "react-icons/cg";
import { HiPencilAlt, HiTrash } from "react-icons/hi";

const Dots = React.forwardRef(({ onClick, ref}) => (
    <CgMore 
    ref={ref}
    onClick={(e) => {
        e.preventDefault();
        onClick(e);
    }}
    />
));


export const ConfigDropdown = ({ handleEdit, handleDelete }) => {
    return (
        <Dropdown>
            <Dropdown.Toggle as={Dots} />
            <Dropdown.Menu>
                <Dropdown.Item>
                    onClick={handleEdit}
                    aria-label="edit"
                    <HiPencilAlt />
                </Dropdown.Item>
                <Dropdown.Item>
                    onClick={handleDelete}
                    aria-label="delete"
                    <HiTrash />
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};