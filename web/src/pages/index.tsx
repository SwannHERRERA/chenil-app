import React from "react";
import LoginCard from "../components/loginCard";
import Layout from "../components/Layout";

// markup
const IndexPage = () => (
  <main className="xl:grid xl:grid-cols-2 h-screen dark:bg-gray-800">
    <div className="col-start-1 h-full flex items-center justify-center">
      <LoginCard />
    </div>
    <div className="col-start-2 my-auto xl:block hidden">
      <img
        alt="dog"
        className="object-cover"
        src="https://images.pexels.com/photos/4681107/pexels-photo-4681107.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
      />
    </div>
  </main>
);

export default IndexPage;
