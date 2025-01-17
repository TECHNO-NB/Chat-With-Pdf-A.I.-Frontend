import React from "react";
import { IStepsData } from "@/types/types";

const Steps = ({ stepsContent }: { stepsContent: IStepsData }) => {
  return (
    <div className="border-t-2 text-left">
      <h3 className="text-blue-700">{stepsContent.title}</h3>
      <h2 className="font-bold">{stepsContent.content}</h2>
      <p className="text-[0.8em]">{stepsContent.descriptions}</p>
    </div>
  );
};

export default Steps;
