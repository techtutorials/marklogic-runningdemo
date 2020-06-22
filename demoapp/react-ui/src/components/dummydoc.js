import React from 'react'
import { connect } from 'react-redux';

function DummyDoc(props) {
    return (
        <div>
            My Dummy Doc<br/>
            {props.formData.uri}
            <br/>
            {props.formData.doc}
            <br/>
            {props.formData.collection}
        </div>
        
    )
}

const mapStateToProps = (state) => {
    return {
        formData: state.form.createDocForm.values
    }
}

export default connect(mapStateToProps)(DummyDoc)
