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
import AdvertInRange from "./AdvertInRange";
import AdvertGret300 from "./AdvertGret300";
import AdvertNotRange from "./AdvertNotRange";
dayjs.extend(customParseFormat);

export default function PpraAccordian({ data }: { data: any }) {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  let { contract_amount, brand_name, web_links, bid_times, two_percent } =
    data ?? {};

  const [contractAmount, setContractAmount] = React.useState<null | any>(
    parseInt(data?.contract_amount)
  );
  const [dateOpen, setDateOpen] = React.useState<Dayjs | null>(dayjs());
  const [dateClose, setDateClose] = React.useState<Dayjs | null>(dayjs());

  const [openTime, setOpenTime] = React.useState<Dayjs | null>();
  const [closeTime, setCloseTime] = React.useState<Dayjs | null>();

  // console.log("Time diff", bid_times[0], bid_times[1]);
  // const timeCalc = (opentime, closeTime) => {};
  function findTimeDiff(time1, time2) {
    let hourDiff = parseInt(time2 / 100 - time1 / 100 - 1);

    // difference between minutes
    let minDiff = parseInt((time2 % 100) + (60 - (time1 % 100)));

    if (minDiff >= 60) {
      hourDiff++;
      minDiff = minDiff - 60;
    }

    return minDiff;
  }
  function findTimeDiffMui(time1, time2) {
    if (time1 && time2) {
      var start = dayjs(time1);
      var end = dayjs(time2);
      // console.log(end.diff(start, "minutes") + " minutes");
      return end.diff(start, "minutes");
    }
    return null;
  }
  // console.log("time1", openTime, "time2", closeTime);
  function convertTo12Time(timestr: any): any {
    if (timestr !== null)
      return (
        String(timestr).substring(0, 2) + ":" + String(timestr).substring(2)
      );
  }

  let timeDiff = null;
  console.log(data);
  if (data?.bid_times) timeDiff = findTimeDiff(bid_times[0], bid_times[1]);

  const minuteDiff = findTimeDiffMui(openTime, closeTime);

  // const minuteDiff = timeCalc(openTime, closeTime);
  // console.log("Min Diff", minuteDiff);
  // console.log(openTime, closeTime);
  let hours = dateClose.diff(dateOpen, "hours");
  const daysDiff = Math.floor(hours / 24);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  console.log(data?.contract_amount, contractAmount);
  function renderAdvert(contract_amount) {
    if (
      parseInt(contract_amount) >= 500000 &&
      parseInt(contract_amount) <= 3000000
    ) {
      return <AdvertInRange web_links={web_links} />;
    } else if (parseInt(contract_amount) > 3000000) {
      return <AdvertGret300 web_links={web_links} />;
    }
    return <AdvertNotRange web_links={web_links} />;
  }

  React.useEffect(() => {
    setContractAmount(parseInt(data?.contract_amount));
  }, [data?.contract_amount]);
  return (
    <>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{
            backgroundColor: contractAmount ? green[400] : red[400],
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
              <Typography sx={{ fontWeight: "bold", m: 1 }}>
                Procurements exceeding the prescribed limit shall be subjected
                to an integrity pact
              </Typography>
            </ListItem>
            <ListItem>
              {data.contract_amount ? (
                <Box>
                  <Typography variant="h6">
                    Contract amount detected = {data.contract_amount}
                  </Typography>
                </Box>
              ) : (
                <Box>
                  <Typography variant="h6">
                    System unable to find Contract Amount or Any term similar,
                    Please enter contract amount
                  </Typography>
                  <TextField
                    defaultValue={""}
                    type="number"
                    label="Contract Amount"
                    placeholder="Enter Number"
                    onChange={(e) => setContractAmount(e.target.value)}
                    margin="dense"
                    variant="outlined"
                  />
                </Box>
              )}
            </ListItem>
            <ListItem>
              {contractAmount > 10000000 ? (
                <Typography
                  variant="subtitle1"
                  sx={{ backgroundColor: green[200] }}
                >
                  Projects exceeding 10 million require an integrity pact check
                  according to PPRA Rules.
                </Typography>
              ) : (
                <Typography
                  variant="subtitle1"
                  sx={{ backgroundColor: red[200] }}
                >
                  As the entered amount is below 10 million, the project is
                  exempt from an integrity pact check under PPRA Rules.
                </Typography>
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
              <Typography sx={{ fontWeight: "bold", m: 1 }}>
                As per PPRA Rules, any technical or quality characteristics
                specified in terms, specifications, standards, features,
                characteristics and requirements must be generic in nature and
                should not include any reference to brand names, model numbers,
                catalogue numbers, countries of origin, or similar
                classifications.
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
                    The system has identified the use of a brand name{" "}
                    {data.brand_name} in the bid advertisement, which is in
                    violation of PPRA Rules.
                  </Typography>
                </Box>
              ) : (
                <Box>
                  <Typography variant="h6">No brand name was found.</Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{ backgroundColor: green[200] }}
                  >
                    In accordance with PPRA Rules, the project strictly adheres
                    to the specification rule, which prohibits the use of brand
                    names in technical specifications.
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
              contractAmount >= 500000 &&
              // contractAmount <= 3000000 &&
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
              <Typography sx={{ fontWeight: "bold", m: 1 }}>
                Procurements over five hundred thousand Pakistani Rupees and up
                to the limit of three million Pakistani Rupees shall be
                advertised on the Authority’s website in the manner and format
                specified by regulation by the Authority from time to time
              </Typography>
            </ListItem>
            <ListItem>
              <Typography sx={{ fontWeight: "bold", m: 1 }}>
                All procurement opportunities over three million Pakistani
                Rupees should be advertised on the Authority’s website as well
                as in other print media or newspapers having wide circulation.
              </Typography>
            </ListItem>
            <ListItem>
              {renderAdvert(contractAmount)}
              {/* {parseInt(contractAmount) >= 500000 &&
              parseInt(contractAmount) <= 3000000 ? (
                <AdvertInRange web_links={web_links}/>
              ) : parseInt(contractAmount) > 3000000 ? (
                  <AdvertGret300 web_links={web_links} />
              ) : (
                <AdvertNotRange web_links={web_links} />
              )} */}
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
            Rule 13 : Response Time
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List aria-label="contacts">
            <ListItem>
              <Typography sx={{ fontWeight: "bold", m: 1 }}>
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
                  This Project satisfies atleast 15 days difference check,
                  betweeen the date of publishing and the date of submission
                </Typography>
              ) : (
                <Typography
                  variant="subtitle1"
                  sx={{ backgroundColor: red[200] }}
                >
                  The project fails response time checks
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
              data?.two_percent || contractAmount ? green[400] : red[400],
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
              <Typography sx={{ fontWeight: "bold", m: 1 }}>
                As per PPRA rules, bid security is generally expected to be in
                the range of 2 to 5%. However, for this specific project, we
                will consider a bid security of 2% as per our evaluation.
              </Typography>
            </ListItem>

            <ListItem>
              {data?.two_percent ? (
                <Typography
                  variant="subtitle1"
                  sx={{ backgroundColor: green[200] }}
                >
                  The system has detected that the bid security of 2% is
                  mentioned in the document.
                </Typography>
              ) : contractAmount ? (
                <Typography
                  variant="subtitle1"
                  sx={{ backgroundColor: green[200] }}
                >
                  The Bid Security must in range from 2% to 5% of Contract
                  Amount which {contractAmount * 0.02}/rs and{" "}
                  {contractAmount * 0.05}/rs respectively
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
            backgroundColor:
              timeDiff >= 30 || minuteDiff >= 30 ? green[400] : red[400],
            justifyContent: "space-between",
            alignItems: "center",
            color: "white",
          }}
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            Rule 28 : Opening of Bids
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List aria-label="contacts">
            <ListItem>
              <Typography sx={{ fontWeight: "bold", m: 1 }}>
                The date for opening of bids and the last date for the
                submission of bids shall be the same. The bids shall be opened
                at least thirty minutes after the deadline for submission of
                bids
              </Typography>
            </ListItem>
            <ListItem>
              {timeDiff >= 30 && bid_times ? (
                <Typography
                  variant="subtitle1"
                  sx={{ backgroundColor: green[200] }}
                >
                  The system has detected that the bid opening time is at{" "}
                  {convertTo12Time(bid_times[1])}
                  and the closing bid time is at {convertTo12Time(bid_times[0])}
                  , with a {timeDiff}-minute difference between them. This
                  satisfies Rule 28.
                </Typography>
              ) : timeDiff < 30 && bid_times ? (
                <Typography
                  variant="subtitle1"
                  sx={{ backgroundColor: red[200] }}
                >
                  The system has detected that the bid opening time is at{" "}
                  {convertTo12Time(bid_times[1])}
                  and the closing bid time is at {convertTo12Time(bid_times[0])}
                  , with a {timeDiff}-minute difference between them. This fails
                  this Rule 28.
                </Typography>
              ) : (
                data?.bid_times == null && (
                  <>
                    <Box>
                      <Typography variant="h6">
                        The System were not able to detect Opening and closing
                        bid times Please Enter times below,
                      </Typography>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer
                          components={["TimePicker", "TimePicker"]}
                        >
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
                        </DemoContainer>
                      </LocalizationProvider>
                      <Box mt={2}>
                        {minuteDiff == null ? (
                          <Typography
                            variant="subtitle1"
                            sx={{ backgroundColor: red[400] }}
                          >
                            Enter Both Times!
                          </Typography>
                        ) : minuteDiff >= 30 ? (
                          <Typography
                            variant="subtitle1"
                            sx={{ backgroundColor: green[200] }}
                          >
                            The System has detected that the bid opening time is
                            at
                            {openTime?.format("LT")} and the closing bid time is
                            at
                            {closeTime?.format("LT")}, with a {minuteDiff}
                            -minutes difference between them. This satisfies
                            Rule 28
                          </Typography>
                        ) : (
                          minuteDiff != 0 && (
                            <Typography
                              variant="subtitle1"
                              sx={{ backgroundColor: red[200] }}
                            >
                              The System has detected that the bid opening time
                              is at
                              {openTime?.format("LT")} and the closing bid time
                              is at
                              {closeTime?.format("LT")}, with a {minuteDiff}
                              -minutes difference between them. This fails Rule
                              28
                            </Typography>
                          )
                        )}
                      </Box>
                    </Box>
                  </>
                )
              )}
            </ListItem>
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
            backgroundColor: contractAmount ? green[400] : red[400],
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
          <List aria-label="contacts">
            <ListItem>
              <Typography sx={{ fontWeight: "bold", m: 1 }}>
                If needed, it shall not exceed 10% of Contract amount
              </Typography>
            </ListItem>
            <ListItem>
              <Box>
                {contractAmount ? (
                  <>
                    <Typography variant="body">
                      System detected Contract Amount = {contractAmount}
                      /rs and Performance Security of 10% is equals to{" "}
                      {contractAmount * 0.1}/rs
                    </Typography>

                    <Typography
                      variant="subtitle1"
                      sx={{ backgroundColor: green[200] }}
                    >
                      As per PPRA rules the Performance Security shall not
                      exceed {contractAmount * 0.1} Rs amount
                    </Typography>
                  </>
                ) : (
                  <Typography
                    variant="subtitle1"
                    sx={{ backgroundColor: red[200] }}
                  >
                    According to PPRA rules, this project has failed the
                    performance security check.
                  </Typography>
                )}
              </Box>

              {/* : (
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
              )} */}
            </ListItem>
          </List>
        </AccordionDetails>
      </Accordion>
    </>
  );
}
