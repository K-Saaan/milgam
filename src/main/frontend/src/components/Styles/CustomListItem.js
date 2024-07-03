import { ListItem } from '@mui/material';
import { styled } from '@mui/system';

const CustomListItem = styled(ListItem)({
    backgroundColor: '#2B3B5B',
    borderRadius: '5px',
    marginBottom: '10px',
    padding: '10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    textDecoration: 'none',
    color: 'inherit',
});

export default CustomListItem;