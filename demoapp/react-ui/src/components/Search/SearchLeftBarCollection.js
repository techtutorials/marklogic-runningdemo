import React from 'react';
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'


export default function SearchLeftBarCollection(props) {

    const mapTopics = () => {
    let topicArr = [];  
    props.props.forEach(element => {
        topicArr.push('')
    })
    return topicArr
  }

  return (
    <Card style={{marginBottom:10}}>
                <CardContent style={{ backgroundColor: '#4d4c7d' }}>
                    <Typography variant="body2" style={{ color: '#ffffff' }} color="textSecondary" component="p">
                        Collection
                    </Typography>
                </CardContent>
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Data 1
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Data 2
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Data 3
                    </Typography>
                </CardContent>
            </Card>
  );
}