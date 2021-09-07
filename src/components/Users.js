import React, { useState, useEffect } from "react";

const giturl = "https://api.github.com/user";
const Users = () => {
  // state
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [users, setUsers] = useState([]);
  const [errorData, setErrorData] = useState("");
  // Fetch Data
  const fetchData = async () => {
    const response = await fetch(giturl);
    console.log("resp" + response.status);
    if (199 > response.status || response.status > 300) {
      setIsError(true);
      //throw new Error(response.statusText);
    }
    const data = await response.json();
    if (!isError) {
      setUsers(data);
    } else {
      setErrorData(data);
    }

    console.log(data);
  };

  useEffect(() => {
    fetchData();
    setIsLoading(false);
  }, []);

  // Conditional render views
  if (isLoading) {
    return <>Loading..</>;
  }
  if (isError) {
    return <>Error..{errorData && errorData.message}</>;
  }
  const renderData = (users) => {
    console.log("Error" + isError);
    return (
      <ul className="inline">
        {users.map(({ id, login, avatar_url }) => {
          return (
            <li className="list-inline-item" key={id}>
              <img src={avatar_url} style={{ height: 50 }} />
              {login}
            </li>
          );
        })}
      </ul>
    );
  };
  return (
    <>
      <h3>Users</h3>
      <div className="card">{!isLoading && renderData(users)}</div>
    </>
  );
};
export default Users;
