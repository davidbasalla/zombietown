import React from "react";
import "react-tabs/style/react-tabs.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import MainMenu from "../MainMenu";
import PeopleMenu from "../PeopleMenu";
import ConquerForm from "../ConquerForm";
import EventScreen from "../EventScreen";

import styles from "./style.css";

const MenuContainer = () => {
  return (
    <div className="ui">
      <div className="menu">
        <Tabs>
          <TabList>
            <Tab>Main</Tab>
            <Tab>People</Tab>
          </TabList>

          <TabPanel>
            <MainMenu />
          </TabPanel>
          <TabPanel>
            <PeopleMenu />
          </TabPanel>
        </Tabs>
      </div>
      <ConquerForm />
      <EventScreen />
    </div>
  );
};

export default MenuContainer;
