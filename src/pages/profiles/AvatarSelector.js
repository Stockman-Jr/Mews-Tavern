import React from 'react';
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import styles from "../../styles/ProfileEditForm.module.css";
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
  ];

const AvatarSelector = ({ onSelect, setShowAvatarSelector }) => {
  return (
      <>
          <Modal.Header className={styles.ModalHeader} closeButton>
            <Modal.Title>Choose Avatar</Modal.Title>
          </Modal.Header>
          <Modal.Body className={styles.ModalBody}>
              <div className={styles.AvatarSelector}>
                {avatarOptions.map(({ label, src }) => (
                <>
                    <div
                    key={src}
                    className={`${styles.AvatarContainer} d-flex flex-column`}
                    >
                        <Image
                        src={src}
                        tabIndex={0}
                        className={`${appStyles.Avatar} ${styles.AvatarSelect}`}
                        onClick={() => {
                            onSelect(src);
                            }}
                        />
                            <small className="text-center">{label}</small>
                    </div>
                 </>
                ))}
              </div>
          </Modal.Body>
          <Modal.Footer className={styles.ModalFooter}>
            <Button
             className={`${btnStyles.FormBtn} ${btnStyles.Dark}`}
             onClick={() => setShowAvatarSelector(false)}
            >
                Close
            </Button>
            <Button
             className={`${btnStyles.FormBtn} ${btnStyles.Dark}`}
             onClick={() => {
                onSelect(null);
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