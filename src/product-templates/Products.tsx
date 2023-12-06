

import { Title } from 'react-admin';
import './products.css';
import TypeSearch from './ProductSearch'


export default () => {

    return (
        <>
            <Title defaultTitle={'Product templates'} />
            <div className='search'>
                <TypeSearch />
            </div>
        </>

    );
};
