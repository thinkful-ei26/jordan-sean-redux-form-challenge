import React from 'react';

//create a stateless component
//return simlpe jsx
//add in redux form 
//turn into stateful component


export default function Main() {

    console.log('im rendering')
    return <div className='static'>
    <h1>Report a problem with your delivery</h1>
        <label htmlFor='tracking'>Tracking number required</label>
        <input id='tracking'/>
    <div className = 'issues'>
        <label htmlFor='issue-selection'>What is your issue?</label>
        <select id='issue-selection'>
             <option value='My delivery hasnt arrived'>My delivery hasnt arrived</option>
             <option value='The wrong item was delivered'>The wrong item was delivered</option>
             <option value='Part of my order was missing'>Part of my order was missing</option>
             <option value='Some of my order arrived damaged'>Some of my order arrived damaged</option>
             <option value='Other (Please provide details below)'>Other (Please provide details below)</option>
        </select>
        <div>
        <label htmlFor='issue-detail'>Give more details (optional)</label>
        <textarea id='issue-detail' rows='5' cols='30'></textarea>
        </div>
    </div>
    </div>

}