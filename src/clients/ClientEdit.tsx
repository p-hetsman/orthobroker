import * as React from 'react';
import {RichTextInput} from 'ra-input-rich-text';
import {
    TopToolbar,
    AutocompleteInput,
    ArrayInput,
    BooleanInput,
    CheckboxGroupInput,
    Datagrid,
    DateField,
    DateInput,
    Edit,
    CloneButton,
    CreateButton,
    ShowButton,
    EditButton,
    ImageField,
    ImageInput,
    NumberInput,
    ReferenceManyField,
    ReferenceManyCount,
    ReferenceInput,
    SelectInput,
    SimpleFormIterator,
    TabbedForm,
    TextField,
    TextInput,
    minValue,
    number,
    required,
    FormDataConsumer,
    useCreateSuggestionContext,
    EditActionsProps,
    usePermissions, Form, SaveButton,
} from 'react-admin'; // eslint-disable-line import/no-unresolved
import {
    Box,
    BoxProps,
    Button, Card,
    Dialog,
    DialogActions,
    DialogContent,
    TextField as MuiTextField,
} from '@mui/material';
import PostTitle from './ClientTitle';

const CreateCategory = ({
                            onAddChoice,
                        }: {
    onAddChoice: (record: any) => void;
}) => {
    const {filter, onCancel, onCreate} = useCreateSuggestionContext();
    const [value, setValue] = React.useState(filter || '');
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const choice = {name: value, id: value.toLowerCase()};
        onAddChoice(choice);
        onCreate(choice);
        setValue('');
        return false;
    };
    return (
        <Dialog open onClose={onCancel}>
            <form onSubmit={handleSubmit}>
                <DialogContent>
                    <MuiTextField
                        label="New Category"
                        value={value}
                        onChange={event => setValue(event.target.value)}
                        autoFocus
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

const EditActions = ({hasShow}: EditActionsProps) => (
    <TopToolbar>
        {/*<CloneButton className="button-clone" />*/}
        {/*{hasShow && <ShowButton />}*/}
        {/* FIXME: added because react-router HashHistory cannot block navigation induced by address bar changes */}
        {/*<CreateButton />*/}
    </TopToolbar>
);

const SanitizedBox = ({
                          // eslint-disable-next-line @typescript-eslint/no-unused-vars
                          fullWidth,
                          ...props
                      }: BoxProps & { fullWidth?: boolean }) => <Box {...props} />;

const categories = [
    {name: 'Tech', id: 'tech'},
    {name: 'Lifestyle', id: 'lifestyle'},
];

const ClientEdit = () => {
    const {permissions} = usePermissions();
    return (
        <Edit title={<PostTitle/>} actions={<EditActions/>}>
            <Form>
                <SanitizedBox
                    display="flex"
                    padding={'20px'}
                    flexDirection="column"
                    width="50%"
                    justifyContent="space-between"
                    fullWidth

                >
                    <TextInput
                        source="firstName"
                        validate={required()}
                    />
                    <TextInput
                        source="lastName"
                        validate={required()}
                    />
                    <TextInput
                        source="initials"
                        validate={required()}
                    />
                    <TextInput
                        source="email"
                        validate={required()}
                    />
                    <TextInput
                        source="notes"
                        multiline
                    />
                    <TextInput
                        source="clientId"
                        label={'Orthobroker client ID'}
                        multiline
                    />
                </SanitizedBox>
                <SanitizedBox padding={'20px'} display={'flex'} justifyContent={'space-between'} width="50%">
                    <ShowButton label={'Cancel'} icon={null}/>
                    <SaveButton/>
                </SanitizedBox>
            </Form>
        </Edit>
    );
};

export default ClientEdit;
