import * as React from 'react';
import {useMemo} from 'react';
import {RichTextInput} from 'ra-input-rich-text';
import {
    ArrayInput,
    AutocompleteInput,
    BooleanInput,
    Create,
    required,
    ReferenceInput,
    SaveButton,
    SelectInput,
    SimpleFormConfigurable,
    SimpleFormIterator,
    TextInput,
    Toolbar,
    useNotify,
    usePermissions,
    useRedirect,
    useCreate,
    useCreateSuggestionContext, ListButton,
} from 'react-admin';
import {useFormContext, useWatch} from 'react-hook-form';
import {Box, BoxProps, Button, Dialog, DialogActions, DialogContent} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const SanitizedBox = ({
                          // eslint-disable-next-line @typescript-eslint/no-unused-vars
                          fullWidth,
                          ...props
                      }: BoxProps & { fullWidth?: boolean }) => <Box {...props} />;

const PostCreateToolbar = () => {
    const notify = useNotify();
    const redirect = useRedirect();
    const {reset} = useFormContext();

    return (
        <Toolbar>
            <SanitizedBox display={'flex'} width={300} justifyContent={'space-between'}>
                <ListButton label={'Cancel'} icon={false}/>
                <SaveButton label="Save" variant="text" icon={false} endIcon={<ArrowForwardIcon/>}/>
            </SanitizedBox>
            {/*<SaveButton*/}
            {/*    label="post.action.save_and_show"*/}
            {/*    type="button"*/}
            {/*    variant="text"*/}
            {/*    mutationOptions={{*/}
            {/*        onSuccess: data => {*/}
            {/*            notify('ra.notification.created', {*/}
            {/*                type: 'info',*/}
            {/*                messageArgs: { smart_count: 1 },*/}
            {/*            });*/}
            {/*            redirect('show', 'posts', data.id);*/}
            {/*        },*/}
            {/*    }}*/}
            {/*    sx={{ display: { xs: 'none', sm: 'flex' } }}*/}
            {/*/>*/}
            {/*<SaveButton*/}
            {/*    label="post.action.save_and_add"*/}
            {/*    type="button"*/}
            {/*    variant="text"*/}
            {/*    mutationOptions={{*/}
            {/*        onSuccess: () => {*/}
            {/*            reset();*/}
            {/*            window.scrollTo(0, 0);*/}
            {/*            notify('ra.notification.created', {*/}
            {/*                type: 'info',*/}
            {/*                messageArgs: { smart_count: 1 },*/}
            {/*            });*/}
            {/*        },*/}
            {/*    }}*/}
            {/*/>*/}
            {/*<SaveButton*/}
            {/*    label="post.action.save_with_average_note"*/}
            {/*    type="button"*/}
            {/*    variant="text"*/}
            {/*    mutationOptions={{*/}
            {/*        onSuccess: data => {*/}
            {/*            notify('ra.notification.created', {*/}
            {/*                type: 'info',*/}
            {/*                messageArgs: { smart_count: 1 },*/}
            {/*            });*/}
            {/*            redirect('show', 'posts', data.id);*/}
            {/*        },*/}
            {/*    }}*/}
            {/*    transform={data => ({ ...data, average_note: 10 })}*/}
            {/*    sx={{ display: { xs: 'none', sm: 'flex' } }}*/}
            {/*/>*/}
        </Toolbar>
    );
};

const backlinksDefaultValue = [
    {
        date: new Date(),
        url: 'http://google.com',
    },
];
const ClientCreate = () => {
    const defaultValues = useMemo(
        () => ({
            average_note: 0,
        }),
        []
    );
    const {permissions} = usePermissions();
    const dateDefaultValue = useMemo(() => new Date(), []);


    const [create] = useCreate();

    return (
        <Create redirect="edit">
            <SimpleFormConfigurable
                toolbar={<PostCreateToolbar/>}
                defaultValues={defaultValues}
            >
                <TextInput
                    autoFocus
                    source="firstName"
                    validate={required('Required field')}
                    style={{width: 300}}
                />
                <TextInput
                    source="lastName"
                    validate={required('Required field')}
                    style={{width: 300}}
                />
                <TextInput source='email' style={{width: 300}}/>
                <TextInput source='initials' style={{width: 300}}/>
                <TextInput source='clientId' style={{width: 300}}/>
                <TextInput source='notes' style={{width: 300}}/>


                {/*<DependantInput dependency="title">*/}
                {/*    <NumberInput*/}
                {/*        source="average_note"*/}
                {/*        validate={[*/}
                {/*            minValue(0, 'Should be between 0 and 5'),*/}
                {/*            maxValue(5, 'Should be between 0 and 5'),*/}
                {/*        ]}*/}
                {/*    />*/}
                {/*</DependantInput>*/}

                {/*<DateInput*/}
                {/*    source="published"*/}
                {/*    defaultValue={dateDefaultValue}*/}
                {/*/>*/}
                {/*<BooleanInput source="commentable" defaultValue />*/}
                {/*<ArrayInput*/}
                {/*    source="backlinks"*/}
                {/*    defaultValue={backlinksDefaultValue}*/}
                {/*    validate={[required()]}*/}
                {/*>*/}
                {/*    <SimpleFormIterator>*/}
                {/*        <DateInput source="date" defaultValue="" />*/}
                {/*        <TextInput source="url" defaultValue="" />*/}
                {/*    </SimpleFormIterator>*/}
                {/*</ArrayInput>*/}
                {/*{permissions === 'admin' && (*/}
                {/*    <ArrayInput source="authors">*/}
                {/*        <SimpleFormIterator>*/}
                {/*            <ReferenceInput source="user_id" reference="users">*/}
                {/*                <AutocompleteInput*/}
                {/*                    label="User"*/}
                {/*                    create={<CreateUser />}*/}
                {/*                />*/}
                {/*            </ReferenceInput>*/}
                {/*            <FormDataConsumer>*/}
                {/*                {({ scopedFormData, getSource, ...rest }) =>*/}
                {/*                    scopedFormData && scopedFormData.user_id ? (*/}
                {/*                        <SelectInput*/}
                {/*                            source={getSource('role')}*/}
                {/*                            choices={[*/}
                {/*                                {*/}
                {/*                                    id: 'headwriter',*/}
                {/*                                    name: 'Head Writer',*/}
                {/*                                },*/}
                {/*                                {*/}
                {/*                                    id: 'proofreader',*/}
                {/*                                    name: 'Proof reader',*/}
                {/*                                },*/}
                {/*                                {*/}
                {/*                                    id: 'cowriter',*/}
                {/*                                    name: 'Co-Writer',*/}
                {/*                                },*/}
                {/*                            ]}*/}
                {/*                            {...rest}*/}
                {/*                            label="Role"*/}
                {/*                        />*/}
                {/*                    ) : null*/}
                {/*                }*/}
                {/*            </FormDataConsumer>*/}
                {/*        </SimpleFormIterator>*/}
                {/*    </ArrayInput>*/}
                {/*)}*/}
            </SimpleFormConfigurable>
        </Create>
    );
};

export default ClientCreate;

const DependantInput = ({
                            dependency,
                            children,
                        }: {
    dependency: string;
    children: JSX.Element;
}) => {
    const dependencyValue = useWatch({name: dependency});

    return dependencyValue ? children : null;
};

const CreateUser = () => {
    const {filter, onCancel, onCreate} = useCreateSuggestionContext();
    const [value, setValue] = React.useState(filter || '');
    const [create] = useCreate();

    const handleSubmit = event => {
        event.preventDefault();
        create(
            'users',
            {
                data: {
                    name: value,
                },
            },
            {
                onSuccess: data => {
                    setValue('');
                    onCreate(data);
                },
            }
        );
    };

    return (
        <Dialog open onClose={onCancel}>
            <form onSubmit={handleSubmit}>
                <DialogContent>
                    <TextInput
                        source="name"
                        defaultValue="Slim Shady"
                        autoFocus
                        validate={[required()]}
                    />
                    <AutocompleteInput
                        source="role"
                        choices={[
                            {id: '', name: 'None'},
                            {id: 'admin', name: 'Admin'},
                            {id: 'user', name: 'User'},
                            {id: 'user_simple', name: 'UserSimple'},
                        ]}
                        validate={[required()]}
                    />
                </DialogContent>
                <DialogActions>
                    <Button type="submit">Save</Button>
                    <Button onClick={onCancel}>Cancel</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};
