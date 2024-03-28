import { useState } from "react";
import { useForm } from "react-hook-form";
import { FilledButton } from "components/widgets/buttons";
import {
  CameraIcon,
  CheckIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import { FieldController } from "components/_controllers";
import { OutlineInputField } from "components/widgets/inputs";
import _styles from "./_styles.module.css";

function UserProfile() {
  const userData = {
    name: "Rahim Rahman",
    studentId: "",
    email: "",
    phone: "01679111110",
    imageUrl: "",
    role: "",
    company: "",
    position: "",
    stack: "",
    passingYear: "",
    address: "",
    social_accounts: {
      facebook: "",
      linkedin: "",
    },
  };

  const [openModal, setOpenModal] = useState(false);
  const [previewImage, setPreviewImage] = useState(
    userData?.imageUrl ||
      "https://lnsel.com/wp-content/uploads/2018/12/anon-avatar-300x300.png",
  );
  const [roleValue, setRoleValue] = useState(userData?.role || "");

  const defaultValues = {
    name: userData?.name || "Rahim Rahman",
    studentId: userData?.studentId || "170200",
    email: userData?.email || "test1700@cseku.ac.bd",
    phone: userData?.phone || "01679111110",
    imageUrl: userData?.imageUrl || "",
    role: userData?.role || "",
    company: userData?.company || "",
    position: userData?.position || "",
    stack: userData?.stack || "",
    passingYear: userData?.passingYear || "",
    address: userData?.address || "",
    social_accounts: {
      facebook: userData?.social_accounts?.facebook || "",
      linkedin: userData?.social_accounts?.linkedin || "",
    },
  };

  const { control, register, handleSubmit } = useForm({
    defaultValues: defaultValues,
  });

  const handleFormSubmit = (data) => {
    console.log("form data", data);
    setOpenModal(false);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    if (!file.type.match("image/*")) {
      alert("Invalid file type. Please select an image.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => setPreviewImage(e.target.result);
    register("imageUrl");
    reader.readAsDataURL(file);
  };

  return (
    <>
      <div className={_styles.button} onClick={() => setOpenModal(true)}>
        <FilledButton startIcon={PencilSquareIcon}>Edit</FilledButton>
      </div>
      {openModal && (
        <form
          className={_styles.modal_container}
          onSubmit={handleSubmit(handleFormSubmit)}>
          {/* Basic Info Section */}
          <section className={_styles.basic_info}>
            <img
              src={previewImage}
              alt="profile image"
              className={_styles.profile_image}
            />
            <label htmlFor="fileInput">
              <CameraIcon className={_styles.editImageIcon} />
            </label>
            <div className={_styles.name}>{userData?.name}</div>
            <div className={_styles.role}>
              <input
                type="text"
                placeholder="Add Role"
                {...register("role")}
                value={roleValue}
                className={_styles.addRole}
                onChange={(e) => setRoleValue(e.target.value)}
              />
            </div>

            <input
              id="fileInput"
              type="file"
              {...register("imageUrl")}
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageUpload}
            />
          </section>

          {/* Job Info Section */}
          <section className={_styles.container}>
            <h2 className={_styles.title}>Job Info</h2>
            <FieldController name="company" control={control}>
              <OutlineInputField label="Company" />
            </FieldController>
            <FieldController name="position" control={control}>
              <OutlineInputField label="Position" />
            </FieldController>
            <FieldController name="stack" control={control}>
              <OutlineInputField label="Stack" />
            </FieldController>
          </section>

          {/* Personal Info Section */}
          <section className={_styles.container}>
            <h2 className={_styles.title}>Personal Info</h2>
            <FieldController name="studentId" control={control}>
              <OutlineInputField label="Student ID" readOnly />
            </FieldController>
            <FieldController name="email" control={control}>
              <OutlineInputField label="Email" />
            </FieldController>
            <FieldController name="phone" control={control}>
              <OutlineInputField label="Phone" />
            </FieldController>
            <FieldController name="passingYear" control={control}>
              <OutlineInputField label="Passing Year" />
            </FieldController>
            <FieldController name="address" control={control}>
              <OutlineInputField label="Address" />
            </FieldController>
          </section>

          {/* Social Info Section */}
          <section className={_styles.container}>
          <h2 className={_styles.title}>Social Accounts</h2>
          <div className={_styles.social_accounts}>
          <FieldController name="social_accounts.facebook" control={control}>
              <OutlineInputField label="Facebook URL" />
            </FieldController>
            <FieldController name="social_accounts.linkedin" control={control}>
              <OutlineInputField label="Linkedin URL" />
            </FieldController>
            </div>
          </section>

          <div className={_styles.save_button} onClick={handleSubmit(handleFormSubmit)}>
            <FilledButton startIcon={CheckIcon}>Save</FilledButton>
          </div>
        </form>
      )}
    </>
  );
}

export default UserProfile;
