import React, { useState } from 'react'
import { connect } from 'react-redux'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Chip from '@material-ui/core/Chip';
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import CardActionArea from '@material-ui/core/CardActionArea';
import { makeStyles } from '@material-ui/core/styles';
import SearchTopic from './SearchTopic'
import Divider from '@material-ui/core/Divider';
import MoreDetailsLink from './MoreDetailsLink'
import Highlighter from "react-highlight-words";

const useStyles = makeStyles({
    root: {
        maxHeight: 400,
        margin: 10,
        flexGrow: 1,
    }
});

const SearchResults = (props) => {
    console.log(props)
    const { envelope } = props.props;
    // console.log("jlasjdflasf", envelope)
    // console.log(tempStr)
    const classes = useStyles();

    const getTopics = () => {
        const topicArr = []
        envelope.instance[0].topics[0].topic[0].word.forEach(element => {
            if (element) {
                topicArr.push(element._);
            }
        });
        return topicArr
    }

    const getAuthors = () => {
        const authorArr = []
        envelope.instance[0].articleProfile[0].authors.forEach(element => {
            if (element) {
                authorArr.push(<span>{element.author}</span>);
            }
        });
        return authorArr
    }

    const getArticleDetails = () => {
        const detailsArr = []

        envelope.instance[0].article[0].div[0].p.forEach(element => {

            if (typeof element === 'string') {
                detailsArr.push(element + ' ');
            } else if (typeof element === 'object') {
                const tempstr = JSON.stringify(element)
                if (/ent:.*/.test(tempstr)) {
                    // Object.values(element)[1][0]._
                    // element._.replace(/\n\t\t\t\t\t\n\t\t\t\t\t/, Object.values(element)[1][0]._)
                    detailsArr.push(element._.replace(/\n\t\t\t\t\t\n\t\t\t\t\t/, Object.values(element)[1][0]._))
                }
            }
        });
        return detailsArr
    }
    return (
        <Card className={classes.root}>
            <CardContent style={{ backgroundColor: '#827397', maxHeight: 100 }}>
                <Typography variant="body2" style={{ color: '#ffffff' }} color="textSecondary" component="p">
                    {envelope.headers[0].articleTitle}
                </Typography>
            </CardContent>
            <CardContent style={{ backgroundColor: '#ffffff', maxHeight: 100 }}>
                <Typography variant="body2" color="textSecondary" component="p">
                    <b>Publish Date:</b> {(envelope.instance[0].articleProfile[0].publishDate).toString().trim() ? envelope.instance[0].articleProfile[0].publishDate : "NA"}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    <b>Organization:</b> {(envelope.instance[0].articleProfile[0].organization).toString().trim() ? envelope.instance[0].articleProfile[0].organization : "NA"}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    <b>Authors:</b> {getAuthors().length > 0 ? getAuthors() : "NA"}
                </Typography>
            </CardContent>

            <CardContent style={{ maxHeight: 200 }}>
                <Divider />
                <Typography variant="body2" color="textSecondary" component="p">
                    <SearchTopic props={getTopics()} />
                </Typography>
                <MoreDetailsLink props={getArticleDetails()} uuid={envelope.headers[0].uuid[0]} />
            </CardContent>
        </Card>
    )
}

export default SearchResults
