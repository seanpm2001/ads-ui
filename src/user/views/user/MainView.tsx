import { Box, Skeleton, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import { useAdvertiserCampaignsQuery } from "graphql/advertiser.generated";
import { populateFilter } from "user/library";
import { CampaignAgeFilter } from "components/Campaigns/CampaignAgeFilter";
import { CampaignList } from "user/campaignList/CampaignList";
import { AdSetList } from "user/adSet/AdSetList";
import { AdList } from "user/ads/AdList";
import CampaignIcon from "@mui/icons-material/Campaign";
import DatasetIcon from "@mui/icons-material/Dataset";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import { ErrorDetail } from "components/Error/ErrorDetail";
import moment from "moment/moment";

export function MainView() {
  const [tabValue, setTabValue] = useState(
    Number(window.localStorage.getItem("tabValue") ?? 0)
  );

  const [fromDateFilter, setFromDateFilter] = useState<Date | null>(
    moment().subtract(6, "month").startOf("day").toDate()
  );

  const { loading, data, error } = useAdvertiserCampaignsQuery({
    variables: {
      id: window.localStorage.getItem("activeAdvertiser") ?? "",
      filter: populateFilter(fromDateFilter),
    },
    pollInterval: 600_000,
    fetchPolicy: "cache-and-network",
  });

  const tabs = [
    { label: "Campaigns", icon: <CampaignIcon /> },
    { label: "Ad Sets", icon: <DatasetIcon /> },
    { label: "Ads", icon: <LibraryBooksIcon /> },
  ];

  if (error) {
    return (
      <ErrorDetail
        error={error}
        additionalDetails="Unable to retrieve Campaign data."
      />
    );
  }

  return (
    <Box display="flex" flexDirection="column" sx={{ mb: 2, ml: 5, mr: 5 }}>
      <CampaignAgeFilter
        fromDate={fromDateFilter}
        onChange={setFromDateFilter}
        disabled={loading}
      />
      <Box width="100%" sx={{ mt: 1 }} bgcolor="#fff">
        <Box border="1px solid #ededed">
          <Tabs
            value={tabValue}
            variant="fullWidth"
            onChange={(e, nv) => {
              setTabValue(nv);
              window.localStorage.setItem("tabValue", nv);
            }}
          >
            {tabs.map((t, idx) => (
              <Tab
                key={t.label}
                value={idx}
                label={t.label}
                icon={t.icon}
                iconPosition="end"
                sx={{
                  flexGrow: 1,
                  borderBottom: "1px solid #ededed",
                  borderLeft:
                    idx !== tabs.length ? "1px solid #ededed" : "none",
                }}
                disabled={loading}
              />
            ))}
          </Tabs>

          {!loading ? (
            <Box display="flex" flexDirection="column" mt={1}>
              {tabValue === 0 && (
                <CampaignList
                  advertiserCampaigns={data?.advertiserCampaigns}
                  fromDate={fromDateFilter}
                />
              )}

              {tabValue === 1 && (
                <AdSetList
                  advertiserCampaigns={data?.advertiserCampaigns}
                  fromDate={fromDateFilter}
                />
              )}

              {tabValue === 2 && (
                <AdList
                  advertiserCampaigns={data?.advertiserCampaigns}
                  fromDate={fromDateFilter}
                />
              )}
            </Box>
          ) : (
            <Box m={3}>
              <Skeleton variant="rounded" height={500} />
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}