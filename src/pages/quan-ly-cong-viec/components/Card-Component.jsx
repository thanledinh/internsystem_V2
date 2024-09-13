import React, { useState, useEffect } from "react";
import { Card, Button, Row, Col, Pagination } from "antd";
import { FileTextOutlined } from "@ant-design/icons";
import Meta from "antd/es/card/Meta";
import { useSelector, useDispatch } from "react-redux";
import { fetchJobs } from "../../../redux/features/job-reducer/jobSlice";
import { useNavigate } from 'react-router-dom';

const CustomCard = () => {
  const { jobs, status, error } = useSelector((state) => state.job);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6; // 6 cards per page

  // Calculate the starting and ending indices of the jobs for the current page
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleShowQuestions = (id, name) => {
    navigate(`/job-management/${id}?name=${encodeURIComponent(name)}`);
  };

  return (
    <div>
      <Row gutter={[16, 16]} style={{ padding: "20px" }}>
        {jobs.slice(startIndex, endIndex).map((item, index) => (
          <Col key={index} xs={24} sm={12} md={8} lg={8}> {/* Keep 3 cards per row */}
            <div style={{ display: 'flex', justifyContent: 'center' }}> {/* Center the card */}
              <Card
                hoverable
                cover={
                  <div
                    style={{
                      backgroundImage: `url(${item.image || "https://via.placeholder.com/300x150?text=null"})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      height: "120px",
                    }}
                  ></div>
                }
                style={{
                  borderRadius: "15px",
                  overflow: "hidden",
                  textAlign: "center",
                  position: "relative",
                  minHeight: "150px",
                  paddingBottom: "40px",
                  maxWidth: "290px",  // Adjust the width of the card to make it smaller
                  width: "100%",       // Ensure the card is responsive
                }}
              >
                <Meta title={item.name} style={{ paddingBottom: "10px" }} />
                <Button
                  type="text"
                  icon={<FileTextOutlined />}
                  onClick={() => handleShowQuestions(item.id, item.name)}
                  style={{
                    color: "#aaa",
                    fontWeight: "500",
                    position: "absolute",
                    bottom: "20px",
                    right: "5px",
                    fontSize: "12px",
                  }}
                >
                  Show Questions
                </Button>
              </Card>
            </div>
          </Col>
        ))}
      </Row>

      {/* Pagination Component */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={jobs.length} // Total number of jobs
          onChange={handlePageChange}
          showSizeChanger={false} // Hide page size changer
        />
      </div>
    </div>
  );
};

export default CustomCard;
