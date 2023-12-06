import * as React from 'react';
import {Fragment, memo} from 'react';
import BookIcon from '@mui/icons-material/Book';
import {Box, Card, Chip, useMediaQuery} from '@mui/material';
import {Theme, styled} from '@mui/material/styles';
import lodashGet from 'lodash/get';
import jsonExport from 'jsonexport/dist';
import {
    BulkDeleteButton,
    BulkExportButton,
    SelectColumnsButton,
    CreateButton,
    DatagridConfigurable,
    DateField,
    downloadCSV,
    ExportButton,
    FilterButton,
    List,
    InfiniteList,
    SearchInput,
    SimpleList,
    TextField,
    TextInput,
    TopToolbar,
    useTranslate,
} from 'react-admin'; // eslint-disable-line import/no-unresolved

import ResetViewsButton from './ResetViewsButton';

export const PostIcon = BookIcon;

const QuickFilter = ({
                         label,
                     }: {
    label?: string;
    source?: string;
    defaultValue?: any;
}) => {
    const translate = useTranslate();
    return <Chip sx={{marginBottom: 1}} label={translate(label)}/>;
};

const postFilter = [
    <SearchInput source="q" alwaysOn/>,
    <TextInput source="title" defaultValue="Qui tempore rerum et voluptates"/>,
    <QuickFilter
        label="resources.posts.fields.commentable"
        source="commentable"
        defaultValue
    />,
];

const exporter = posts => {
    const data = posts.map(post => ({
        ...post,
        backlinks: lodashGet(post, 'backlinks', []).map(
            backlink => backlink.url
        ),
    }));
    return jsonExport(data, (err, csv) => downloadCSV(csv, 'posts'));
};

const PostListMobileActions = () => (
    <TopToolbar>
        <FilterButton/>
        <CreateButton/>
        <ExportButton/>
    </TopToolbar>
);

const PostListMobile = () => (
    <InfiniteList
        filters={postFilter}
        exporter={exporter}
        actions={<PostListMobileActions/>}
    >
        <SimpleList
            primaryText={record => `${record.firstName} ${record.lastName}`}
        />
    </InfiniteList>
);

const StyledDatagrid = styled(DatagridConfigurable)(({theme}) => ({
    '& .title': {
        maxWidth: '16em',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
    '& .hiddenOnSmallScreens': {
        [theme.breakpoints.down('lg')]: {
            display: 'none',
        },
    },
    '& .column-tags': {
        minWidth: '9em',
    },
    '& .publishedAt': {fontStyle: 'italic'},
}));

const PostListBulkActions = memo(
    ({
         // eslint-disable-next-line @typescript-eslint/no-unused-vars
         children,
         ...props
     }) => (
        <Fragment>
            <ResetViewsButton {...props} />
            <BulkDeleteButton {...props} />
            <BulkExportButton {...props} />
        </Fragment>
    )
);

const PostListActions = () => (
    <TopToolbar>
        <SelectColumnsButton/>
        <FilterButton/>
        <CreateButton/>
        {/*<ExportButton/>*/}
    </TopToolbar>
);

const PostListActionToolbar = ({children}) => (
    <Box sx={{alignItems: 'center', display: 'flex'}}>{children}</Box>
);

const rowClick = (_id, _resource, record) => {
    if (record.commentable) {
        return 'edit';
    }

    return 'show';
};

const PostPanel = ({record}) => (
    <div dangerouslySetInnerHTML={{__html: record.body}}/>
);

const tagSort = {field: 'name.en', order: 'ASC'};

const PostListDesktop = () => (
    <List
        filters={postFilter}
        exporter={exporter}
        actions={<PostListActions/>}
    >
        <StyledDatagrid
            omit={['average_note']}
            rowClick={rowClick}
            bulkActionButtons={false}
        >
            <TextField source="lastName" label="Last name"/>
            <TextField source="firstName" label="First name"/>
            <TextField source="initials" label="Initials"/>
            <TextField source="clientId" label="Orthobroker client ID"  />
            <DateField source="createdAt" label="Created"/>
        </StyledDatagrid>
    </List>
);

const ClientList = () => {
    const isSmall = useMediaQuery<Theme>(
        theme => theme.breakpoints.down('md'),
        {noSsr: true}
    );
    return isSmall ? <PostListMobile/> : <PostListDesktop/>;
};

export default ClientList;
