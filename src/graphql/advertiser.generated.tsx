import * as Types from "./types";

import { gql } from "@apollo/client";
import { CampaignSummaryFragmentDoc } from "./campaign.generated";
import * as Apollo from "@apollo/client";
const defaultOptions = {} as const;
export type AdvertiserSummaryFragment = {
  id: string;
  name: string;
  state: string;
  billingEmail?: string | null;
  additionalBillingEmails?: Array<string> | null;
  createdAt: any;
  modifiedAt: any;
  publicKey?: string | null;
};

export type AdvertiserFragment = {
  referrer?: string | null;
  phone?: string | null;
  selfServiceEdit: boolean;
  selfServiceCreate: boolean;
  selfServiceSetPrice: boolean;
  id: string;
  name: string;
  state: string;
  billingEmail?: string | null;
  additionalBillingEmails?: Array<string> | null;
  createdAt: any;
  modifiedAt: any;
  publicKey?: string | null;
  mailingAddress: {
    street1: string;
    street2?: string | null;
    city: string;
    country: string;
    state: string;
    zipcode: string;
  };
};

export type AdvertiserQueryVariables = Types.Exact<{
  id: Types.Scalars["String"];
}>;

export type AdvertiserQuery = {
  advertiser?: { id: string; publicKey?: string | null } | null;
};

export type UpdateAdvertiserMutationVariables = Types.Exact<{
  updateAdvertiserInput: Types.UpdateAdvertiserInput;
}>;

export type UpdateAdvertiserMutation = {
  updateAdvertiser: { id: string; publicKey?: string | null };
};

export type AdvertiserCampaignsFragment = {
  id: string;
  name: string;
  selfServiceEdit: boolean;
  selfServiceCreate: boolean;
  selfServiceSetPrice: boolean;
  campaigns: Array<{
    id: string;
    name: string;
    state: string;
    dailyCap: number;
    priority: number;
    passThroughRate: number;
    pacingOverride: boolean;
    pacingStrategy: Types.CampaignPacingStrategies;
    externalId: string;
    currency: string;
    budget: number;
    paymentType: Types.PaymentType;
    dailyBudget: number;
    spent: number;
    createdAt: any;
    startAt: any;
    endAt: any;
    source: Types.CampaignSource;
    type: string;
    format: Types.CampaignFormat;
    dayProportion?: number | null;
  }>;
};

export type AdvertiserCampaignsQueryVariables = Types.Exact<{
  id: Types.Scalars["String"];
  filter?: Types.InputMaybe<Types.AdvertiserCampaignFilter>;
}>;

export type AdvertiserCampaignsQuery = {
  advertiserCampaigns?: {
    id: string;
    name: string;
    selfServiceEdit: boolean;
    selfServiceCreate: boolean;
    selfServiceSetPrice: boolean;
    campaigns: Array<{
      id: string;
      name: string;
      state: string;
      dailyCap: number;
      priority: number;
      passThroughRate: number;
      pacingOverride: boolean;
      pacingStrategy: Types.CampaignPacingStrategies;
      externalId: string;
      currency: string;
      budget: number;
      paymentType: Types.PaymentType;
      dailyBudget: number;
      spent: number;
      createdAt: any;
      startAt: any;
      endAt: any;
      source: Types.CampaignSource;
      type: string;
      format: Types.CampaignFormat;
      dayProportion?: number | null;
    }>;
  } | null;
};

export type AdvertiserImageFragment = {
  name: string;
  imageUrl: string;
  format: Types.CampaignFormat;
  id: string;
  createdAt: any;
};

export type AdvertiserImagesQueryVariables = Types.Exact<{
  id: Types.Scalars["String"];
}>;

export type AdvertiserImagesQuery = {
  advertiser?: {
    images: Array<{
      name: string;
      imageUrl: string;
      format: Types.CampaignFormat;
      id: string;
      createdAt: any;
    }>;
  } | null;
};

export type UploadAdvertiserImageMutationVariables = Types.Exact<{
  input: Types.CreateAdvertiserImageInput;
}>;

export type UploadAdvertiserImageMutation = {
  createAdvertiserImage: { name: string };
};

export const AdvertiserSummaryFragmentDoc = gql`
  fragment AdvertiserSummary on Advertiser {
    id
    name
    state
    billingEmail
    additionalBillingEmails
    createdAt
    modifiedAt
    publicKey
  }
`;
export const AdvertiserFragmentDoc = gql`
  fragment Advertiser on Advertiser {
    ...AdvertiserSummary
    referrer
    phone
    selfServiceEdit
    selfServiceCreate
    selfServiceSetPrice
    mailingAddress {
      street1
      street2
      city
      country
      state
      zipcode
    }
  }
  ${AdvertiserSummaryFragmentDoc}
`;
export const AdvertiserCampaignsFragmentDoc = gql`
  fragment AdvertiserCampaigns on Advertiser {
    id
    name
    selfServiceEdit
    selfServiceCreate
    selfServiceSetPrice
    campaigns {
      ...CampaignSummary
    }
  }
  ${CampaignSummaryFragmentDoc}
`;
export const AdvertiserImageFragmentDoc = gql`
  fragment AdvertiserImage on AdvertiserImage {
    name
    imageUrl
    format
    id
    createdAt
  }
`;
export const AdvertiserDocument = gql`
  query advertiser($id: String!) {
    advertiser(id: $id) {
      id
      publicKey
    }
  }
`;

/**
 * __useAdvertiserQuery__
 *
 * To run a query within a React component, call `useAdvertiserQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdvertiserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdvertiserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useAdvertiserQuery(
  baseOptions: Apollo.QueryHookOptions<
    AdvertiserQuery,
    AdvertiserQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<AdvertiserQuery, AdvertiserQueryVariables>(
    AdvertiserDocument,
    options,
  );
}
export function useAdvertiserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    AdvertiserQuery,
    AdvertiserQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<AdvertiserQuery, AdvertiserQueryVariables>(
    AdvertiserDocument,
    options,
  );
}
export type AdvertiserQueryHookResult = ReturnType<typeof useAdvertiserQuery>;
export type AdvertiserLazyQueryHookResult = ReturnType<
  typeof useAdvertiserLazyQuery
>;
export type AdvertiserQueryResult = Apollo.QueryResult<
  AdvertiserQuery,
  AdvertiserQueryVariables
>;
export function refetchAdvertiserQuery(variables: AdvertiserQueryVariables) {
  return { query: AdvertiserDocument, variables: variables };
}
export const UpdateAdvertiserDocument = gql`
  mutation updateAdvertiser($updateAdvertiserInput: UpdateAdvertiserInput!) {
    updateAdvertiser(updateAdvertiserInput: $updateAdvertiserInput) {
      id
      publicKey
    }
  }
`;
export type UpdateAdvertiserMutationFn = Apollo.MutationFunction<
  UpdateAdvertiserMutation,
  UpdateAdvertiserMutationVariables
>;

/**
 * __useUpdateAdvertiserMutation__
 *
 * To run a mutation, you first call `useUpdateAdvertiserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAdvertiserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAdvertiserMutation, { data, loading, error }] = useUpdateAdvertiserMutation({
 *   variables: {
 *      updateAdvertiserInput: // value for 'updateAdvertiserInput'
 *   },
 * });
 */
export function useUpdateAdvertiserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateAdvertiserMutation,
    UpdateAdvertiserMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateAdvertiserMutation,
    UpdateAdvertiserMutationVariables
  >(UpdateAdvertiserDocument, options);
}
export type UpdateAdvertiserMutationHookResult = ReturnType<
  typeof useUpdateAdvertiserMutation
>;
export type UpdateAdvertiserMutationResult =
  Apollo.MutationResult<UpdateAdvertiserMutation>;
export type UpdateAdvertiserMutationOptions = Apollo.BaseMutationOptions<
  UpdateAdvertiserMutation,
  UpdateAdvertiserMutationVariables
>;
export const AdvertiserCampaignsDocument = gql`
  query advertiserCampaigns($id: String!, $filter: AdvertiserCampaignFilter) {
    advertiserCampaigns(id: $id, filter: $filter) {
      ...AdvertiserCampaigns
    }
  }
  ${AdvertiserCampaignsFragmentDoc}
`;

/**
 * __useAdvertiserCampaignsQuery__
 *
 * To run a query within a React component, call `useAdvertiserCampaignsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdvertiserCampaignsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdvertiserCampaignsQuery({
 *   variables: {
 *      id: // value for 'id'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useAdvertiserCampaignsQuery(
  baseOptions: Apollo.QueryHookOptions<
    AdvertiserCampaignsQuery,
    AdvertiserCampaignsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    AdvertiserCampaignsQuery,
    AdvertiserCampaignsQueryVariables
  >(AdvertiserCampaignsDocument, options);
}
export function useAdvertiserCampaignsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    AdvertiserCampaignsQuery,
    AdvertiserCampaignsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    AdvertiserCampaignsQuery,
    AdvertiserCampaignsQueryVariables
  >(AdvertiserCampaignsDocument, options);
}
export type AdvertiserCampaignsQueryHookResult = ReturnType<
  typeof useAdvertiserCampaignsQuery
>;
export type AdvertiserCampaignsLazyQueryHookResult = ReturnType<
  typeof useAdvertiserCampaignsLazyQuery
>;
export type AdvertiserCampaignsQueryResult = Apollo.QueryResult<
  AdvertiserCampaignsQuery,
  AdvertiserCampaignsQueryVariables
>;
export function refetchAdvertiserCampaignsQuery(
  variables: AdvertiserCampaignsQueryVariables,
) {
  return { query: AdvertiserCampaignsDocument, variables: variables };
}
export const AdvertiserImagesDocument = gql`
  query advertiserImages($id: String!) {
    advertiser(id: $id) {
      images {
        ...AdvertiserImage
      }
    }
  }
  ${AdvertiserImageFragmentDoc}
`;

/**
 * __useAdvertiserImagesQuery__
 *
 * To run a query within a React component, call `useAdvertiserImagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdvertiserImagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdvertiserImagesQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useAdvertiserImagesQuery(
  baseOptions: Apollo.QueryHookOptions<
    AdvertiserImagesQuery,
    AdvertiserImagesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<AdvertiserImagesQuery, AdvertiserImagesQueryVariables>(
    AdvertiserImagesDocument,
    options,
  );
}
export function useAdvertiserImagesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    AdvertiserImagesQuery,
    AdvertiserImagesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    AdvertiserImagesQuery,
    AdvertiserImagesQueryVariables
  >(AdvertiserImagesDocument, options);
}
export type AdvertiserImagesQueryHookResult = ReturnType<
  typeof useAdvertiserImagesQuery
>;
export type AdvertiserImagesLazyQueryHookResult = ReturnType<
  typeof useAdvertiserImagesLazyQuery
>;
export type AdvertiserImagesQueryResult = Apollo.QueryResult<
  AdvertiserImagesQuery,
  AdvertiserImagesQueryVariables
>;
export function refetchAdvertiserImagesQuery(
  variables: AdvertiserImagesQueryVariables,
) {
  return { query: AdvertiserImagesDocument, variables: variables };
}
export const UploadAdvertiserImageDocument = gql`
  mutation uploadAdvertiserImage($input: CreateAdvertiserImageInput!) {
    createAdvertiserImage(createImageInput: $input) {
      name
    }
  }
`;
export type UploadAdvertiserImageMutationFn = Apollo.MutationFunction<
  UploadAdvertiserImageMutation,
  UploadAdvertiserImageMutationVariables
>;

/**
 * __useUploadAdvertiserImageMutation__
 *
 * To run a mutation, you first call `useUploadAdvertiserImageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadAdvertiserImageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadAdvertiserImageMutation, { data, loading, error }] = useUploadAdvertiserImageMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUploadAdvertiserImageMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UploadAdvertiserImageMutation,
    UploadAdvertiserImageMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UploadAdvertiserImageMutation,
    UploadAdvertiserImageMutationVariables
  >(UploadAdvertiserImageDocument, options);
}
export type UploadAdvertiserImageMutationHookResult = ReturnType<
  typeof useUploadAdvertiserImageMutation
>;
export type UploadAdvertiserImageMutationResult =
  Apollo.MutationResult<UploadAdvertiserImageMutation>;
export type UploadAdvertiserImageMutationOptions = Apollo.BaseMutationOptions<
  UploadAdvertiserImageMutation,
  UploadAdvertiserImageMutationVariables
>;
