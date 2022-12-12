import React from "react";
import { Card, Col, Row, Typography } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function AdminAnalayticsCard({ title, thumb, total }) {
  const { Title } = Typography;
  return (
    <Card bordered={false} className="criclebox ">
      <div className="number">
        <Row align="middle" gutter={[24, 0]}>
          <Col xs={18}>
            <span>{title}</span>
            <Title level={3}>{total || 0}</Title>
          </Col>
          <Col xs={6}>
            <div className="icon-box">
              <FontAwesomeIcon icon={thumb} />
            </div>
          </Col>
        </Row>
      </div>
    </Card>
  );
}

export default AdminAnalayticsCard;
