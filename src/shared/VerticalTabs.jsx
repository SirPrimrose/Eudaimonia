import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

function TabPanel(props) {
  const { children, value, index } = props;

  return (
    <Box hidden={value !== index} width="100%" height="100%">
      {value === index && <div>{children}</div>}
    </Box>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node.isRequired,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function VerticalTabs(props) {
  const { tabs } = props;
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <Tabs
        variant="fullWidth"
        value={value}
        onChange={handleChange}
        sx={{ borderBottom: 1, borderColor: 'divider' }}
      >
        {tabs.map((child, index) => (
          <Tab key={child.label} icon={child.icon} value={index} />
        ))}
      </Tabs>
      {tabs.map((child, index) => (
        <TabPanel key={child.label} value={value} index={index}>
          {child.component}
        </TabPanel>
      ))}
    </Box>
  );
}

VerticalTabs.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      icon: PropTypes.node.isRequired,
      component: PropTypes.node.isRequired,
    })
  ).isRequired,
};

export default VerticalTabs;
