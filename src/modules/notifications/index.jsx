import React, { useEffect, useState, useContext } from "react";
import {
  Col,
  Row,
  Form,
  Input,
  Button,
  Select,
} from "antd";
import moment from "moment";
import AdminDataTable from "../../Layouts/partials/data-table";
import { NotificationContext } from "../../context/NotificationContext";
import { getFormattedDateTime, getFormattedDate } from "../../utils";
import FilterDrawer from "../../components/filterDrawer";
import { ScaleLoader } from "react-spinners";

function Notifications() {
  const { getNotifications, getUsers, users, notifications, sendNotifications } = useContext(NotificationContext);
  const [isLoading, setLoading] = useState(false);
  const [filteredData, setFilteredData] = useState(null);
  const [isFilterOpen, setFilterOpen] = useState(false);
  const [page, setPage] = useState(1);
  const { data } = notifications;
  const paginationConfig = {
    pageSize: 1000,//meta?.per_page,
    total: 1000//meta?.total,
  };

  const [form] = Form.useForm();
  const handleFormFinish = () => {
    const credentials = form.getFieldsValue();
    setLoading(true);
    credentials.recipient_email = credentials.recipient_email.map((m) => {
      return users.find(f=>f.id === m)
    })
    sendNotifications(credentials, (res) => {
      setLoading(false);
      if (res.length > 0) {
        setLoading(true);
        getNotifications(() => {
          handleResetForm();
          setLoading(false)
          setFilterOpen(false);
        });
      }
    });
  };

  const handleResetForm = () => {
    form.resetFields();
    setFilteredData(null);
    form.setFieldsValue({
      title: undefined,
      body: undefined,
      recipient_email: undefined
    });
    setFilterOpen(false);
  };

  useEffect(() => {
    setLoading(true)
    getUsers();
    getNotifications(() => {
      setLoading(false)
    });
  }, [page])

  const drawerSec = () => (
    <Form
      form={form}
      className="form"
      initialValues={filteredData}
      onFinish={handleFormFinish}
    >
      <label className="form-lbl">Title:</label>
      <Form.Item 
        name={"title"} 
        rules={[
          {
            required: true,
            message: "Title can't be empty",
          },
        ]}>
        <Input
          name="title"
          placeholder="Enter Message Title"
          className="form-input"
        />
      </Form.Item>
      <label className="form-lbl">Body:</label>
      <Form.Item 
        name={"body"}
        rules={[
          {
            required: true,
            message: "Body can't be empty",
          },
        ]}>
        <Input
          name="body"
          placeholder="Enter Message Body"
          className="form-input"
        />
      </Form.Item>
      <label className="form-lbl">Recipient:</label>
      <Form.Item 
        name={"recipient_email"}
        rules={[
          {
            required: true,
            message: "Recipient can't be empty",
          },
        ]}>
        <Select
          mode="multiple"
          allowClear
          placeholder="Select Recipient"
          name="recipient_email"
          className="form-select"
          showSearch
          filterOption={(input, option) =>
            option.children.toLowerCase().includes(input.toLowerCase())
          }
        >
          {users.map((data, index) => (
            <Select.Option value={data.id} key={index}>
              {data.email}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item>
        <Button
          htmlType="submit"
          disabled={isLoading}
          className="form-btn"
          style={{ minWidth: "100%" }}
        >
          {isLoading ? (
            <ScaleLoader
              color={"#FFF"}
              loading={isLoading}
              height={14}
              width={2}
            />
          ) : (
            "Send"
          )}
        </Button>
      </Form.Item>
    </Form>
  );

  const columns = [
    {
      title: "No",
      dataIndex: "No",
      key: "1",
      render: (data, value, i) => (
        <b>{(page == 1 ? 0 : (page - 1) * 10) + (i + 1)}</b>
      ),
    },
    {
      title: "Recipient ID",
      dataIndex: "",
      key: "2",
      sorter: (a, b) => a.recipient_id.localeCompare(b.recipient_id),
      render: (data, value) => {
        return (
          <span>
            {data?.recipient_id}
          </span>
        );
      },
    },
    {
      title: "Recipient Email",
      dataIndex: "",
      key: "3",
      sorter: (a, b) => a.recipient_email.localeCompare(b.recipient_email),
      render: (data, value) => {
        return (
          <span>
            {data?.recipient_email}
          </span>
        );
      },
    },
    {
      title: "Title",
      dataIndex: "",
      key: "4",
      sorter: (a, b) => a.title.localeCompare(b.title),
      render: (data, value) => {
        return (
          <span>
            {data?.title}
          </span>
        );
      },
    },
    {
      title: "Body",
      dataIndex: "",
      key: "5",
      sorter: (a, b) => a.body.localeCompare(b.body),
      render: (data, value) => {
        return (
          <span>
            {data?.body}
          </span>
        );
      },
    },
    {
      title: "Timestamp",
      dataIndex: "",
      key: "6",
      sorter: (a, b) =>
        moment(new Date(data?.datetime.seconds*1000)).unix() - moment(new Date(data?.datetime.seconds*1000)).unix(),
      render: (data, value) => {
        return <span>{getFormattedDateTime(new Date(data?.datetime.seconds*1000))}</span>;
      },
    },
  ];

  //HANDLERS

  const handlePageChange = (page, pageSize) => {
    setPage(page);
  };

  const filterHandler = () => {
    setFilterOpen(!isFilterOpen);
  };

  return (
    <>
      <div className="layout-content">
        <Row gutter={[24, 0]}>
          <Col xs={24} sm={24} md={24} lg={24} xl={24} className="mb-24">
            <AdminDataTable
              title="Notifications"
              sendPush={filterHandler}
              data={data}
              columns={columns}
              pagination={{ ...paginationConfig, onChange: handlePageChange }}
            />
          </Col>
        </Row>
      </div>
      <FilterDrawer
        visible={isFilterOpen}
        toggle={filterHandler}
        content={drawerSec()}
      />
    </>
  );
}

export default Notifications;
