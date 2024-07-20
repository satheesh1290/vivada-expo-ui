// App.js
import React from "react";
import AppProvider from "./src/apollo";
import SignIn from "./src/screens/SignIn";

export default function App() {
  return (
    <AppProvider>
      <SignIn />
    </AppProvider>
  );
}
