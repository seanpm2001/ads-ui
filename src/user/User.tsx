import React, { useMemo } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import AnalyticsOverview from "./analytics/AnalyticsOverview";
import Settings from "./settings/Settings";
import { Box } from "@mui/material";
import { NewCampaign } from "./views/adsManager/views/advanced/components/form/NewCampaign";
import { EditCampaign } from "./views/adsManager/views/advanced/components/form/EditCampaign";
import { CompletionForm } from "./views/adsManager/views/advanced/components/completionForm/CompletionForm";
import { MainView } from "user/views/user/MainView";
import { AdvertiserAgreed } from "auth/components/AdvertiserAgreed";
import { Navbar } from "user/components/navbar/Navbar";
import { useAdvertiser } from "auth/hooks/queries/useAdvertiser";

const buildApolloClient = () => {
  const httpLink = createHttpLink({
    uri: `${import.meta.env.REACT_APP_SERVER_ADDRESS}`.replace("v1", "graphql"),
    credentials: "include",
  });

  return new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });
};

export function User() {
  const client = useMemo(() => buildApolloClient(), []);
  return (
    <ApolloProvider client={client}>
      <Box height="100%">
        <Box display="flex">
          <Navbar />
          <Box
            width="100%"
            height="100%"
            padding={1}
            marginTop="64px"
            bgcolor="background.default"
          >
            <Switch>
              {/* /adsmanager */}
              <ProtectedRoute
                path="/user/main/adsmanager/advanced/new/:draftId"
                authedComponent={NewCampaign}
              />

              <ProtectedRoute
                path="/user/main/adsmanager/advanced/:campaignId"
                authedComponent={EditCampaign}
              />

              <ProtectedRoute
                path="/user/main/complete/:mode"
                authedComponent={CompletionForm}
              />

              {/* /campaigns/:campaignId/analytics - */}
              <ProtectedRoute
                path="/user/main/campaign/:campaignId/analytics/overview"
                authedComponent={AnalyticsOverview}
              />

              <Route path="/user/main/settings" component={Settings} />

              <ProtectedRoute
                path="/user/main"
                authedComponent={MainView}
                unauthedComponent={AdvertiserAgreed}
              />

              {/* default */}
              <Redirect to="/user/main" />
            </Switch>
          </Box>
        </Box>
      </Box>
    </ApolloProvider>
  );
}

interface ProtectedProps {
  authedComponent?: React.ComponentType;
  unauthedComponent?: React.ComponentType;
  path?: string;
}

const ProtectedRoute = ({
  authedComponent,
  unauthedComponent,
  path,
}: ProtectedProps) => {
  const { advertiser } = useAdvertiser();

  if (!advertiser.agreed && unauthedComponent === undefined) {
    return <Redirect to="/user/main" />;
  }

  return (
    <Route
      path={path}
      component={advertiser.agreed ? authedComponent : unauthedComponent}
    />
  );
};
