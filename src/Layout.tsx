import {
    AppBar,
    Layout,
    TitlePortal,
    LayoutProps,
} from "react-admin";
import { JSX } from "react/jsx-runtime";
import logo from './logo.png'


const MyAppBar = () => (
    <AppBar>
        <TitlePortal />
        <div style={{ display: 'flex', flex: 1 }}>
            <img src={logo} height={30} style={{ marginRight: 10 }} />
        </div>
    </AppBar>
);

export default (props: JSX.IntrinsicAttributes & LayoutProps) => (
    <>
        <Layout {...props} appBar={MyAppBar} />
    </>
);
