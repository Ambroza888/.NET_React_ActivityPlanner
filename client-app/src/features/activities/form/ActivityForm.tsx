import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Form, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';

export default observer(function ActivityForm() {
  const { activityStore } = useStore();
  const { createActivity, updateActivity, loading, loadActivity, loadingInitial} =
    activityStore;
  const { id } = useParams<{ id: string }>();

  const [activity, setActivity] = useState({
    id: '',
    title: '',
    category: '',
    description: '',
    date: '',
    city: '',
    venue: '',
  });

  useEffect(()=>{
    if (id) loadActivity(id).then(activity => setActivity(activity!));
  }, [id, loadActivity]);

  function handleOnSubmit() {
    activity.id ? updateActivity(activity) : createActivity(activity);
  }

  function handleInputChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setActivity({ ...activity, [name]: value });
  }

  if (loadingInitial) return <LoadingComponent content='loading activity...' />

  return (
    <Segment clearing>
      <Form onSubmit={handleOnSubmit} autoComplete='off'>
        <Form.Input
          placeholder='Title'
          name='title'
          value={activity.title}
          onChange={handleInputChange}
        />
        <Form.TextArea
          placeholder='Description'
          name='description'
          value={activity.description}
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder='Category'
          name='category'
          value={activity.category}
          onChange={handleInputChange}
        />
        <Form.Input
          type='Date'
          placeholder='Date'
          name='date'
          value={activity.date}
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder='City'
          name='city'
          value={activity.city}
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder='Venue'
          name='venue'
          value={activity.venue}
          onChange={handleInputChange}
        />

        <Button
          loading={loading}
          floated='right'
          positive
          type='submit'
          content='Submit'
        />
        <Button floated='right' type='button' content='Cancel' />
      </Form>
    </Segment>
  );
});
