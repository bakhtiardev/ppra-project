import React from "react";
import { Box, Typography, Link, Divider } from "@mui/material";
import { red, green } from "@mui/material/colors";

const AdvertGret300 = ({ web_links }: { web_links: any }) => {
  return (
    <Box>
      <Typography variant="h6">
        As per PPRA rules, a project with a value exceeding 300,0000 must be
        advertised in a recognized newspaper. The system has detected that this
        requirement applies to the current project.
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
      <Typography variant="subtitle1" sx={{ backgroundColor: green[200] }}>
        This Project passes Adverstisement Check
      </Typography>
    </Box>
  );
};

export default AdvertGret300;
