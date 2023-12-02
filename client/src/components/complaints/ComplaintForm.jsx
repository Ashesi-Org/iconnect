import { useContext, useState } from "react";
import ButtonM from "../ui/ButtonM";
import Input from "../ui/Input";
import EmojiPicker from "emoji-picker-react";
import { categories } from "../hotline-room/hotline-feed/Constants";
import { api } from "../../api";
import Loader from "../ui/Loader";

  import {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
} from '../ui/toast';
import { userContext } from "../../contexts/UserContext";
import { checkForSwearWords, validateFormData } from "../../utils/validation";


const ComplaintForm = () => {
    const {user:current_user} = useContext(userContext);
  const [anonymous, setAnonymous] = useState(false);
  const [category, setCategory] = useState(1);
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [image, setImage] = useState(null);
  const [emoji, setEmoji] = useState(null);
  const [comment, setComment] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleEmojiSelection = (emoji) => {
    setEmoji(emoji.native);
    setShowEmojiPicker(false);
  };

  const handleAnonymousChange = () => {
    setAnonymous(!anonymous);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handlePriorityChange = (e) => {
    setPriority(e.target.value);
  };

  const handleImageUpload = (e) => {
    // Handle image upload logic
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  const createIssue = async () => {
  setIsSaving(true); // Set saving state to true when submitting

  // Validate form data before submission
  const isFormDataValid = validateFormData(subject, category, description, priority);

  if (isFormDataValid) {
    // Check for swear words in subject or description using the API
    const hasSwearWords = await checkForSwearWords(`${subject} ${description}`);

    if (!hasSwearWords) {
      try {
        const formData = {
          user_id: current_user?.userId,
          category_id: category,
          title: subject,
          anonymous,
          description,
          attachment_url: "",
          status: "open",
          priority,
        };

        const response = await api.post("/api/issues/create", formData);
        if (response.data.success) {
          setShowSuccessToast(true);
          setTimeout(() => {
            setShowSuccessToast(false);
          }, 3000);
          setSubject("");
          setDescription("");
          setPriority("");
          setCategory(1);
          setAnonymous(false);
          setEmoji(null);
        } else {
          setErrorMessage("Error creating issue. Please try again later.");
          setShowErrorToast(true);
        }
      } catch (error) {
        console.error("Error creating issue:", error);
        setShowErrorToast(true);
      } finally {
        setIsSaving(false);
      }
    } else {
      console.log("Swear words detected. Please remove them before submitting.");
      setErrorMessage("Swear words detected. Please remove them before submitting.");
       setShowErrorToast(true);
          setTimeout(() => {
            setShowErrorToast(false);
          }, 3000);
    setIsSaving(false);

    }
  } else {
    setErrorMessage("Invalid form data. Please check your inputs.");
      setShowErrorToast(true);
          setTimeout(() => {
            setShowErrorToast(false);
          }, 3000);
    setIsSaving(false);
  }
};


  return (
    <div className="container mx-auto py-8 flex gap-8 overflow-y-auto">
      <div className="h-full w-2/3 border-r">
        <h2 className="text-2xl font-bold mb-4">Create New Issue</h2>

        <div className="mb-4 text-lg">
          <label className="flex items-center gap-2">
            <Input
              type="checkbox"
              checked={anonymous}
              onChange={handleAnonymousChange}
              classNames={"mr-2 bg-app-background-2"}
            />
            <span className="text-sm">Anonymous</span>
          </label>
        </div>

        <div className="mb-4 text-lg">
          <div className="mb-4 text-lg shadow-card_shadow">
            <Input
              type="text"
              value={subject}
              onChange={handleSubjectChange}
              placeholder="Subject"
              className="block w-full border-gray-300 rounded p-2"
            />
          </div>
          <select
            value={category}
            onChange={handleCategoryChange}
            className="block w-full border-gray-300 bg-app-background-2 shadow-md rounded p-2 focus:none"
          >
            <option value="">Select Category</option>
            {categories.map((item, index) => {
              return (
                <option key={index} value={index + 1}>
                  {item}
                </option>
              );
            })}
          </select>
        </div>

        <div className="mb-4">
          <textarea
            value={description}
            onChange={handleDescriptionChange}
            placeholder="Description"
            className="block w-full bg-app-background-2 shadow-md border-gray-300 rounded p-2 focus:outline-none"
            rows="4"
          ></textarea>
          <button onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
            {showEmojiPicker ? "😅" : "😅"}
          </button>

          {showEmojiPicker && <EmojiPicker setEmoji={setEmoji}  />}
        </div>

        <div className="mb-4 text-lg">
          <label className="block mb-2">Priority:</label>
          <div>
            <label className="mr-4">
              <input
                type="radio"
                value="high"
                checked={priority === "high"}
                onChange={handlePriorityChange}
                className="mr-1"
              />
              High
            </label>
            <label className="mr-4 ">
              <input
                type="radio"
                value="medium"
                checked={priority === "medium"}
                onChange={handlePriorityChange}
                className="mr-1"
              />
              Medium
            </label>
            <label className="mr-4">
              <input
                type="radio"
                value="low"
                checked={priority === "low"}
                onChange={handlePriorityChange}
                className="mr-1"
              />
              Low
            </label>
          </div>
        </div>

        <div className="mb-4">
          <input
            type="file"
            onChange={handleImageUpload}
            className="border-gray-300 rounded p-2"
          />
        </div>

        <ButtonM
          type="primary"
          className="flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white  hover:bg-app-green-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 "
          onClick={createIssue}

        >
          {isSaving ? <Loader width={20} height={20} message={"checking..."}/> : "Submit"}
        </ButtonM>
      </div>

      <div className="w-1/3 h-full">
        <div className="h-full w-full p-4 rounded-lg bg-app-background-2 shadow-md">
          <h3 className="text-lg font-semibold mb-4 text-center">Preview</h3>
          <div className="mb-4">
            <p className="text-gray-700">
              <strong>Reporting as:</strong>{" "}
              {anonymous ? "Anonymous" : "Not Anonymous"}
            </p>
          </div>
          <div className="mb-4">
            <p className="text-gray-700">
              <strong>Category:</strong> {category || "Not selected"}
            </p>
          </div>
          <div className="mb-4">
            <p className="text-gray-700">
              <strong>Subject:</strong> {subject || "No subject"}
            </p>
          </div>
          <div className="mb-4">
            <p className="text-gray-700">
              <strong>Description:</strong> {description || "No description"}
            </p>
          </div>
          <div className="mb-4">
            <p className="text-gray-700">
              <strong>Priority:</strong> {priority || "Not selected"}
            </p>
          </div>
          <div className="mb-4">
            <p className="text-gray-700">
              <strong>Reactions:</strong> {emoji || "Not selected"}
            </p>
          </div>
          {image && (
            <div className="mb-4">
              <p className="text-gray-700">
                <strong>Image:</strong>
              </p>
              <img
                src={URL.createObjectURL(image)}
                alt="Uploaded"
                className="mt-2 rounded-md"
              />
            </div>
          )}
        </div>
      </div>
            {/* Toast components */}
      {showSuccessToast && (
        <ToastProvider>
          <ToastViewport>
            <Toast>
              <ToastTitle>Success</ToastTitle>
              <ToastDescription>Complaint raised successfully.</ToastDescription>
              <ToastClose onClick={() => setShowSuccessToast(false)} />
            </Toast>
          </ToastViewport>
        </ToastProvider>
      )}
      {showErrorToast && (
        <ToastProvider>
          <ToastViewport>
            <Toast className="bg-red-200">
              <ToastTitle className="text-red-500">Error</ToastTitle>
              <ToastDescription>{errorMessage}</ToastDescription>
              <ToastClose onClick={() => setShowErrorToast(false)} />
            </Toast>
          </ToastViewport>
        </ToastProvider>
      )}

    </div>
  );
};

export default ComplaintForm;
