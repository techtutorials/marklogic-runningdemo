import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import requireAuth from '../requireAuth'
import {useSelector, useDispatch} from 'react-redux'
import {searchTopic} from './../../redux/search/searchActions'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'left',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.7),
    },
  },
}));

const SearchTopic = (props) => {
  const classes = useStyles();
  
  const searchResult = useSelector(state => state.search.searchResult)
  const dispatch = useDispatch()
       
  const mapTopics = () => {
    let topicArr = [];
    props.props.forEach(element => {
      //use of hook in redux
      topicArr.push(<Chip size="small" label={element} onClick={()=>{
        document.forms[0].searchTerm.value=element
        dispatch(searchTopic(element))
        
      }
    } />)
    })
    return topicArr
  }

  return (
    <div className={classes.root}>
      {mapTopics()}
    </div>
  );
}

export default (requireAuth(SearchTopic));