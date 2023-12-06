import * as React from 'react';
import {
    CloneButton,
    DateField,
    ShowContextProvider,
    ShowView,
    TextField,
    useShowController,
    useLocaleState,
    useRecordContext,
    SimpleShowLayout,
    FunctionField,
    ListButton,
    EditActionsProps,
    TopToolbar,
    CreateButton,
    EditButton,
} from 'react-admin';
import PostTitle from './ClientTitle';
import {CardHeader, Grid} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const CreateRelatedComment = () => {
    const record = useRecordContext();
    return (
        <CloneButton
            resource="comments"
            label="Add comment"
            record={{post_id: record.id}}
        />
    );
};

const EditActions = ({hasShow}: EditActionsProps) => (
    <TopToolbar style={{display: 'flex', justifyContent: 'space-between'}}>
        {/*<CloneButton className="button-clone" />*/}
        {/*{hasShow && <ShowButton />}*/}
        {/* FIXME: added because react-router HashHistory cannot block navigation induced by address bar changes */}
        <ListButton label={'Go back'} icon={<ArrowBackIcon/>}/>
        <EditButton/>
    </TopToolbar>
);

const ClientShow = () => {
    const controllerProps = useShowController();
    const [locale] = useLocaleState();
    return (<>
            <ShowContextProvider value={controllerProps}>
                <ShowView title={<PostTitle/>} actions={<EditActions/>}>
                    <CardHeader title={'Client info'}/>
                    <div style={{display: 'flex'}}>
                        <div style={{margin: 10}}><img src={'https://loremflickr.com/240/240/technics'}/></div>
                        <SimpleShowLayout>
                            <FunctionField label={'Name'}
                                           render={({firstName, lastName}) => `${firstName} ${lastName}`}/>
                            <TextField source="email" label='Email'/>
                            <TextField source="initials" label='Initials'/>
                            <TextField source="clientId" label='Orthobroker client ID'/>
                            <TextField source="notes" label='Notes'/>
                            <DateField source='createdAt' label='Created'/>
                            <FunctionField label={'Creator'} render={() => `-`}/>
                        </SimpleShowLayout>
                    </div>
                </ShowView>
            </ShowContextProvider>
            <ShowContextProvider value={controllerProps}>
                <CardHeader title={'Measurement data'} style={{marginTop: 20, paddingLeft: 0}}/>
                <ShowView actions={false}>
                    <div style={{margin: 20}}>Table is under development</div>
                </ShowView>
            </ShowContextProvider>
            <ShowContextProvider value={controllerProps}>
                <CardHeader title={'Designs'} style={{marginTop: 20, paddingLeft: 0}}/>
                <ShowView actions={false}>
                    <div style={{margin: 20}}>Table is under development</div>
                </ShowView>
            </ShowContextProvider>
        </>
    );
};

export default ClientShow;
