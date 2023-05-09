import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { red, green } from "@mui/material/colors";
import ListItem from "@mui/material/ListItem";
import { Box, Typography, TextField, Button } from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import StarIcon from "@mui/icons-material/Star";
import List from "@mui/material/List";
export default function PpraAccordian(props: { data: any }) {
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const { data } = props;
  let { contract_amount, brand_name, web_links } = data ?? {};

  const [contractAmount, setContractAmount] = React.useState(
    data?.contract_amount
  );

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{
            backgroundColor: data?.contract_amount ? green[400] : red[400],
            justifyContent: "space-between",
            alignItems: "center",
            color: "white",
          }}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            Rule 7 : Integrity Pact Check
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List aria-label="contacts">
            <ListItem>
              <Typography>
                Procurements exceeding the prescribed limit shall be subject to
                an integrity pact
              </Typography>
            </ListItem>
            <ListItem>
              {data.contract_amount ? (
                <Box>
                  <Typography variant="h6">
                    System detected Contract Amount = {data.contract_amount}
                  </Typography>
                  {contractAmount > 10000000 ? (
                    <Typography
                      variant="subtitle1"
                      sx={{ backgroundColor: green[200] }}
                    >
                      This Project is accordance with the integrity pact check,
                      as the amount is not greater than 10 million
                    </Typography>
                  ) : (
                    <Typography
                      variant="subtitle1"
                      sx={{ backgroundColor: red[200] }}
                    >
                      This project must have integrity pact check otherwise it
                      will violate the ppra regulations
                    </Typography>
                  )}
                </Box>
              ) : (
                <Box>
                  <Typography variant="h6">
                    System unable to find Contract Amount or Any term similar,
                    Please enter contract amount
                  </Typography>
                  <TextField
                    id="contractAmount"
                    label="Contract Amount"
                    type="number"
                    value={""}
                    onChange={(e) => setContractAmount(e.target.value)}
                    margin="dense"
                    variant="outlined"
                  />
                </Box>
              )}
            </ListItem>
          </List>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          sx={{
            backgroundColor: data?.brand_name ? red[400] : green[400],
            justifyContent: "space-between",
            alignItems: "center",
            color: "white",
          }}
          id="panel2bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            Rule 10 : Specification
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List aria-label="contacts">
            <ListItem>
              <Typography>
                Any terms, specifications, standards, features, characteristics
                and requirements prescribing the technical or quality
                characteristics shall be generic in nature and shall not include
                reference to brand name, model number, catalogue number, name or
                origin of the country or similar classification.
              </Typography>
            </ListItem>
            <ListItem>
              {data?.brand_name ? (
                <Box>
                  <Typography variant="h6">
                    System detected Brand Name = {data.brand_name}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{ backgroundColor: red[200] }}
                  >
                    This Project is against the specification rule, it should
                    not have contain any brand name
                  </Typography>
                </Box>
              ) : (
                <Box>
                  <Typography variant="h6">
                    System detected No Brand Name
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{ backgroundColor: green[200] }}
                  >
                    This Project follows the specification rule, it does not
                    contain any brand name
                  </Typography>
                </Box>
              )}
            </ListItem>
            <ListItem>
              <Typography></Typography>
            </ListItem>
          </List>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            Rule 12 : Advertisement Check
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer
            sit amet egestas eros, vitae egestas augue. Duis vel est augue.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            Rule 13 : Responce Time
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer
            sit amet egestas eros, vitae egestas augue. Duis vel est augue.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel5"}
        onChange={handleChange("panel5")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            Rule 25 : Bid Security
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Generally, 2 to 5 %. We are considering for simplicity 2%.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel6"}
        onChange={handleChange("panel6")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            Rule 28 : Opening of Bids
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            The date for opening of bids and the last date for the submission of
            bids shall be the same.
          </Typography>
          <Typography>
            The bids shall be opened at least thirty minutes after the deadline
            for submission of bids
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel7"}
        onChange={handleChange("panel7")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            Rule 39 : Performance Check
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            If needed, it shall not exceed 10% of Contract amount.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </>
  );
}
