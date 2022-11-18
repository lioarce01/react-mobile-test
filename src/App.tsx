import { useState } from "react";

function App() {
  const [user, setUser] = useState();

  return user ? <div>Profile TBD</div> : <div>Login TBD</div>;
}

export default App;
