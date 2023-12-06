import * as React from 'react';
import { useTranslate, useRecordContext } from 'react-admin';

export default () => {
    const translate = useTranslate();
    const record = useRecordContext();
    return (
        <>
            {record ? <span>{`${record.firstName} ${record.lastName}`} </span> : ''}
        </>
    );
};
