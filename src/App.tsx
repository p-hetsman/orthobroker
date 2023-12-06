import { Admin, Resource, CustomRoutes } from "react-admin"; // eslint-disable-line import/no-unresolved
import { Route } from "react-router-dom";

import authProvider from "./authProvider";
import comments from "./comments";
import CustomRouteLayout from "./customRouteLayout";
import CustomRouteNoLayout from "./customRouteNoLayout";
import dataProvider from "./dataProvider";
import i18nProvider from "./i18nProvider";
import Layout from "./Layout";
import "./App.css";

import tags from "./tags";
import posts from "./posts";
import users from "./users";
import events from "./events";
import productTemplates from "./product-templates"
import analytics from "./analytics";
import contacts from "./contacts";
import contactUs from "./contactUs";
import inProgress from "./inProgress";
import designs from "./designs"
import theme from "./Theme";

export const App = () => (
  <Admin
    authProvider={authProvider}
    dataProvider={dataProvider}
    i18nProvider={i18nProvider}
    title="Orthobroker"
    layout={Layout}
    theme={theme}
  >
    <CustomRoutes noLayout>
      <Route
        path="/custom"
        element={<CustomRouteNoLayout title="Posts from /custom" />}
      />
    </CustomRoutes>
    <Resource name="templates" options={{ label: 'Product Templates' }} {...productTemplates} />
    <Resource name="clients" {...inProgress} />
    <Resource name="Measurement_data" {...inProgress} />
    <Resource name="designs" {...designs} options={{ label: 'Designs' }} />
    <Resource name="orders" {...inProgress} />

    {/*     <Resource name="events" {...events} />
    <Resource name="contacts" {...contacts} />
    <Resource name="posts" {...posts} />
    <Resource name="comments" {...comments} />
    <Resource name="tags" {...tags} />
    <Resource name="analytics" {...analytics} />
    <Resource name="contactUs" options={{
      label: "Contact Us",
    }} {...contactUs} /> */}
    {(permissions) => (
      <>
        {permissions ? <Resource name="users" {...users} /> : null}
        <CustomRoutes noLayout>
          <Route
            path="/custom1"
            element={<CustomRouteNoLayout title="Posts from /custom1" />}
          />
        </CustomRoutes>
        <CustomRoutes>
          <Route
            path="/custom2"
            element={<CustomRouteLayout title="Posts from /custom2" />}
          />
        </CustomRoutes>
      </>
    )}
    <CustomRoutes>
      <Route
        path="/custom3"
        element={<CustomRouteLayout title="Posts from /custom3" />}
      />
    </CustomRoutes>
  </Admin>
);
