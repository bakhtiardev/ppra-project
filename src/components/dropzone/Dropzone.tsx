import React from "react";
import { DropzoneArea } from "mui-file-dropzone";
import { Box } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
// import {createStyles}
import { createStyles, makeStyles } from "@mui/styles";
import { createMuiTheme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  dropzone: {
    height: "10px",
    width: "20px",
  },
}));

const Dropzone = (props: { setFile: any }) => {
  const { setFile } = props;
  return (
    <DropzoneArea
      filesLimit={1}
      showPreviews={true}
      showPreviewsInDropzone={false}
      useChipsForPreview
      previewText="Selected files"
      acceptedFiles={["application/pdf/*"]}
      dropzoneText={"Drag and drop pdf file here or click"}
      onChange={(files) => setFile(files[0])}
    />
  );
};

export default Dropzone;
