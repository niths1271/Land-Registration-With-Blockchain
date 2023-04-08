// import * as React from 'react';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Typography from '@mui/material/Typography';
// import { CardActionArea } from '@mui/material';

// export default function LandCard() {
//   return (
//     // <Card>
//     //   <CardActionArea>
//     //     <CardMedia
//     //       component="img"
//     //       height="140"
//     //       image="C:\Blockchain\Land-Registration-Bloakchain\material-react-app\src\assets\images\Landimage.jpg"
//     //       alt="Land images"
//     //     />
//     //     <CardContent>
//     //       <Typography gutterBottom variant="h5" component="div">
//     //         Dimensions
//     //       </Typography>
//     //       <Typography variant="body2" color="text.secondary">
//     //         PID: 232
//     //         Survey No: 34
//     //         Price:1179239163981
//     //       </Typography>
//     //     </CardContent>
//     //   </CardActionArea>
//     // </Card>
// );
// }
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';

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
          <ButtonBase sx={{ width: 128, height: 128 }}>
            <Img alt="complex" src="./Landimage.jpg"  />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div">
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
              <Typography sx={{ cursor: 'pointer' }} variant="body2">
                Remove
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" component="div">
              $19.00
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}