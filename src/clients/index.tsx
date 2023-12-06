import BookIcon from '@mui/icons-material/Book';
import ClientCreate from './ClientCreate';
import ClientEdit from './ClientEdit';
import ClientList from './ClientList';
import ClientShow from './ClientShow';

export default {
    list: ClientList,
    create: ClientCreate,
    edit: ClientEdit,
    show: ClientShow,
    icon: BookIcon,
    recordRepresentation: 'title',
};
