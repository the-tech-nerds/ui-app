import React from 'react';
import Slider from 'react-slick';
import Category from '../../components/categories/category';
import { FormControlLabel, FormLabel, Grid, makeStyles, Paper, Radio, RadioGroup } from "@material-ui/core";
import Image from "../image/image";

const CategoryList = ({ categories = [], category = {} }) => {

    return (
        <section className="ratio_asos section-b-space">
            <div className="container">
                <div className="d-flex">
                    <div className="flex-fill"><hr /></div>
                    <div className="ml-4 mr-4 font-weight-bold">{category.name}</div>
                    <div className="flex-fill"><hr /></div>
                </div>
                <CategoryItem categories={categories} />
            </div>
        </section>
    );
};

const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        width: 160,
    }
}));
const CategoryItem = ({ categories = [] }) => {

    const [spacing, setSpacing] = React.useState(2);
    const classes = useStyles();
    return (
        <Grid container className={classes.root} spacing={2}>
            <Grid item xs={12}>
                <Grid container justify="center" spacing={spacing}>
                    {categories.map((value) => (
                        <Grid key={value} item>
                            <Paper className={`${classes.paper} hover-item p-2`} onClick={() => {
                                window.location.href = `/${value.slug}`;
                            }} >
                                <div className="text-center">
                                    <Image
                                        src={`${value.images[0]}`}
                                        width={'146px'}
                                        height={'150px'}
                                        alt="click to view"
                                    />
                                </div>
                                <div className=" text-center mt-1">
                                    {value.name}
                                </div>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Grid>
    );
}

export default CategoryList;
