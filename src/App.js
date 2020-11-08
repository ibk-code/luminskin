import React, { Suspense, lazy } from "react";
import "./sass/main.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
const Home = lazy(() => import("./pages/home"));

const App = () => {
  const client = new ApolloClient({
    uri: "https://pangaea-interviews.now.sh/api/graphql",
    cache: new InMemoryCache(),
  });
  return (
    <React.Fragment>
      <Router>
        <Suspense fallback={<div>Loading....</div>}>
          <ApolloProvider client={client}>
            <Switch>
              <Route path="/" exact component={Home} />
            </Switch>
          </ApolloProvider>
        </Suspense>
      </Router>
    </React.Fragment>
  );
};

export default App;
