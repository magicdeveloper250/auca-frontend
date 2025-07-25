import StudentExams from "./studentExams";
import StudentSchedulerViewFilteration from "../components/schedule/_components/view/student-schedular-view-filteration.tsxschedular-view-filteration";
import { SchedulerProvider } from "../../providers/schedular-provider";
import useExamsSchedule from "../hooks/useExamShedule";
import { Button } from "../components/ui/button";
import { Grid2x2, List } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { useSearchParams } from "react-router-dom";
import { useDebouncedCallback } from "use-debounce";
import useUserAxios from "../hooks/useUserAxios";
import useToast from "../hooks/useToast";
import { Exam } from "./studentExams";
import TableSkeleton from "../components/TableSkeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog"
function StudentExamsPage() {
  const { exams, setExams } = useExamsSchedule();
  const [activeView, setActiveView] = useState<string>("grid");
  const [searchParams, setSearchParams] = useSearchParams();
  const defaultView = "grid";
  const viewsSelector = ["grid", "list"];
  const [isPending, startTransition] = useTransition();
  const axios = useUserAxios();
  const [myExams, setMyExams] = useState<Exam[]>([]);
  const { setToastMessage } = useToast();
  
  const getExams = () => {
    startTransition(async () => {
      try {
        const resp = await axios.get("/api/exams/student-exam/mine");
        setExams(
          resp.data.data.map((data: any) => {
            return {
              id:data.exam.id,
              description:data.exam.status,
              title: data.exam.group.course.title,
              startDate: data.exam.date,
              endDate: data.exam.date,
              course: data.exam.group.course,
              course_title: data.exam.group.course.title,
              course_group: data.exam.group.group_name,
              date: data.exam.date,
              room: data?.room?.name,
              start_time: data.exam.start_time,
              end_time: data.exam.end_time,
               
            };
          })
        );
        setMyExams(
          resp.data.data.map((data: any) => {
            return {
              ...data,
              course: data.exam.group.course,
              course_title: data.exam.group.course.title,
              date: data.exam.date,
              room: data?.room?.name,
              start_time: data.exam.start_time,
              end_time: data.exam.end_time,
              course_group: data.exam.group.group_name,
            };
          })
        );
      } catch (error) {
        console.log(error)
        setToastMessage({
          message: "Error of getting your exams. ",
          variant: "danger",
        });
      }
    });
  };
 
  const debouncedUpdateUrl = useDebouncedCallback((view: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("viewstyle", view);
    setSearchParams(newParams, { replace: true });
  }, 100);

  const handleViewChange = (newView: string) => {
    setActiveView(newView);
    debouncedUpdateUrl(newView);
  };

  useEffect(() => {
    if (!viewsSelector?.length) return;

    const urlView = searchParams.get("viewstyle");

    if (urlView && viewsSelector.includes(urlView)) {
      setActiveView(urlView);
    } else {
      setActiveView(defaultView);
      debouncedUpdateUrl(defaultView);
    }
  }, [viewsSelector, searchParams]);

  useEffect(() => {
    getExams();
  }, []);
  return (
    isPending ? <TableSkeleton /> :
    <div>
      
      <div className="flex gap-1 py-2">
        <Button onClick={() => handleViewChange("grid")}>
          <Grid2x2 />
        </Button>
        <Button onClick={() => handleViewChange("list")}>
          <List />
        </Button>
      </div>
      {activeView == "grid" && (
        <SchedulerProvider weekStartsOn="monday" initialState={exams}>
          <StudentSchedulerViewFilteration
            stopDayEventSummary={true}
            classNames={{
              tabs: {
                panel: "p-0",
              },
            }}
          />
        </SchedulerProvider>
      )}
      {activeView == "list" && <StudentExams exams={myExams} />}
    </div>
  );
}

export default StudentExamsPage;
