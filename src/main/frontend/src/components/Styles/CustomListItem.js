import { ListItem } from '@mui/material';
import { styled } from '@mui/system';

const CustomListItem = styled(ListItem)(({ theme }) => ({
    backgroundColor: theme.palette.background.item,
    borderRadius: '5px',
    marginBottom: '10px',
    padding: '10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    textDecoration: 'none',
    color: 'inherit',
}));

export default CustomListItem;