import React from "react";
import { Table, Card, Typography, Button } from "antd";
import { FilterFilled } from "@ant-design/icons";
const { Title } = Typography;
function AdminDataTable({
  title = "",
  sendPush,
  data,
  columns,
  pagination,
}) {

  const filteredData = data?.map((item, index) => {
    return { ...item, key: index + 1 };
  });
  return (
    <Card
      bordered={false}
      className="criclebox cardbody "
      style={{ minHeight: 360 }}
    >
      <div className="project-ant">
        <Title level={5}>{title}</Title>
        <div>
          <Button className="filter-btn" onClick={sendPush}>
            Send Push Notification
          </Button>
        </div>
      </div>
      <div className="ant-list-box ">
        <Table
          columns={columns}
          dataSource={filteredData}
          pagination={{ showSizeChanger: false, ...pagination }}
        />
      </div>
    </Card>
  );
}

export default AdminDataTable;
