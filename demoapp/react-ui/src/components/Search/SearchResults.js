import React, { useState } from 'react'
import { connect } from 'react-redux'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import CardActionArea from '@material-ui/core/CardActionArea';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        maxWidth: 270,
        maxHeight:220,
        margin:10,
        flexGrow:1
    }
});

const SearchResults = (props) => {
    const { envelope } = props.props;
    // console.log("jlasjdflasf", props)
    const classes = useStyles();
    const getAuthors = () => {
        const authorArr = []
        envelope.instance[0].articleProfile[0].authors.forEach(element => {
            console.log(authorArr)
            if (element) {
                authorArr.push(<span>{element.author}</span>);
            }
        });
        return authorArr
    }
    return (
        <Card className={classes.root}>
                <CardContent style={{backgroundColor:'#827397'}}>
                    <Typography variant="body2" style={{color:'#ffffff'}} color="textSecondary" component="p">
                        {envelope.headers[0].articleTitle}
                    </Typography>
                </CardContent>
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                    Publish Date: {(envelope.instance[0].articleProfile[0].publishDate).toString().trim() ? envelope.instance[0].articleProfile[0].publishDate : "NA"}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                    Organization: {(envelope.instance[0].articleProfile[0].organization).toString().trim() ? envelope.instance[0].articleProfile[0].organization : "NA"}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                    Authors: {getAuthors().length>0 ? getAuthors() : "NA"}
                    </Typography>
                </CardContent>
            
        </Card>
    )
}

export default SearchResults
