

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';

import { Grid } from "@mui/material";
import data from '../data';
import { Link } from 'react-router-dom';


export default () => {

    return (
        <Grid container={true} gap={"40px"}>
            {data.products.map((el) => {
                return (
                    <div key={el.id}>
                        <Link
                            to={'/3d/' + el.id}
                            style={{ textDecoration: 'none' }}
                        >
                            <Card sx={{ maxWidth: 345 }} style={{
                                backgroundImage: `url(${el.picUrl})`, width: 240, height: 240,
                                backgroundRepeat: 'no - repeat',
                                backgroundSize: 'cover',
                            }}>
                                <CardHeader
                                    title={el.title}
                                />
                                <CardContent>

                                    <CardActions>
                                    </CardActions>
                                </CardContent>
                            </Card>
                        </Link>
                    </div>

                );
            })}
        </Grid>
    );
};
