import React from "react";
import { Drawer } from "antd";
const FilterDrawer = ({ visible, toggle, content }) => {
  return (
    <Drawer
      title="Filters"
      placement="right"
      onClose={toggle}
      visible={visible}
    >
      {content}
    </Drawer>
  );
};
export default FilterDrawer;
