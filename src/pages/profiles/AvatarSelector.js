import React from 'react';
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import styles from "../../styles/ProfileEditForm.module.css";
import modalStyles from "../../styles/Modals.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Buttons.module.css";

const avatarOptions = [
    {
      label: "Vulpix",
      src: "https://res.cloudinary.com/dfwe96b7n/image/upload/v1682494810/media/profile_avatars/vulpix-avatar_nyft1u.png",
    },
    {
      label: "Sylveon",
      src: "https://res.cloudinary.com/dfwe96b7n/image/upload/v1682494810/media/profile_avatars/sylveon-avatar_akyubd.png",
    },
    {
      label: "Mudkip",
      src: "https://res.cloudinary.com/dfwe96b7n/image/upload/v1682494810/media/profile_avatars/mudkip-avatar_vdrho2.png",
    },
    {
      label: "Mew",
      src: "https://res.cloudinary.com/dfwe96b7n/image/upload/v1682494810/media/profile_avatars/mew-avatar_ghqhed.png",
    },
    {
      label: "Rowlet",
      src: "https://res.cloudinary.com/dfwe96b7n/image/upload/v1682494810/media/profile_avatars/rowlet-avatar_hqrgkr.png",
    },
    {
      label: "Snorlax",
      src: "https://res.cloudinary.com/dfwe96b7n/image/upload/v1682932428/media/profile_avatars/snorlax-avatar_l04n83.png",
    },
    {
      label: "Haunter",
      src: "https://res.cloudinary.com/dfwe96b7n/image/upload/v1682932428/media/profile_avatars/haunter-avatar_hfyodg.png",
    },
    {
      label: "Pikachu",
      src: "https://res.cloudinary.com/dfwe96b7n/image/upload/v1682932428/media/profile_avatars/pika-avatar_shtc9z.png",
    },
  ];

const AvatarSelector = ({ onSelect, setShowAvatarSelector }) => {
  return (
      <>
        <Modal.Header className={modalStyles.ModalHeader} closeButton>
          <h4>Avatars</h4>
        </Modal.Header>
        <Modal.Body className={modalStyles.ModalBody}>
            <div className={styles.AvatarSelector}>
            {avatarOptions.map(({ label, src }) => (
              <>
                <div
                key={src}
                className={`${styles.AvatarContainer} d-flex flex-column mb-4`}
                >
                  <Image
                    src={src}
                    tabIndex={0}
                    className={`${appStyles.Avatar} ${styles.AvatarSelect}`}
                    onClick={() => {
                      onSelect(src);
                    }}
                  />
                  <small className="text-center text-uppercase">{label}</small>
                </div>
              </>
            ))}
            </div>
          </Modal.Body>
          <Modal.Footer className={modalStyles.ModalFooter}>
            <Button
             className={`${btnStyles.FormBtn} ${btnStyles.Dark}`}
             onClick={() => {
                setShowAvatarSelector(false);
                }}
            >
                Close
            </Button>
            <Button
             className={`${btnStyles.FormBtn} ${btnStyles.Dark}`}
             onClick={() => {
                setShowAvatarSelector(false);
                }}
            >
                Select
            </Button>
        </Modal.Footer>
      </>
  );
}

export default AvatarSelector;