import { useEffect, useState } from "react";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import Profile from "./Profile";
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const { isLoading, error } = useAuth0(); //imported for conditional rendering
  const [data, setData] = useState(null);
  const [entireItem, setEntireItem] = useState(null);
  // test

  // test
  useEffect(() => {
    fetch("/specific-recipes").then((res) => {
      res
        .json()
        .then(
          (data) => setData(data.data.results[2].analyzedInstructions[0].steps)
          // setData(data.data)
        )
        .catch((e) => console.log("got error", e));
    });
  }, []);

  if (!data) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <>
        <div className="App">Hello World</div>
        <div>
          {data.map((steps, index) => {
            return (
              <div key={index}>
                {steps.number}
                {steps.step}
              </div>
            );
          })}
          <div>
            <h1>Auth0 Login</h1>
            {error && <p>Authentication Error</p>}
            {error && isLoading && <p>Loading...</p>}
            {!error && !isLoading && (
              <>
                <LoginButton />
                <LogoutButton />
                <Profile />
              </>
            )}
          </div>
        </div>
      </>
    );
  }
}

export default App;
