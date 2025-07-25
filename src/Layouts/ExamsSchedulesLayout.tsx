import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Loader } from "lucide-react";
import { useTransition } from "react";
import type { Event } from "../../types";
import useUserAxios from "../hooks/useUserAxios";
import useExamsSchedule from "../hooks/useExamShedule";
import { Course } from "../pages/studentExams";

interface CourseGroup{
  max_member:string;
  group_name:string;
  current_member:string;
  course: Course
}
interface ExamApiResponse {
  id: number;
  course: string;
  status: string;
  date: string;
  start_time: string;
  end_time: string;
  group:CourseGroup;
}



export interface ExamsResponse {
  data: ExamApiResponse[];
}

const ExamsScheduleLayout: React.FC = () => {
  const {  setExams } = useExamsSchedule();
  const [isGettingExams, startTransition] = useTransition();
  const axios = useUserAxios();

  const getExams = () => {
    startTransition(async () => {
      try {
        const resp = await axios.get("/api/exams/exams");

        const respTyped = resp as { data: ExamsResponse };
        const datas: Event[] = respTyped.data.data.map((ex: any) => {
          const startDate = new Date(`${ex.date}T${ex.start_time}`);
          const endDate = new Date(`${ex.date}T${ex.end_time}`);
          let examEvent: Event = {
            title: `${ex.group.course.title} - Group ${ex.group.group_name}`,
            description: ex.status,
            id: String(ex.id),
            startDate: startDate,
            endDate: endDate,
          };
          return examEvent;
        });

        setExams(datas);
      } catch (error) {
        console.log(error);
      }
    });
  };

  useEffect(() => {
    getExams();
  }, []);

  return isGettingExams ? (
    <div className="flex justify-center">
      <Loader className="animate-spin" />
    </div>
  ) : (
    <Outlet />
  );
};

export default ExamsScheduleLayout;
