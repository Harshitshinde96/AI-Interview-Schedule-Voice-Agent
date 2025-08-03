import React from "react";
import WelcomeContainer from "./_components/WelcomeContainer";
import CreateOptions from "./_components/CreateOptions";
import LatestInterviewsList from "./_components/LatestInterviewsList";

function Dashboard() {
  return (
    <div>
      {/* <WelcomeContainer /> */}
      <h2 className="my-3 font-bold text-2xl pl-1 mt-5">Dashboard</h2>
      <CreateOptions />
      <LatestInterviewsList />
    </div>
  );
}

export default Dashboard;
