import { useState } from "react";
import "./App.css";
import { Link, Route, Switch } from "wouter";
import Home from "./pages/Home";
import SearchResult from "./pages/SearchResult";

function App() {
  return (
    <>
      <Switch>
        <Route path="/DPO" component={Home} />
        <Route path="/DPO/search" component={SearchResult} />
      </Switch>
    </>
  );
}

export default App;
