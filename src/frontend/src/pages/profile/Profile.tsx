import { JSX, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useStore from "../../stores/store";
import Header from "../../components/Header";
import { api } from "../../api";
import { redirectForNoToken } from "../../utils/checkLocalStorage";

const Profile = () => {
  const { updateCurrentPageName } = useStore(); // State management
  const username: string | undefined = useParams().username; // URL parameter recognition

  // Unauthenticated users are redirected
  useEffect(() => {
    redirectForNoToken();
    updateCurrentPageName("Profile");
  }, []);

  if (username == undefined) {
    return <span className="text-white">No user found.</span>;
  }

  // Query for fetching the profile data
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["profile"],
    queryFn: () => api.user.getProfileData(username),
  });

  // Handling errors and loading
  if (isLoading) {
    return <span className="text-white">Loading...</span>;
  }
  if (isError) {
    return <span className="text-white">Error: {error.message}</span>;
  }
  if (data === undefined) {
    return <span className="text-white">No data</span>;
  }
  
  let responseData = {
    languages: ["No languages found"],
    bio: "No bio found",
    username: "No username found",
  }

  if ("bio" in data) {
    responseData.bio = data.bio;
  }
  if ("username" in data) {
    responseData.username = data.username;
  }
  if ("languages" in data) {
    responseData.languages = data.languages;
  }

  //Displaying the languages the user has studied
  const displayLanguages = () => {
    const languagesList: JSX.Element[] = [];
    if (responseData.languages.length === 0) {
      return <span>No languages found.</span>
    }
    responseData.languages.map((language: String) => {
      languagesList.push(<li className="text-white">{language}</li>);
    });
    return <ul>{languagesList}</ul>;
  };


  // Returning the intended content upon successful query fetch
  return (
    <>
      <Header />
      <div className="container">
        <div className="mt-3 mb-14">
          <h2 className="animate-flash">{responseData.username}</h2>
        </div>

        <h4>Bio</h4>
        <div className="mb-10 p-3 border border-white rounded-xl">
          {responseData.bio}
        </div>

        <h4 className="mb-3">Languages</h4>
        <div className="p-3 border border-white rounded-xl">
          {displayLanguages()}
        </div>
      </div>
    </>
  );
};

export default Profile;
