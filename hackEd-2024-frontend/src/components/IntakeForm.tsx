import React, { useState } from "react";
import {
  Checkbox,
  FormControlLabel,
  Button,
  FormGroup,
  Typography,
  Box,
} from "@mui/material";

const IntakeForm = () => {
  const [bikeLocks, setBikeLocks] = useState(false);
  const [greenspace, setGreenspace] = useState(false);
  const [trees, setTrees] = useState(false);
  const [transit, setTransit] = useState(false);

  const handleSubmit = () => {
    // Logic to handle form submission
    // You can make an API call here to send the form data
    console.log("Form submitted!");
    console.log("Bike Locks:", bikeLocks);
    console.log("Greenspace:", greenspace);
    console.log("Trees:", trees);
    console.log("Transit:", transit);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box mb={2}>
        <Typography variant="h6">Question 1: Bike Locks</Typography>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={bikeLocks}
                onChange={(e) => setBikeLocks(e.target.checked)}
              />
            }
            label="Do you find bike locks important?"
          />
        </FormGroup>
      </Box>
      <Box mb={2}>
        <Typography variant="h6">Question 2: Greenspace</Typography>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={greenspace}
                onChange={(e) => setGreenspace(e.target.checked)}
              />
            }
            label="Do you find greenspace important?"
          />
        </FormGroup>
      </Box>
      <Box mb={2}>
        <Typography variant="h6">Question 3: Trees</Typography>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={trees}
                onChange={(e) => setTrees(e.target.checked)}
              />
            }
            label="Do you find trees important?"
          />
        </FormGroup>
      </Box>
      <Box mb={2}>
        <Typography variant="h6">Question 4: Transit</Typography>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={transit}
                onChange={(e) => setTransit(e.target.checked)}
              />
            }
            label="Do you find transit important?"
          />
        </FormGroup>
      </Box>
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
};

export default IntakeForm;
