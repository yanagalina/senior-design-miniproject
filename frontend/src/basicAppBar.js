import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

import WeatherPanel from './weatherPanel';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}




export default function BasicAppBar() {

  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  return (
  <div>
  <AppBar position="static">
  <Toolbar>
  <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
    <Tab label="Temperature" {...a11yProps(0)} />
    <Tab label="Humidity" {...a11yProps(1)} />
    <Tab label="Weather" {...a11yProps(2)} />
  </Tabs>
  <Typography variant="h6" className={classes.title}>
      
  </Typography>
  <Button color="inherit">Logout</Button>
  </Toolbar>
  </AppBar>
  <TabPanel value={value} index={0}>
    Temperature Graph
  </TabPanel>
  <TabPanel value={value} index={1}>
    Humidity Graph
  </TabPanel>
  <TabPanel value={value} index={2}>
    <WeatherPanel/>
  </TabPanel>
  </div>
  )
}