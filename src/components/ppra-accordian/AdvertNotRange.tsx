import React from "react";
import { Box, Typography, Link, Divider } from "@mui/material";
import { red, green } from "@mui/material/colors";

const AdvertNotRange = ({ web_links }: { web_links: any }) => {
  return (
    <Box>
      <Typography variant="h6">
        This Project is NOT under range from 500,000/rs and 3000000/rs
      </Typography>

      {web_links?.length > 0 ? (
        <>
          <Typography variant="h6">
            System detected following websites
          </Typography>
          {web_links &&
            web_links?.map((item: any) => {
              return (
                <>
                  <Link href={item}>{item} </Link> <Divider />
                </>
              );
            })}
        </>
      ) : (
        <Typography>System detected No web links</Typography>
      )}

      <Typography variant="subtitle1" sx={{ backgroundColor: red[200] }}>
        This Project fails Adverstisement Check
      </Typography>
    </Box>
  );
};

export default AdvertNotRange;
