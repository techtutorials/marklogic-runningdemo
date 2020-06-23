/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
      marginTop: 5,
  },
}));

export default function MoreDetailsLink(props) {
  const classes = useStyles();
  var details = props.props
  const uuid = props.uuid
  localStorage.setItem(`articleDetails-${uuid}`, JSON.stringify(details))
  return (
    <Typography className={classes.root}>
      <Link href={`articleDetails?uuid=${uuid}`} >
        More Details...
      </Link>
    </Typography>
  );
}