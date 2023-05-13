import React from "react";
import { Box, Typography, Link, Divider } from "@mui/material";
import { red, green } from "@mui/material/colors";

const AdvertInRange = ({ web_links }: { web_links: any }) => {
  return (
    <Box>
      <Typography variant="h6">
        The system has identified that the project value falls between 500,000
        and 3,000,000, and accordingly, the following websites are being
        monitored. Hence as per Rules, the projects comply with the rules of
        PPRA.
      </Typography>
      {web_links?.map((item: any) => (
        <>
          <Link href={item}>{item} </Link> <Divider />
        </>
      ))}
      <Typography variant="subtitle1" sx={{ backgroundColor: green[200] }}>
        This Project passes Adverstisement Check
      </Typography>
    </Box>
  );
};

export default AdvertInRange;
