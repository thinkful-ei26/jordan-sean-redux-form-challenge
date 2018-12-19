import React from 'react';
import {reduxForm, Field, SubmissionError} from 'redux-form';
import { containsValue, nonEmpty, fiveCharacters, numbers } from '../validators.js'
import Input from './input.js'

//create a stateless component
//return simlpe jsx
//add in redux form 
//turn into stateful component


class Main extends React.Component {
    onSubmit(values){
        console.log(values)
        return fetch('https://us-central1-delivery-form-api.cloudfunctions.net/api/report', {
            method: 'POST',
            body: JSON.stringify(values),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then (res => {
                if (!res.ok) {
                    if (
                        res.headers.has('content-type') &&
                        res.headers
                        .get('content-type')
                        .startsWith('application/json')
                    ) {
                        return res.json().then(err => Promise.reject(err));
                    }
                    return Promise.reject({
                        code: res.status,
                        message: res.statusText
                    })
                }
                // console.log(res);
                // return res.json()
                return;
            })
            .then((res) => console.log('Submitted with values', values))
            .catch(err => {
                // console.log(err);
                const {reason, message, location} = err;
                if (reason === 'ValidationError') {
                    return Promise.reject(
                        new SubmissionError({
                            [location]: message
                        })
                    );
                }
                return Promise.reject(
                    new SubmissionError({
                        // _error: 'Error submitting message'
                        _error: message
                    })
                );
            });
    }
    render() {
        let successMessage;
        let errorMessage;
        // console.log(this.props.submitSucceeded);
        if (this.props.submitSucceeded) {
            successMessage = (
                <div className='message message-success'>
                    Report received sucessfully
                </div>
            );
        } else if (this.props.error) {
            errorMessage = (
                <div className='message message-error'>
                    {this.props.error}
                </div>
            );
        }
        // console.log(this.props.error)
        return (
        <form onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
            <h1>Report a problem with your delivery</h1>
            {successMessage}
            {errorMessage}
            <Field name='trackingNumber' label='Tracking number required' id='tracking' type='text' component={Input} validate={[ containsValue, nonEmpty, numbers, fiveCharacters]}/>
            <div className = 'issues'>
                <Field name='issue' label='What is your issues?' id='issue-selection' component={Input} element='select'>
                    <option value=''>-- Please Select --</option>
                    <option value='not-delivered'>My delivery hasnt arrived</option>
                    <option value='wrong-item'>The wrong item was delivered</option>
                    <option value='missing-part'>Part of my order was missing</option>
                    <option value='damaged'>Some of my order arrived damaged</option>
                    <option value='other'>Other (Please provide details below)</option>
                </Field>
                <div>
                    <Field name='details' label='Give more details (optional)' id='issue-detail' rows='5' cols='30' component={Input} element='textarea' />
                </div>
            </div>
            <input type='submit' value='Submit' />
        </form>)
    }
}

export default reduxForm({form: 'deliveryForm'})(Main);
