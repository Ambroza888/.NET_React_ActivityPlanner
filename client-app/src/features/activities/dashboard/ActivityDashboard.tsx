import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Grid, GridColumn } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import ActivityList from './ActivityList';
import LoadingComponent from '../../../app/layout/LoadingComponent';

export default observer(function ActivityDashboard() {

  const { activityStore } = useStore();

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if (activityStore.loadingInitial) return <LoadingComponent content="Loading App"/>

  return (
    <Grid>

      <Grid.Column width='10'>
        <ActivityList/>
      </Grid.Column>

      <GridColumn width='6'>
        <h1>Activities Filters</h1>
      </GridColumn>

    </Grid>
  );
})
