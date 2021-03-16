import React, { ChangeEvent, useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';

interface Props {
  closeForm: () => void;
  activity: Activity | undefined;
  createOrEdit: (activity:Activity) => void;
}

export default function ActivityForm({closeForm, activity: selectedActivity, createOrEdit} : Props) {

  const initialState = selectedActivity ?? {
    id: '',
    title: '',
    category: '',
    description: '',
    date: '',
    city: '',
    venue:''
  }

  const [activity, setActivity] = useState(initialState);

  function handleOnSubmit() {
    createOrEdit(activity);
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const {name, value}= e.target;
    setActivity({...activity, [name]: value})
  }

  return (
    <Segment clearing>
      <Form onSubmit={handleOnSubmit} autoComplete='off'>
        <Form.Input placeholder='Title' name='title' value={activity.title} onChange={handleInputChange}/>
        <Form.TextArea placeholder='Description' name='description' value={activity.description} onChange={handleInputChange}/>
        <Form.Input placeholder='Category' name='category' value={activity.category} onChange={handleInputChange} />
        <Form.Input placeholder='Date' name='date' value={activity.date} />
        <Form.Input placeholder='City' name='city' value={activity.city} />
        <Form.Input placeholder='Venue' name='venue' value={activity.venue} />

        <Button floated='right' positive type='submit' content='Submit' />
        <Button onClick={closeForm} floated='right' type='button' content='Cancel' />
      </Form>
    </Segment>
  )
}