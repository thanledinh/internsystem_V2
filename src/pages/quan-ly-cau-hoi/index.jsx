import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Button, Space, message, Spin } from "antd";
import {
  fetchQuestions,
  createQuestion,
  updateQuestion,
  getQuestionsRank,
  fetchPosition,
  deleteQuestion,
} from "@redux/features/questionReducer/questionSlice";
import TableComponent from "@components/button-component/table-component";
import QuestionModal from "./component/QuestionModal";

function QuestionManagement() {
  const dispatch = useDispatch();
  const { questions, isLoading, error, questionRanks, positions } = useSelector(
    (state) => state.question
  );
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  useEffect(() => {
    dispatch(fetchQuestions());
    dispatch(getQuestionsRank());
    dispatch(fetchPosition());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      message.error(error.message || "Failed to load questions.");
    }
  }, [error]);

  const handleAdd = () => {
    setEditingQuestion({});
    setIsModalVisible(true);
  };

  const handleEdit = (record) => {
    setEditingQuestion({
      questionId: record.questionId,
      questionName: record.questionName,
      questionRank: record.questionRank,
      positionId: record.positionId,
    });
    setIsModalVisible(true);
  };

  const handleDelete = (id) => {
    dispatch(deleteQuestion(id))
      .then(() => {
        dispatch(fetchQuestions()); // Fetch lại dữ liệu sau khi xóa
        message.success("Xóa câu hỏi thành công!");
      })
      .catch((err) => {
        message.error(err.message || "Failed to delete question.");
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = (values) => {
    if (editingQuestion) {
      const updateQuestionData = {
        questionId: editingQuestion.questionId,
        ...values
      };
      dispatch(updateQuestion(updateQuestionData))
        .then(() => {
          dispatch(fetchQuestions()); // Fetch lại dữ liệu sau khi cập nhật
          message.success("Cập nhật câu hỏi thành công!");
        })
        .catch((err) => {
          message.error(err.message || "Failed to update question.");
        });
    } else {
      dispatch(createQuestion(values))
        .then(() => {
          dispatch(fetchQuestions()); // Fetch lại dữ liệu sau khi thêm
          message.success("Thêm câu hỏi thành công!");
        })
        .catch((err) => {
          message.error(err.message || "Failed to create question.");
        });
    }
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: "Câu hỏi",
      dataIndex: "questionName",
      key: "questionName",
    },
    {
      title: "Độ khó",
      dataIndex: "questionRank",
      key: "questionRank",
    },
    {
      title: "Người tạo",
      dataIndex: "createByName",
      key: "createByName",
    },
    {
      title: "Vị trí",
      dataIndex: "possitionName",
      key: "possitionName",
    },
    {
      title: "Hành động",
      key: "actions",
      render: (text, record) => (
        <Space size="middle">
          <Button onClick={() => handleEdit(record)}>Sửa</Button>
          <Button danger onClick={() => handleDelete(record.questionId)}>
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  const questionsWithKeys = questions.map((question, index) => ({
    ...question,
    key: index + 1,
  }));

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div>
      <Button type="primary" onClick={handleAdd} style={{ marginBottom: 16 }}>
        Thêm Câu Hỏi
      </Button>
      <TableComponent
        columns={columns}
        dataSource={questionsWithKeys}
        rowKey="questionId"
        loading={isLoading}
        pagination={{ pageSize: 5 }}
        selectedRowKeys={selectedRowKeys}
        setSelectedRowKeys={setSelectedRowKeys}
      />
      <QuestionModal
        visible={isModalVisible}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
        initialValues={editingQuestion}
        questionRanks={questionRanks}
        positions={positions?.items}
      />
    </div>
  );
}

export default QuestionManagement;
