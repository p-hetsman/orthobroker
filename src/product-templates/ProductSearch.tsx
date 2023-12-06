import React, { FunctionComponent, useEffect, useState } from "react";
import {
    Card,
    CardActions,
    CardContent,
    CardHeader,
    FormControl,
    Grid,
    InputAdornment,
    TextField,
    createStyles,
    makeStyles
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import ClearIcon from "@material-ui/icons/Clear";
import data from "../data";

import { Link } from "react-admin";

const useStyles = makeStyles(() => {
    return createStyles({
        search: {
            margin: "0"
        }
    });
});

const TypeSearch: FunctionComponent = () => {
    const { search } = useStyles();
    const [searchTerm, setSearchTerm] = useState("");
    const [showClearIcon, setShowClearIcon] = useState("none");
    const [searchResults, setSearchResults] = useState([]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        //  setShowClearIcon(event.target.value === "" ? "none" : "flex");
        setSearchTerm(event.target.value);
    };

    useEffect(() => {
        const results = data.products.filter(product =>
            product.title.toLowerCase().includes(searchTerm)
        );
        setSearchResults(results);
    }, [searchTerm]);

    return (
        <div style={{ backgroundColor: 'rgb(231, 231, 231)' }}>
            <div style={{ paddingLeft: '40px' }}>
                <FormControl className={search}>
                    <TextField
                        placeholder="Search for products"
                        size="small"
                        variant="outlined"
                        onChange={handleChange}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment
                                    position="end"
                                    style={{ display: showClearIcon }}
                                    onChange={handleChange}
                                >
                                    <ClearIcon />
                                </InputAdornment>
                            )
                        }}
                    />
                </FormControl>
            </div>


            <Grid container={true} gap={"40px"} style={{
                display: 'flex',
                paddingTop: '40px',
                paddingBottom: '40px',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '40px'
            }}>

                {searchResults.map((el) => {
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
                                    color: 'whitesmoke'
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

        </div >
    );
};

export default TypeSearch;
