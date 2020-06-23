import React, { Component, useState } from 'react';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../redux/search/searchActions';
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import SearchResults from './SearchResults';
import SearchLeftBar from './SearchLeftBar'
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from "@material-ui/core/InputAdornment";
import requireAuth from '../requireAuth';

const useStyles = makeStyles({
    root: {
        flexGrow:1,
        marginBottom:70
    }
});

const renderTextField = ({
    input,
    label,
    ...custom
}) => (
        <TextField
            {...input}
            {...custom}
            label={label}
            InputProps={{
                endAdornment: (
                    <InputAdornment >
                        <IconButton type='submit' style={{ outline: 'none' }}>
                            <SearchIcon />
                        </IconButton>
                    </InputAdornment>
                )
            }}
        />
    )

const Search = (props) => {
    const classes = useStyles();
    const { handleSubmit } = props;  
    function clearForm(){
        document.getElementById("searchKeyword").reset();
    }
    const searchResults = () => {
        const envelopeArray = []; 
        props.searchResult.result.forEach(element => {
            envelopeArray.push(<SearchResults props={element} />)
        });
        return envelopeArray
    }
    return (
        <div className={classes.root}>
            <div align='center' style={{ marginBottom: 35 }}>
                <form onSubmit={handleSubmit} >
                    <fieldset>
                        <Field
                            name="searchTerm"
                            type="text"
                            component={renderTextField}
                            autoComplete="none"
                            label="Search"
                            onFocus="clearForm"
                        />
                    </fieldset>
                    <div>{props.errorMessage}</div>
                </form>
            </div>
            <div>
                {props.searchResult ? (
                    <div>
                        <Grid container style={{ padding: 10, marginLeft: 0, flexGrow:1, }}>
                            <Grid item xs={3} >
                                   {searchResults().length > 0 && <SearchLeftBar />}
                            </Grid>
                            <Grid item xs={9} >
                                    {
                                        searchResults()
                                    }
                            </Grid>
                        </Grid>
                    </div>
                ) : null}

            </div>
        </div>
    )

}

function onSubmit(formProps, dispatch) {
    // this.props.searchKeyword(formProps, () => {
    //     //this.props.history.push('/feature');
    // });
    dispatch(actions.searchKeyword(formProps))
};

function mapStateToProps(state) {
    return { searchResult: state.search.searchResult, errorMessage: state.auth.errorMessage };
}

export default compose(
    connect(mapStateToProps, actions),
    reduxForm({ form: 'searchKeyword', onSubmit })
)(requireAuth(Search));
