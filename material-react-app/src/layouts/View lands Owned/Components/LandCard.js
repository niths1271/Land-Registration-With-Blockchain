import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Landimage from "assets/images/Landimage.jpg";
import MDButton from 'components/MDButton';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

export default function ComplexGrid() {
  return (
    <Paper
      sx={{
        p: 2,
        margin: 'auto',
        maxWidth: 500,
        flexGrow: 1,
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
      }}
    >
      <Grid container spacing={2}>
        <Grid item>
          <Img alt="complex" src={Landimage} />
        </Grid>
        <Grid item xs='auto' sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="body1" component="div">
                Property 1
              </Typography>
              <Typography variant="body2" gutterBottom>
                Dimensions:40*60
              </Typography>
              <Typography variant="body2" color="text.secondary">
                PID: 1030114
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Survey no:45
              </Typography>
            </Grid>
            <Grid item>
              <Typography sx={{ cursor: 'pointer' }} variant="body1">
              <u><a href="https://ipfs.io/ipfs/QmUTLZYapeUrNFpQAP8nCUBTk9krDDoyYD2gVJtzMmW5pb" target="_blank">Land Document</a></u>
              </Typography>
            </Grid>
          </Grid>
          <Grid item direction="column">
            <Grid item xs mb={13}>
              <Typography variant="subtitle1" component="div">
                $19.00
              </Typography>
            </Grid>
            <Grid item>
              <MDButton variant="contained" color="error">
                Buy Land
              </MDButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}