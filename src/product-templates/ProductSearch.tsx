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
        < >
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
                gap: '40px'
            }}>

                {searchResults.map((el) => {
                    return (
                        <div key={el.id}>
                            <Link
                                to={'/3d/' + el.id}
                                style={{ textDecoration: 'none' }}
                            >
                                <div style={{
                                    backgroundImage: `url(${el.picUrl})`, width: 240, height: 240,
                                    backgroundRepeat: 'no - repeat',
                                    backgroundSize: 'cover',
                                    color: 'whitesmoke',
                                    borderRadius: '4px',
                                    boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)'
                                }}>
                                    <CardHeader
                                        title={el.title}
                                    />
                                    <CardContent>
                                        <CardActions>
                                        </CardActions>
                                    </CardContent>
                                </div>
                            </Link>
                        </div>

                    );
                })}
            </Grid>

        </ >
    );
};

export default TypeSearch;
