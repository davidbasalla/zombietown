import React from "react";
import "react-tabs/style/react-tabs.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import MainMenu from "../MainMenu";
import PeopleMenu from "../PeopleMenu";

import styles from "./style.css";

const MenuContainer = () => {
  return (
    <div className="ui">
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
  );
};

export default MenuContainer;
