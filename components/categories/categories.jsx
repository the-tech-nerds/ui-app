import React from 'react';
import Slider from 'react-slick';
import Category from '../../components/categories/category';
import { FormControlLabel, FormLabel, Grid, makeStyles, Paper, Radio, RadioGroup } from "@material-ui/core";
import Image from "../image/image";
import Link from 'next/link';

const CategoryList = ({ categories = [], category = {} }) => {
    return (
        <section className="ratio_asos ">
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
                    {categories.map((category) => (
                        <Grid key={category.name} item>
                            <Link
                                href={{
                                    pathname: '/views/category/[slug]',
                                    query: { slug: category.slug },
                                }}
                                as={`/${category.slug}`}
                            >
                                <Paper className={`${classes.paper} hover-item p-2`}>
                                    <div className="text-center">
                                        <Image
                                            src={`${category?.images[0] || ""}`}
                                            width={146}
                                            height={150}
                                            alt={category.name}
                                        />
                                    </div>
                                    <div className=" text-center mt-1">
                                        {category.name}
                                    </div>
                                </Paper>
                            </Link>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Grid>
    );
}

export default CategoryList;
