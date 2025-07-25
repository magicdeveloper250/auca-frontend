import { number } from "framer-motion";
import { Dispatch, SVGProps } from "react";
import { z } from "zod";
import { Course, Room } from "../src/pages/studentExams";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

// SchedulerTypes.ts

// Define event type
export interface Event {
  id: string;
  title?: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  variant?: Variant;
  course?: Course|null;
  start_time?: string|null;
  end_time?: string|null;
  date?: string|null;
  room?: Room | null;
  status?: string | null;
}

// Define the state interface for the scheduler
export interface SchedulerState {
  events: Event[];
}

// Define actions for reducer
export type Action =
  | { type: "ADD_EVENT"; payload: Event }
  | { type: "REMOVE_EVENT"; payload: { id: string } }
  | { type: "UPDATE_EVENT"; payload: Event }
  | { type: "SET_EVENTS"; payload: Event[] };


  

// Define handlers interface
export interface Handlers {
  handleEventStyling: (
    event: Event,
    dayEvents: Event[],
    periodOptions?: { 
      eventsInSamePeriod?: number; 
      periodIndex?: number; 
      adjustForPeriod?: boolean;
    }
  ) => {
    height: string;
    left: string;
    maxWidth: string;
    minWidth: string;
    top: string;
    zIndex: number;
  };
  handleAddEvent: (event: Event) => void;
  handleUpdateEvent: (event: Event, id: string) => void;
  handleDeleteEvent: (id: string) => void;
}

// Define getters interface
export interface Getters {
  getDaysInMonth: (
    month: number,
    year: number
  ) => { day: number; events: Event[] }[];
  getEventsForDay: (day: number, currentDate: Date) => Event[];
  getDaysInWeek: (week: number, year: number) => Date[];
  getWeekNumber: (date: Date) => number;
  getDayName: (day: number) => string;
}

// Define the context value interface
export interface SchedulerContextType {
  events: SchedulerState;
  dispatch: Dispatch<Action>;
  getters: Getters;
  handlers: Handlers;
  weekStartsOn: startOfWeek;
}

// Define the variant options
export const variants = [
  "success",
  "primary",
  "default",
  "warning",
  "danger",
] as const;

export type Variant = (typeof variants)[number];

// Define Zod schema for form validation
export const eventSchema = z.object({
  title: z.string().nonempty("Event name is required"),
  description: z.string().optional(),
  startDate: z.date(),
  endDate: z.date(),
  variant: z.enum(["primary", "danger", "success", "warning", "default"]),
  color: z.string().nonempty("Color selection is required"),
});

export type EventFormData = z.infer<typeof eventSchema>;

export interface Exam {
  id: string | null;
  courses: number[];
  date: string;
  
}
 export interface DecodedToken{
  
email: string
exp:number
iat: number
jti:  string
role: string
token_type: string
user_id: number
 }

export const examScheduleSchema = z.object({
  start_date: z.string().nonempty("Exam  Shedule start date is required."),
  end_date: z.string().nonempty("Exam  Shedule end date is required."),
  course_ids: z.array(z.number()).nonempty("Courses are required."),
  // semester:z.number()
 
});

export const examRescheduleSchema = z.object({
  exam_id: z.string().nonempty("Exam ID is required."),
  new_date: z.string().nonempty("Exam  Shedule start date is required."),
  slot: z.string(),
 
});

export type ExamResheduleFormData = z.infer<typeof examRescheduleSchema>;
export type ExamSheduleFormData = z.infer<typeof examScheduleSchema>;

export type Views = {
  mobileViews?: string[];
  views?: string[];
};

export type startOfWeek = "sunday" | "monday";

export interface CustomEventModal {
  CustomAddEventModal?: {
    title?: string;
    CustomForm?: React.FC<{ register: any; errors: any }>;
  };
}

export interface CustomComponents {
  customButtons?: {
    CustomAddEventButton?: React.ReactNode;
    CustomPrevButton?: React.ReactNode;
    CustomNextButton?: React.ReactNode;
  };

  customTabs?: {
    CustomDayTab?: React.ReactNode;
    CustomWeekTab?: React.ReactNode;
    CustomMonthTab?: React.ReactNode;
  };
  CustomEventComponent?: React.FC<Event>; // Using custom event type
  CustomEventModal?: CustomEventModal;
}

export interface ButtonClassNames {
  prev?: string;
  next?: string;
  addEvent?: string;
}

export interface TabClassNames {
  view?: string;
}

export interface TabsClassNames {
  cursor?: string;
  panel?: string;
  tab?: string;
  tabContent?: string;
  tabList?: string;
  wrapper?: string;
}

export interface ViewClassNames {
  dayView?: string;
  weekView?: string;
  monthView?: string;
}

export interface ClassNames {
  event?: string;
  buttons?: ButtonClassNames;
  tabs?: TabsClassNames;
  views?: ViewClassNames;
}
