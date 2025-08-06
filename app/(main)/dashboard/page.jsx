// "use client";
// import AuthWrapper from "@/components/AuthWrapper";
// import CreateOptions from "./_components/CreateOptions";
// import LatestInterviewsList from "./_components/LatestInterviewsList";

// function Dashboard() {
//   return (
//     <AuthWrapper>
//       <div className="">
//         <h2 className="my-3 font-bold text-2xl pl-1 mt-5">Dashboard</h2>
//         <CreateOptions />
//         <LatestInterviewsList />
//       </div>
//     </AuthWrapper>
//   );
// }

// export default Dashboard;

"use client";
import React from "react";
import CreateOptions from "./_components/CreateOptions";
import LatestInterviewsList from "./_components/LatestInterviewsList";
// import { userUser } from "@/app/Provider";

function Dashboard() {
  //  const { user } = userUser();

  return (
    <div className=" ">
      <h2 className="my-3 font-bold text-2xl pl-1 mt-5">Dashboard</h2>
      <CreateOptions />
      <LatestInterviewsList />
    </div>
  );
}

export default Dashboard;
