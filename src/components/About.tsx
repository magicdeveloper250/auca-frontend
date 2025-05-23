import { Statistics } from "./Statistics";
import pilot from "../assets/howitworks.png";


export const About = () => {
  return (
    <section
      id="about"
      className="container py-24 sm:py-32"
    >
      <div className="bg-muted/50 border rounded-lg py-12">
        <div className="px-6 flex flex-col-reverse md:flex-row gap-8 md:gap-12">
          <img
            src={pilot}
            alt=""
            className="w-[300px] object-contain rounded-lg"
          />
          <div className="bg-green-0 flex flex-col justify-between">
            <div className="pb-6">
              
             <p className="text-xl text-muted-foreground mt-4">
              Our automated exam scheduling system was developed to streamline the exam planning process at AUCA University. It ensures students never face overlapping exams, allocates rooms efficiently based on capacity, and provides admins with full control over time slots and schedule exports.
              <br /><br />
              Designed with real university needs in mind, this system brings simplicity, speed, and accuracy to one of the most complex academic tasks.
            </p>
                        </div>

          </div>
        </div>
      </div>
    </section>
  );
};
