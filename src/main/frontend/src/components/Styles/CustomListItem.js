import { ListItem } from '@mui/material';
import { styled } from '@mui/system';

const CustomListItem = styled(ListItem)(({ selected }) => ({
  backgroundColor: selected ? '#4a4a4a' : '#2B3B5B',
  color: selected ? 'white' : 'inherit',
  borderRadius: '5px',
  marginBottom: '10px',
  padding: '10px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  textDecoration: 'none',
  '&:hover': {
    backgroundColor: '#4a4a4a',
  },
}));

export default CustomListItem;
