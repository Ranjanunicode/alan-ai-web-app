import React, { useEffect, useState, createRef } from 'react';
import { Card, CardActions, CardActionArea, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import classNames from 'classname';
import useStyles from './styles.js';

const NewsCard = ({ article: { description, publishedAt, source, title, url, urlToImage }, activeArticles, i }) => {
    const classes = useStyles();

    const [elRef, setElRef] = useState([]);

    const scrollToRef = (ref) => window.scroll(0, ref.current.offsetTop - 50);

    useEffect(() => {
        window.scroll(0, 0);

        setElRef((refs) => Array(20).fill().map((_, j) => refs[j] || createRef()));
    }, []);

    useEffect(() => {
        if (i === activeArticles && elRef[activeArticles]) {
            scrollToRef(elRef[activeArticles]);
        }
    }, [i, activeArticles, elRef]);

    return (
        <Card ref={elRef[i]} className={classNames(classes.card, activeArticles === i ? classes.activeCard : null)}>
            <CardActionArea href={url} target='_blank'>
                <CardMedia className={classes.media} image={urlToImage || 'https://files.northernbeaches.nsw.gov.au/sites/default/files/styles/gi--main-thumbnail/public/images/general-information/latest-news/latest-news.jpg?itok=WZeytozR'} />
                <div className={classes.details}>
                    <Typography varient="body2" color="textSecondary" component="h2">{(new Date(publishedAt)).toDateString()}</Typography>
                    <Typography varient="body2" color="textSecondary" component="h2">{source.name}</Typography>
                </div>
                <Typography className={classes.title} gutterBottom varient="h5">{title}</Typography>
                <CardContent>
                    <Typography varient="body2" color="textSecondary" component="p">{description}</Typography>
                </CardContent>
            </CardActionArea>
            <CardActions className={classes.cardActions}>
                <Button size='small' color='primary'>Learn more</Button>
                <Typography varient="h5" color="textSecondary">{i + 1}</Typography>
            </CardActions>
        </Card>
    );
}

export default NewsCard;