import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { red, green } from "@mui/material/colors";
import ListItem from "@mui/material/ListItem";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Box, Typography, TextField, Button, Divider } from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import StarIcon from "@mui/icons-material/Star";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import List from "@mui/material/List";
import Link from "@mui/material/Link";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
dayjs.extend(customParseFormat);

export default function PpraAccordian(props: { data: any }) {
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const { data } = props;
  let { contract_amount, brand_name, web_links, bid_times } = data ?? {};

  const [contractAmount, setContractAmount] = React.useState(
    data?.contract_amount
  );
  const [dateOpen, setDateOpen] = React.useState<Dayjs | null>(dayjs());
  const [dateClose, setDateClose] = React.useState<Dayjs | null>(dayjs());

  const [openTime, setOpenTime] = React.useState<Dayjs | null>(dayjs());
  const [closeTime, setCloseTime] = React.useState<Dayjs | null>(dayjs());

  function convertTo12Time(timestr: any): any {
    if (timestr !== null)
      return (
        String(timestr).substring(0, 2) + ":" + String(timestr).substring(2)
      );
  }
  console.log(
    "Time diff",
    convertTo12Time(bid_times[0]),
    convertTo12Time(bid_times[1])
  );
  const timeCalc = (opentime, closeTime) => {};
  console.log(
    "Time Diff2",
    timeCalc(convertTo12Time(bid_times[1]), convertTo12Time(bid_times[0]))
  );

  // const minuteDiff = timeCalc(openTime, closeTime);
  // console.log("Min Diff", minuteDiff);
  console.log(openTime, closeTime);
  let hours = dateClose.diff(dateOpen, "hours");
  const daysDiff = Math.floor(hours / 24);

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
          sx={{
            backgroundColor:
              data?.contract_amount >= 500000 &&
              data?.contract_amount <= 3000000 &&
              data?.web_links
                ? green[400]
                : red[400],
            justifyContent: "space-between",
            alignItems: "center",
            color: "white",
          }}
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            Rule 12 : Advertisement Check
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List aria-label="contacts">
            <ListItem>
              <Typography>
                Procurements over five hundred thousand Pakistani Rupees and up
                to the limit of three million Pakistani Rupees shall be
                advertised on the Authority’s website in the manner and format
                specified by regulation by the Authority from time to time
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>
                All procurement opportunities over three million Pakistani
                Rupees should be advertised on the Authority’s website as well
                as in other print media or newspapers having wide circulation.
              </Typography>
            </ListItem>
            <ListItem>
              {data?.contract_amount >= 500000 &&
              data?.contract_amount <= 3000000 &&
              data?.web_links ? (
                <Box>
                  <Typography variant="h6">
                    As Project is under range from 500,000 and 3000000 System
                    detected Website following websites
                  </Typography>
                  {data?.web_links?.map((item: any) => (
                    <>
                      <Link href={item}>{item} </Link> <Divider />
                    </>
                  ))}
                  <Typography
                    variant="subtitle1"
                    sx={{ backgroundColor: green[200] }}
                  >
                    This Project passes Adverstisement Check
                  </Typography>
                </Box>
              ) : (
                <Box>
                  <Typography variant="h6">
                    This Project is NOT under range from 500,000/Rs and
                    3000000/Rs
                  </Typography>

                  {data?.web_links.length > 0 ? (
                    <>
                      <Typography variant="h6">
                        System detected Website following websites
                      </Typography>
                      {data?.web_links?.map((item: any) => (
                        <>
                          <Link href={item}>{item} </Link> <Divider />
                        </>
                      ))}
                    </>
                  ) : (
                    <Typography>System detected No web links</Typography>
                  )}

                  <Typography
                    variant="subtitle1"
                    sx={{ backgroundColor: red[200] }}
                  >
                    This Project fails Adverstisement Check
                  </Typography>
                </Box>
              )}
            </ListItem>
          </List>
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
          sx={{
            backgroundColor: daysDiff >= 15 ? green[400] : red[400],
            justifyContent: "space-between",
            alignItems: "center",
            color: "white",
          }}
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            Rule 13 : Responce Time
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List aria-label="contacts">
            <ListItem>
              <Typography>
                The procuring agency may decide the response time but not in any
                case it can be less than 15 days for national competitive
                bidding and no less than 30 days international bidding
              </Typography>
            </ListItem>
            <ListItem>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoItem label="Date of Publishing">
                  <DateCalendar
                    value={dateOpen}
                    onChange={(newValue) => setDateOpen(newValue)}
                  />
                </DemoItem>
                <DemoItem label="Date of Submission">
                  <DateCalendar
                    value={dateClose}
                    onChange={(newValue) => setDateClose(newValue)}
                  />
                </DemoItem>
              </LocalizationProvider>
            </ListItem>
            <ListItem>
              {daysDiff >= 15 ? (
                <Typography
                  variant="subtitle1"
                  sx={{ backgroundColor: green[200] }}
                >
                  This Project satisfies atleast 15 days difference check, In
                  the date of publishing and date of submission
                </Typography>
              ) : (
                <Typography
                  variant="subtitle1"
                  sx={{ backgroundColor: red[200] }}
                >
                  This Project fails Responce Time Check
                </Typography>
              )}
            </ListItem>
          </List>
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
          sx={{
            backgroundColor:
              data?.two_precent || contractAmount >= 15 ? green[400] : red[400],
            justifyContent: "space-between",
            alignItems: "center",
            color: "white",
          }}
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            Rule 25 : Bid Security
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List aria-label="contacts">
            <ListItem>
              <Typography>
                The Bid Security must be generally, 2 to 5 %. We will consider
                2%.
              </Typography>
            </ListItem>

            <ListItem>
              {contractAmount ? (
                <Typography
                  variant="subtitle1"
                  sx={{ backgroundColor: green[200] }}
                >
                  The Bid Security must in range from 2% to 5% of Contract
                  Amount which {contractAmount * 0.02} and{" "}
                  {contractAmount * 0.05} respectively
                </Typography>
              ) : data?.two_percent ? (
                <Typography
                  variant="subtitle1"
                  sx={{ backgroundColor: green[200] }}
                >
                  The System detected, document mentions bid security of 2%
                </Typography>
              ) : (
                <Typography
                  variant="subtitle1"
                  sx={{ backgroundColor: red[200] }}
                >
                  The Bid Security is not present in document
                </Typography>
              )}
            </ListItem>
          </List>
          {/* <Typography>
            Generally, 2 to 5 %. We are considering for simplicity 2%.
          </Typography> */}
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
          sx={{
            backgroundColor: data?.bid_times ? green[400] : red[400],
            justifyContent: "space-between",
            alignItems: "center",
            color: "white",
          }}
        >
          x
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            Rule 28 : Opening of Bids
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List aria-label="contacts">
            <ListItem>
              <Typography>
                The date for opening of bids and the last date for the
                submission of bids shall be the same. The bids shall be opened
                at least thirty minutes after the deadline for submission of
                bids
              </Typography>
            </ListItem>
            {/* <ListItem>
              {minuteDiff >= 30 ? (
                <Typography variant="h6" sx={{ backgroundColor: green[200] }}>
                  The System detected, Bid Opening time {openTime} and Closing
                  Bid Time {closeTime} with {minuteDiff} minutes difference
                  which, satisfies Rule 28
                </Typography>
              ) : data?.bid_times ? (
                <Typography variant="h6" sx={{ backgroundColor: red[200] }}>
                  The System detected, Bid Opening time {openTime} and Closing
                  Bid Time {closeTime} with {minuteDiff} minutes difference
                  which, which is Less than 30 minutes, Hence this project fails
                  this rule.
                </Typography>
              ) : (
                <Box>
                  <Typography variant="h6">
                    The System were not able to detect Opening and closing bid
                    times Please Enter times below,
                  </Typography>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoItem label="Date of Publishing">
                      <TimePicker
                        label="Opening Bid Time"
                        value={openTime}
                        onChange={(newValue) => setOpenTime(newValue)}
                      />
                    </DemoItem>
                    <DemoItem label="Date of Submission">
                      <TimePicker
                        label="Closing Bid Time"
                        value={closeTime}
                        onChange={(newValue) => setCloseTime(newValue)}
                      />
                    </DemoItem>
                  </LocalizationProvider>
                </Box>
              )}
            </ListItem> */}
          </List>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel7"}
        onChange={handleChange("panel7")}
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
            Rule 39 : Performance Check
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
        
        </AccordionDetails>
      </Accordion>
    </>
  );
}
