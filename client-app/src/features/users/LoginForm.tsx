import { Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button } from 'semantic-ui-react';
import MyTextInput from '../../app/common/form/MyTextInput';
import { useStore } from '../../app/stores/store';

export default observer(function LoginForm() {
  const { userStore } = useStore();
  return (
    <Formik
      initialValues={{email: '', password: ''}}
      onSubmit={values => userStore.login(values)}
    >
      {({handleSubmit, isSubmitting}) => (
        <Form onSubmit={handleSubmit} className='ui form' autoComplete='off'>
          <MyTextInput name='email' placeholder='Email'/>
          <MyTextInput name='password' placeholder='Password' type='password'/>
          <Button loading={isSubmitting} positive type='submit' content='Login' fluid />
        </Form>
      )}
    </Formik>
  )
})