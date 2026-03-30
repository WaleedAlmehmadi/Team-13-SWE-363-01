import { useEffect, useState } from "react";
import { Check, Lock, BookOpen, Clock, Plus } from "lucide-react";
import { useLocation, useNavigate } from "react-router";
import { SuccessModal } from "../modals/SuccessModal";
import { ErrorModal } from "../modals/ErrorModal";
import { allCourses, semesters, type Course } from "../../data/roadmap";

export function Roadmap() {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [hoveredCourse, setHoveredCourse] = useState<string | null>(null);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState({ title: "", message: "" });
  const [addedCourses, setAddedCourses] = useState<string[]>([]);
  const [successCourseName, setSuccessCourseName] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const selectedCourseId = params.get("course");
    const searchQuery = params.get("q")?.toLowerCase().trim();

    if (selectedCourseId) {
      setSelectedCourse(allCourses.find((course) => course.id === selectedCourseId) ?? null);
      return;
    }

    if (searchQuery) {
      setSelectedCourse(
        allCourses.find(
          (course) =>
            course.code.toLowerCase().includes(searchQuery) ||
            course.name.toLowerCase().includes(searchQuery),
        ) ?? null,
      );
      return;
    }

    setSelectedCourse(null);
  }, [location.search]);

  const handleAddToPlan = (course: Course) => {
    if (addedCourses.includes(course.id)) {
      setErrorMessage({
        title: "Action Failed",
        message: "This course is already in your Major Plan.",
      });
      setErrorModalOpen(true);
      return;
    }

    const hasUnmetPrereqs = course.prerequisites.some((prereqId) => {
      const prereq = semesters.flatMap((semester) => semester.courses).find((item) => item.id === prereqId);
      return prereq && prereq.status !== "completed";
    });

    if (hasUnmetPrereqs) {
      setErrorMessage({
        title: "Registration Failed",
        message: "You must complete the required prerequisite before registering for this course.",
      });
      setErrorModalOpen(true);
      return;
    }

    setAddedCourses([...addedCourses, course.id]);
    setSuccessCourseName(`${course.code} - ${course.name}`);
    setSuccessModalOpen(true);
  };

  const getColorClasses = (color: Course["color"], status: Course["status"]) => {
    const baseColors = {
      yellow: "bg-[#FEF3C7] border-[#FCD34D] text-[#92400E]",
      blue: "bg-[#DBEAFE] border-[#93C5FD] text-[#1E40AF]",
      green: "bg-[#D1FAE5] border-[#6EE7B7] text-[#065F46]",
      orange: "bg-[#FED7AA] border-[#FB923C] text-[#9A3412]",
      purple: "bg-[#E9D5FF] border-[#C084FC] text-[#6B21A8]",
      gray: "bg-[#E5E7EB] border-[#9CA3AF] text-[#374151]",
      pink: "bg-[#FBCFE8] border-[#F472B6] text-[#9F1239]",
    };

    if (status === "completed") {
      return "bg-[#10B981] border-[#10B981] text-white";
    }
    if (status === "in-progress") {
      return "bg-[#06B6D4] border-[#06B6D4] text-white";
    }
    if (status === "locked") {
      return "bg-gray-100 border-gray-300 text-gray-400 opacity-60";
    }

    return baseColors[color];
  };

  const getStatusIcon = (status: Course["status"]) => {
    if (status === "completed") {
      return <Check className="h-4 w-4" />;
    }
    if (status === "locked") {
      return <Lock className="h-4 w-4" />;
    }
    return null;
  };

  const completedCredits = semesters.reduce((total, semester) => {
    return total + semester.courses.filter((course) => course.status === "completed").reduce((sum, course) => sum + course.credits, 0);
  }, 0);

  const inProgressCredits = semesters.reduce((total, semester) => {
    return total + semester.courses.filter((course) => course.status === "in-progress").reduce((sum, course) => sum + course.credits, 0);
  }, 0);

  return (
    <div className="p-8">
      <div className="mb-8">
        <div className="mb-6 text-center">
          <div className="mb-1 text-sm font-semibold text-[#1E3A8A] dark:text-[#06B6D4]">KING FAHD UNIVERSITY OF PETROLEUM & MINERALS</div>
          <div className="mb-3 text-xs text-gray-600 dark:text-gray-400">College of Computer Sciences & Engineering</div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Software Engineering (SWE) Pre-Requisites Chart</h1>
          <p className="mt-1 text-lg text-gray-600 dark:text-gray-400">(129 Credit-Hours)</p>
        </div>

        <div className="mx-auto grid max-w-3xl grid-cols-3 gap-4">
          <div className="rounded-[16px] border border-[#10B981]/20 bg-gradient-to-br from-[#10B981]/10 to-[#10B981]/5 p-4 dark:from-[#10B981]/20 dark:to-[#10B981]/10">
            <div className="text-2xl font-bold text-[#10B981]">{completedCredits}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Credits Completed</div>
          </div>
          <div className="rounded-[16px] border border-[#06B6D4]/20 bg-gradient-to-br from-[#06B6D4]/10 to-[#06B6D4]/5 p-4 dark:from-[#06B6D4]/20 dark:to-[#06B6D4]/10">
            <div className="text-2xl font-bold text-[#06B6D4]">{inProgressCredits}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">In Progress</div>
          </div>
          <div className="rounded-[16px] border border-[#1E3A8A]/20 bg-gradient-to-br from-[#1E3A8A]/10 to-[#1E3A8A]/5 p-4 dark:from-[#1E3A8A]/20 dark:to-[#1E3A8A]/10">
            <div className="text-2xl font-bold text-[#1E3A8A] dark:text-[#06B6D4]">{129 - completedCredits - inProgressCredits}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Remaining</div>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto rounded-[16px] border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
        <div className="min-w-[1200px]">
          <div className="grid grid-cols-9 gap-4">
            {semesters.map((semester, idx) => (
              <div key={idx} className="flex flex-col">
                <div className="mb-4 text-center">
                  <div className="text-xs font-semibold uppercase tracking-wide text-[#1E3A8A] dark:text-[#06B6D4]">{semester.year}</div>
                  <div className="mt-1 text-sm font-bold text-gray-900 dark:text-gray-100">{semester.title}</div>
                  <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">{semester.totalCredits} CH</div>
                </div>

                <div className="flex-1 space-y-3">
                  {semester.courses.map((course) => (
                    <div
                      key={course.id}
                      onClick={() => setSelectedCourse(course)}
                      onMouseEnter={() => setHoveredCourse(course.id)}
                      onMouseLeave={() => setHoveredCourse(null)}
                      className={`
                        relative cursor-pointer rounded-[12px] border-2 p-3 transition-all duration-200
                        ${getColorClasses(course.color, course.status)}
                        ${hoveredCourse === course.id ? "scale-105 shadow-lg" : "shadow-sm"}
                        ${selectedCourse?.id === course.id ? "ring-4 ring-[#1E3A8A]/30" : ""}
                        ${course.status === "locked" ? "cursor-not-allowed" : "hover:shadow-md"}
                      `}
                    >
                      <div className="mb-1 flex items-start justify-between gap-2">
                        <div className="text-xs font-bold leading-tight">{course.code}</div>
                        {getStatusIcon(course.status)}
                      </div>
                      <div className="mb-2 line-clamp-2 text-[10px] font-medium leading-tight">{course.name}</div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-semibold">{course.credits} CH</span>
                        {course.hasLab && <span className="rounded bg-black/10 px-1.5 py-0.5 text-[9px]">LAB</span>}
                      </div>
                      {course.status !== "locked" && (
                        <button
                          onClick={(event) => {
                            event.stopPropagation();
                            handleAddToPlan(course);
                          }}
                          className="absolute right-2 top-2 rounded-full bg-[#1E3A8A] px-2 py-1 text-xs font-bold text-white dark:bg-[#06B6D4]"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedCourse && (
        <div className="mt-8 rounded-[16px] border border-gray-100 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-900">
          <div className="mb-6 flex items-start justify-between">
            <div>
              <div className="mb-2 flex items-center gap-3">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{selectedCourse.code}</h2>
                <span
                  className={`
                    rounded-full px-4 py-1.5 text-sm font-medium capitalize
                    ${selectedCourse.status === "completed" ? "bg-[#10B981]/10 text-[#10B981] dark:bg-[#10B981]/20" : ""}
                    ${selectedCourse.status === "in-progress" ? "bg-[#06B6D4]/10 text-[#06B6D4] dark:bg-[#06B6D4]/20" : ""}
                    ${selectedCourse.status === "available" ? "bg-[#1E3A8A]/10 text-[#1E3A8A] dark:bg-[#06B6D4]/20 dark:text-[#06B6D4]" : ""}
                    ${selectedCourse.status === "locked" ? "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400" : ""}
                  `}
                >
                  {selectedCourse.status.replace("-", " ")}
                </span>
              </div>
              <p className="text-lg text-gray-700 dark:text-gray-300">{selectedCourse.name}</p>
            </div>
            <button
              onClick={() => setSelectedCourse(null)}
              className="text-2xl leading-none text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              ×
            </button>
          </div>

          <div className="grid grid-cols-4 gap-6">
            <div className="rounded-[12px] bg-[#F8FAFC] p-4 dark:bg-gray-800">
              <div className="mb-2 flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-[#1E3A8A] dark:text-[#06B6D4]" />
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Credits</h3>
              </div>
              <p className="text-2xl font-bold text-[#1E3A8A] dark:text-[#06B6D4]">{selectedCourse.credits}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Credit Hours</p>
            </div>

            <div className="rounded-[12px] bg-[#F8FAFC] p-4 dark:bg-gray-800">
              <div className="mb-2 flex items-center gap-2">
                <Clock className="h-4 w-4 text-[#1E3A8A] dark:text-[#06B6D4]" />
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Format</h3>
              </div>
              <p className="text-lg font-bold text-[#1E3A8A] dark:text-[#06B6D4]">
                {selectedCourse.hasLab ? "Lecture + Lab" : "Lecture"}
              </p>
            </div>

            <div className="col-span-2 rounded-[12px] bg-[#F8FAFC] p-4 dark:bg-gray-800">
              <h3 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">Prerequisites</h3>
              {selectedCourse.prerequisites.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {selectedCourse.prerequisites.map((prereqId) => {
                    const prereq = semesters.flatMap((semester) => semester.courses).find((course) => course.id === prereqId);
                    return prereq ? (
                      <span
                        key={prereqId}
                        className="rounded-lg border border-gray-200 bg-white px-3 py-1 text-sm font-medium text-gray-700 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300"
                      >
                        {prereq.code}
                      </span>
                    ) : prereqId === "junior-standing" ? (
                      <span
                        key={prereqId}
                        className="rounded-lg border border-gray-200 bg-white px-3 py-1 text-sm font-medium text-gray-700 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300"
                      >
                        Junior Standing
                      </span>
                    ) : null;
                  })}
                </div>
              ) : (
                <p className="text-sm italic text-gray-500 dark:text-gray-400">No prerequisites required</p>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="mt-8 rounded-[16px] border border-gray-100 bg-gradient-to-r from-[#1E3A8A]/5 to-[#06B6D4]/5 p-6 dark:border-gray-700 dark:from-[#1E3A8A]/10 dark:to-[#06B6D4]/10">
        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">Legend</h3>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border-2 border-[#10B981] bg-[#10B981]">
              <Check className="h-4 w-4 text-white" />
            </div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Completed</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg border-2 border-[#06B6D4] bg-[#06B6D4]"></div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">In Progress</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg border-2 border-[#FB923C] bg-[#FED7AA]"></div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Available</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border-2 border-gray-300 bg-gray-100 dark:border-gray-600 dark:bg-gray-800">
              <Lock className="h-4 w-4 text-gray-400" />
            </div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Locked</span>
          </div>
        </div>
      </div>

      <SuccessModal
        isOpen={successModalOpen}
        onClose={() => setSuccessModalOpen(false)}
        onViewPlan={() => {
          setSuccessModalOpen(false);
          navigate("/app/dashboard");
        }}
        courseName={successCourseName}
      />
      <ErrorModal
        isOpen={errorModalOpen}
        onClose={() => setErrorModalOpen(false)}
        title={errorMessage.title}
        message={errorMessage.message}
      />
    </div>
  );
}
