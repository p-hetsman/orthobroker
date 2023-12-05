

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { Grid } from "@mui/material";
import data from '../data';

export default () => {

    return (
        <Grid container={true} gap={"40px"}>
            {data.products.map((el) => {
                return (
                    <Card sx={{ maxWidth: 345 }} style={{
                        backgroundImage: `url(${el.picUrl})`, width: 240, height: 240,
                        backgroundRepeat: 'no - repeat',
                        backgroundSize: 'cover',
                    }}>
                        <CardHeader
                            action={
                                <IconButton aria-label="settings">
                                    <MoreVertIcon />
                                </IconButton>
                            }
                            title={el.title}
                        />
                        <CardContent>

                            <CardActions>
                            </CardActions>
                        </CardContent>
                    </Card>
                );
            })}
        </Grid>

    );
};
