import React from "react";
import { Box, Typography, Link, Divider } from "@mui/material";
import { red, green } from "@mui/material/colors";

const AdvertInRange = ({ web_links }: { web_links: any }) => {
  return (
    <Box>
      <Typography variant="h6">
        As Project is under range from 500,000 and 3000000 System detected
        Website following websites
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
