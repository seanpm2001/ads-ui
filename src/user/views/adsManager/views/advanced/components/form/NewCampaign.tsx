import { Container, LinearProgress } from "@mui/material";
import { Formik } from "formik";
import { useContext } from "react";
import { CampaignForm, initialCampaign } from "../../../../types";
import { CampaignSchema } from "validation/CampaignSchema";
import { transformNewForm } from "user/library";
import { useCreateCampaignMutation } from "graphql/campaign.generated";
import { useHistory, useParams } from "react-router-dom";
import { BaseForm } from "./components/BaseForm";
import { PersistFormValues } from "form/PersistFormValues";
import { DraftContext, FilterContext } from "state/context";
import { useAdvertiser } from "auth/hooks/queries/useAdvertiser";
import { useCreatePaymentSession } from "checkout/hooks/useCreatePaymentSession";
import { PaymentType } from "graphql/types";
import { useUser } from "auth/hooks/queries/useUser";
import { refetchAdvertiserCampaignsQuery } from "graphql/advertiser.generated";

interface Params {
  draftId: string;
}

export function NewCampaign() {
  const history = useHistory();
  const { fromDate } = useContext(FilterContext);
  const params = useParams<Params>();
  const { advertiser } = useAdvertiser();
  const { userId } = useUser();
  const { createPaymentSession, loading } = useCreatePaymentSession();

  const { setDrafts } = useContext(DraftContext);

  const initial: CampaignForm = {
    ...initialCampaign(advertiser),
    draftId: params.draftId,
  };

  const [mutation] = useCreateCampaignMutation({
    onCompleted(data) {
      const campaign = data.createCampaign;
      localStorage.removeItem(params.draftId);
      setDrafts();
      if (
        campaign.paymentType === PaymentType.Netsuite ||
        campaign.paymentType === PaymentType.ManualBat
      ) {
        history.push(`/user/main/complete/new?referenceId=${campaign.id}`);
      } else {
        createPaymentSession(data.createCampaign.id);
      }
    },
    onError() {
      alert("Unable to create Campaign.");
    },
    refetchQueries: [
      {
        ...refetchAdvertiserCampaignsQuery({
          id: advertiser.id,
          filter: { from: fromDate },
        }),
      },
    ],
  });

  if (loading) {
    return <LinearProgress />;
  }

  return (
    <Container maxWidth="xl">
      <Formik
        initialValues={initial}
        onSubmit={async (v: CampaignForm, { setSubmitting }) => {
          setSubmitting(true);
          const input = transformNewForm(v, userId);
          await mutation({ variables: { input } });
          setSubmitting(false);
        }}
        validationSchema={CampaignSchema}
      >
        <>
          <BaseForm />
          <PersistFormValues />
        </>
      </Formik>
    </Container>
  );
}
