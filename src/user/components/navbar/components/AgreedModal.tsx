import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  Checkbox,
  Divider,
  FormControlLabel,
  Link,
  Stack,
} from "@mui/material";
import moment from "moment/moment";
import { IAdvertiser } from "auth/context/auth.interface";
import { useHistory, useRouteMatch } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { useUpdateAdvertiserMutation } from "graphql/advertiser.generated";
import { useAuthContext } from "auth/context/auth.hook";
import { getUser } from "auth/lib";
import { useAdvertiser } from "auth/hooks/queries/useAdvertiser";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 900,
  bgcolor: "background.paper",
  border: "1px solid #e2e2e2",
  borderRadius: "16px",
  boxShadow: 24,
  p: 4,
};

export default function AgreedModal() {
  const { advertiser } = useAdvertiser();
  const { url } = useRouteMatch();
  const { setSessionUser } = useAuthContext();
  const history = useHistory();
  const isNewCampaignPage = url.includes("/user/main/adsmanager/advanced");
  const newUrl = `/user/main/adsmanager/advanced/new/${moment()
    .utc()
    .valueOf()}`;
  const [open, setOpen] = useState(false);
  const [agreed, setAgreed] = useState({
    tracking: false,
    payment: false,
    terms: false,
  });

  const handleAgreed = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAgreed({
      ...agreed,
      [event.target.name]: event.target.checked,
    });
  };

  const [mutation, { loading }] = useUpdateAdvertiserMutation({
    async onCompleted() {
      const user = await getUser();
      setSessionUser(user);
      history.push(newUrl);
      setOpen(false);
    },
  });

  if (!advertiser.selfServiceCreate) {
    return null;
  }

  const { tracking, payment, terms } = agreed;
  return (
    <>
      <Button
        onClick={() => {
          if (!advertiser.agreed) {
            setOpen(true);
          } else {
            history.push(newUrl);
          }
        }}
        size="medium"
        variant="contained"
        sx={{ mr: 5 }}
        disabled={isNewCampaignPage}
      >
        New Campaign
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={style}>
          <Stack spacing={0.5}>
            <Typography variant="h4">Welcome to Brave Ads</Typography>
            <Typography variant="subtitle1">
              Before you launch your first campaign, please review the following
              acknowledgements:
            </Typography>
          </Stack>

          <Divider sx={{ mt: 1, mb: 1 }} />

          <Stack mb={2} spacing={0.5}>
            <Typography sx={{ fontWeight: 600 }}>Reporting</Typography>
            <Typography>
              Brave’s products are made to uphold user privacy. By default, the
              Brave browser blocks third-party tracking (scripts, tags, pixels,
              etc.) including those used by Google Analytics. This means that
              most standard website reporting won’t be compatible with Brave
              Ads. To ensure advertisers have visibility into performance of
              campaigns, we’ve detailed other effective privacy-first options
              for measurement in our{" "}
              <Link
                href="https://brave.com/brave-ads/reporting/"
                target="_blank"
              >
                reporting guide
              </Link>
              .
            </Typography>
            <FormControlLabel
              control={
                <Checkbox
                  checked={tracking}
                  onChange={handleAgreed}
                  name="tracking"
                />
              }
              label="I understand that Brave Ads will not be compatible with Google Analytics and similar solutions that rely on third-party trackers"
            />
          </Stack>

          <Stack mb={2} spacing={0.5}>
            <Typography sx={{ fontWeight: 600 }}>Payment</Typography>
            <Typography>
              To launch a campaign with Brave, you are required to prepay the
              full amount you intend to spend. Any remaining funds from your
              budget will be credited back to your original payment method upon
              request.
            </Typography>
            <FormControlLabel
              control={
                <Checkbox
                  checked={payment}
                  onChange={handleAgreed}
                  name="payment"
                />
              }
              label="I understand that pre-payment is required to launch my campaign"
            />
          </Stack>

          <Stack mb={2} spacing={0.5}>
            <Typography sx={{ fontWeight: 600 }}>Terms & Conditions</Typography>
            <Typography>
              By continuing, you acknowledge and agree to our{" "}
              <Link href="https://brave.com/privacy/advertiser" target="_blank">
                Privacy Policy
              </Link>{" "}
              and platform{" "}
              <Link href="https://brave.com/brave-ads/terms/" target="_blank">
                Terms and Conditions
              </Link>
              .
            </Typography>
            <FormControlLabel
              control={
                <Checkbox
                  checked={terms}
                  onChange={handleAgreed}
                  name="terms"
                />
              }
              label="I agree"
            />
          </Stack>

          <LoadingButton
            disabled={!terms || !tracking || !payment || loading}
            variant="contained"
            onClick={() =>
              mutation({
                variables: {
                  updateAdvertiserInput: {
                    id: advertiser.id,
                    agreed: terms && tracking && payment,
                  },
                },
              })
            }
            loading={loading}
          >
            Continue
          </LoadingButton>
        </Box>
      </Modal>
    </>
  );
}