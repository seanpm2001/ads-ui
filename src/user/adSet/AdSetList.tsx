import { ColumnDescriptor, StandardRenderers } from "components/EnhancedTable";
import { Chip } from "@mui/material";
import { Status } from "components/Campaigns/Status";
import _ from "lodash";
import { adSetOnOffState } from "components/EnhancedTable/renderers";
import { CampaignAdsFragment } from "graphql/campaign.generated";
import { CampaignSource } from "graphql/types";
import { StatsMetric } from "user/analytics/analyticsOverview/types";
import { AdSetFragment } from "graphql/ad-set.generated";
import { AdDetailTable } from "user/views/user/AdDetailTable";
import { displayFromCampaignState } from "util/displayState";
import { uiLabelsForBillingType } from "util/billingType";

interface Props {
  loading: boolean;
  engagements: Map<string, StatsMetric>;
  campaign?: CampaignAdsFragment | null;
}

interface ChipListProps {
  items?: Array<{ name: string }> | undefined | null;
  max?: number;
}

const ChipList = ({ items, max }: ChipListProps) => {
  if (!items) return null;

  const MAX_ITEMS = max ?? 10;

  const sorted = _.sortBy(items, "name");
  const max10 = _.take(sorted, MAX_ITEMS);

  return (
    <>
      {max10.map((item) => (
        <Chip
          key={item.name}
          label={item.name}
          size="small"
          variant="outlined"
          sx={{ mr: 1, marginY: "4px" }}
        />
      ))}

      {sorted.length > MAX_ITEMS && (
        <span>+ {sorted.length - MAX_ITEMS} more</span>
      )}
    </>
  );
};

export type AdSetDetails = AdSetFragment & {
  campaignStart: string;
  campaignEnd: string;
  campaignId: string;
  campaignState: string;
  campaignSource: CampaignSource;
  advertiserId: string;
};

export function AdSetList({ campaign, loading, engagements }: Props) {
  const adSets: AdSetDetails[] = (campaign?.adSets ?? []).map((c) => ({
    ...c,
    campaignStart: campaign?.startAt ?? "",
    campaignEnd: campaign?.endAt ?? "",
    campaignId: campaign?.id ?? "",
    campaignState: campaign?.state ?? "draft",
    campaignSource: campaign?.source ?? CampaignSource.SelfServe,
    advertiserId: campaign?.advertiser.id ?? "",
  }));

  const columns: ColumnDescriptor<AdSetDetails>[] = [
    {
      title: "On/Off",
      value: (c) => c.state,
      extendedRenderer: (r) => adSetOnOffState(r),
      sx: { width: "10px" },
      sortable: false,
    },
    {
      title: "Created",
      value: (c) => c.createdAt,
      renderer: StandardRenderers.date,
    },
    {
      title: "Name",
      value: (c) => c.name || c.id.substring(0, 8),
    },
    {
      title: "Status",
      value: (c) => displayFromCampaignState(c),
      extendedRenderer: (r) => (
        <Status
          state={displayFromCampaignState(r)}
          end={r.campaignEnd}
          start={r.campaignStart}
        />
      ),
    },
    {
      title: "Type",
      value: (c) => uiLabelsForBillingType(c.billingType).longLabel,
    },
    {
      title: "Platforms",
      value: (c) => c.oses?.map((o: { name: string }) => o.name).join(", "),
      extendedRenderer: (r) => <ChipList items={r.oses} />,
    },
    {
      title: "Audiences",
      value: (c) => c.segments?.map((o: { name: string }) => o.name).join(", "),
      extendedRenderer: (r) => (
        <ChipList
          items={r.segments}
          max={(r.segments ?? []).join("").length > 100 ? 2 : 5}
        />
      ),
    },
  ];

  return (
    <AdDetailTable
      rows={adSets}
      columns={columns}
      engagements={engagements}
      loading={loading}
    />
  );
}
