import React from 'react';
import { ErrorMessage, Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { Button, Header } from 'semantic-ui-react';
import MyTextInput from '../../app/common/form/MyTextInput';
import { useStore } from '../../app/stores/store';
import * as Yup from 'yup';
import ValidationErrors from '../errors/ValidationErrors';

export default observer(function Register() {
  const { userStore } = useStore();
  return (
    <Formik
      initialValues={{ displayName: '', username: '', email: '', password: '', error: null }}
      onSubmit={(values, { setErrors }) => userStore.register(values).catch(err => setErrors({ error: err }))}
      validationSchema={Yup.object({
        displayName: Yup.string().required(),
        username: Yup.string().required(),
        email: Yup.string().required().email(),
        password: Yup.string().required(),
      })}
    >
      {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (

        // really important is to add error class in the className of the component
        <Form onSubmit={handleSubmit} className='ui form error' autoComplete='off'>

          <Header as='h2' content='Sign up to Activities ' color='teal' textAlign='center' />

          <MyTextInput name='displayName' placeholder='Display Name' />
          <MyTextInput name='username' placeholder='Username' />
          <MyTextInput name='email' placeholder='Email' />
          <MyTextInput name='password' placeholder='Password' type='password' />

          <ErrorMessage name='error' render={() =>
            <ValidationErrors errors={errors.error}/> }
          />

          <Button disabled={!isValid || !dirty || isSubmitting} loading={isSubmitting} positive type='submit' content='Register' fluid />
        </Form>
      )}
    </Formik>
  )
})