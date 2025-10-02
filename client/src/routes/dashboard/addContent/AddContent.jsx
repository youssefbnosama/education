import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getWeekAndCourse } from "@/utilities/dashboard/weeks/content/getWeekAndCourse";
import { useParams } from "react-router-dom";

export function AddContent() {
  const [selectedType, setSelectedType] = useState("");
  const [url, setUrl] = useState("");
  const [weekTitle, setWeekTitle] = useState("");
  const [weekNumber, setWeekNumber] = useState(1);
  const [courseTitle, setCourseTitle] = useState("None");
  const [error, setError] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const { weekid } = useParams();

  //getting course name and week number
  useEffect(() => {
    let loadingFn = async () => {
      const { res, result } = await getWeekAndCourse(weekid);
      if (!res.ok) {
        console.log(result.message);
        return;
      }
      setCourseTitle(result.courseTitle);
      setWeekNumber(result.weekNumber);
    };
    loadingFn();
  }, [weekid]);

  //validation that the file is excel
  const handleFileChange = (e) => {
    setError("");
    const f = e.target.files?.[0] ?? null; // means if it is null or undefined will be "the after ??"
    if (!f) {
      setFile(null);
      return;
    }
    // basic extension check
    if (!/\.(xlsx|xls|csv)$/i.test(f.name)) {
      setError("Please upload a valid Excel or CSV file (.xlsx, .xls, .csv).");
      setFile(null);
      return;
    }
    setFile(f);
  };

  //validating the given url to URL object
  const validateURL = (value) => {
    try {
      // will throw if not a valid URL
      new URL(value);
      return true;
    } catch {
      return false;
    }
  };

  //adding the content
  const handleAdd = async () => {
    setError("");

    //not type selected
    if (!selectedType) {
      setError("Please choose a content type.");
      return;
    }

    // if the type is quiz
    if (selectedType === "quiz") {
      if (!file) {
        setError("Please attach an Excel/CSV file for the quiz.");
        return;
      }

      const formData = new FormData();
      formData.append("file", file);
      if (weekTitle.trim()) formData.append("title", weekTitle.trim());
      formData.append("type", "quiz");

      setLoading(true);
      try {
        // Posting the quiz to the endpoint
        const res = await fetch(
          `http://localhost:5000/api/dashboard/weeks/${weekid}/addquiz`,
          {
            method: "POST",
            credentials: "include",
            body: formData, // browser sets Content-Type
          }
        );

        const result = await res.json().catch(() => ({}));
        if (!res.ok) {
          setError(
            result.message || "Something went wrong while uploading the quiz."
          );
          setLoading(false);
          return;
        }

        // success
        window.location.reload();
      } catch (err) {
        setError("Network error. Please try again.");
        setLoading(false);
      } finally {
        setLoading(false);
      }

      return;
    }

    // VIDEO / PDF flow: send JSON with url + title
    if (!url.trim()) {
      setError("Please enter a valid URL.");
      return;
    }
    if (!validateURL(url.trim())) {
      setError("Please enter a valid URL format.");
      return;
    }

    const data = {
      type: selectedType,
      url: url.trim(),
      title: weekTitle.trim(),
    };

    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:5000/api/dashboard/weeks/${weekid}/addcontent`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(data),
        }
      );

      const result = await res.json();
      if (!res.ok) {
        setError(
          result.message || "Something went wrong while adding the content."
        );
        setLoading(false);
        return;
      }

      window.location.reload();
    } catch (err) {
      setError("Network error. Please try again.");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  // disable rules
  const isAddDisabled =
    loading || !selectedType || (selectedType === "quiz" ? !file : !url.trim());

  return (
    <div className="max-w-md mx-auto mt-10 p-6 rounded-2xl shadow-lg bg-white space-y-6">
      {/* Title */}
      <h2 className="text-lg font-semibold text-gray-800">
        Add a content to week {weekNumber} of the course: {courseTitle}
      </h2>

      {/* Buttons */}
      <div className="flex gap-3">
        <Button
          variant={selectedType === "video" ? "default" : "outline"}
          className="flex-1"
          onClick={() => {
            setSelectedType("video");
            setError("");
            setFile(null);
          }}
        >
          Add Video
        </Button>
        <Button
          variant={selectedType === "pdf" ? "default" : "outline"}
          className="flex-1"
          onClick={() => {
            setSelectedType("pdf");
            setError("");
            setFile(null);
          }}
        >
          Add PDF
        </Button>
        <Button
          variant={selectedType === "quiz" ? "default" : "outline"}
          className="flex-1"
          onClick={() => {
            setSelectedType("quiz");
            setError("");
            setUrl("");
          }}
        >
          Add Quiz
        </Button>
      </div>

      {/* Dynamic inputs */}
      <AnimatePresence>
        {selectedType && (
          <motion.div
            key="input"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
          >
            {/* title (used for video/pdf or quiz name) */}
            <Input
              placeholder={
                selectedType === "quiz"
                  ? "Enter quiz title (optional)"
                  : selectedType === "video"
                  ? "Enter video title"
                  : "Enter PDF title"
              }
              value={weekTitle}
              onChange={(e) => {
                setWeekTitle(e.target.value);
                setError("");
              }}
              className="mb-3"
            />

            {/* URL or file input */}
            {selectedType === "quiz" ? (
              <div className="space-y-2">
                <label className="block text-sm text-gray-600">
                  Upload Excel/CSV file
                </label>
                <input
                  type="file"
                  accept=".xlsx,.xls,.csv"
                  onChange={handleFileChange}
                  className="w-full"
                />
                {file && (
                  <p className="text-sm text-gray-600">
                    Selected file: {file.name}
                  </p>
                )}
              </div>
            ) : (
              <>
                <Input
                  placeholder={
                    selectedType === "video"
                      ? "Enter video URL"
                      : "Enter PDF URL"
                  }
                  value={url}
                  onChange={(e) => {
                    setUrl(e.target.value);
                    setError("");
                  }}
                />
                <p className="text-sm text-gray-500 mt-2">
                  You chose: <span className="font-medium">{selectedType}</span>
                </p>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error message */}
      {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

      {/* Add button */}
      <Button onClick={handleAdd} className="w-full" disabled={isAddDisabled}>
        {loading ? "Processing..." : "Add Content"}
      </Button>
    </div>
  );
}
