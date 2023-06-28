import { Box, Card, CardContent, Container } from "@mui/material";
import React from "react";
import BraveLogo from "../../../../brave-logo-orange.svg";
import { Background } from "components/Background/Background";

interface Props {
  children?: React.ReactNode;
}

export function AuthContainer({ children }: Props) {
  return (
    <Background>
      <Box display="flex" width="725px">
        <Card
          sx={{
            width: "100%",
            height: "100%",
            padding: "28px",
            borderRadius: "6px",
            boxShadow: "rgba(99, 105, 110, 0.18) 0px 1px 12px 0px",
          }}
        >
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              component="div"
              width="180px"
              height="60px"
              mb={3}
              sx={{
                background: `url(${BraveLogo}) no-repeat center`,
                backgroundSize: "100%",
              }}
            />

            {children}
          </CardContent>
        </Card>
      </Box>
    </Background>
  );
}
