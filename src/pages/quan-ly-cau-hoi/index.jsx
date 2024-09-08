import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, message, Spin, Input, Button, Select } from "antd"; // Import Input and Button
import {
  fetchQuestions,
  createQuestion,
  updateQuestion,
  getQuestionsRank,
  fetchPosition,
  deleteQuestion,
  getRandomQuestion,
} from "@redux/features/questionReducer/questionSlice";
import TableComponent from "@components/button-component/table-component";
import QuestionModal from "./component/QuestionModal";
import ButtonsComponent from "@components/button-component";

function QuestionManagement() {
  const dispatch = useDispatch();
  const {
    questions,
    isLoading,
    error,
    questionRanks,
    positions,
    randomQuestions,
  } = useSelector((state) => state.question);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [numberOfQuestions, setNumberOfQuestions] = useState(1); // New state for the number of random questions
  const [numberOfQuestions2, setNumberOfQuestions2] = useState(1); // New state for the number of random questions
  const [questionRankValue, setQuestionRankValue] = useState(0); // New state for the number of

  console.log("questionRankValue: " + questionRankValue);
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
    setEditingQuestion(null);
    setIsModalVisible(true);
  };

  const handleEdit = (record) => {
    setEditingQuestion({
      content: record.questionName,
      ...record,
    });
    setIsModalVisible(true);
  };

  const handleDelete = (id) => {
    dispatch(deleteQuestion(id))
      .then(() => {
        dispatch(fetchQuestions());
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
        ...values,
      };
      dispatch(updateQuestion(updateQuestionData))
        .then(() => {
          dispatch(fetchQuestions());
          message.success("Cập nhật câu hỏi thành công!");
        })
        .catch((err) => {
          message.error(err.message || "Failed to update question.");
        });
    } else {
      dispatch(createQuestion(values))
        .then(() => {
          dispatch(fetchQuestions());
          message.success("Thêm câu hỏi thành công!");
        })
        .catch((err) => {
          message.error(err.message || "Failed to create question.");
        });
    }
    setIsModalVisible(false);
  };

  const handleFetchRandomQuestion = () => {
    // Pass the number of questions as a parameter to the thunk
    dispatch(getRandomQuestion({ NumberOfQuestion: numberOfQuestions2 }))
      .then((result) => {
        if (result.payload && result.payload.length > 0) {
          message.info(
            `Random Questions: ${result.payload
              .map((q) => q.questionName)
              .join(", ")}`
          );
        }
      })
      .catch(() => {
        message.warning("Failed to fetch random questions.");
      });
  };

  const handleFetchRandomQuestionByRank = () => {
    // Pass the number of questions as a parameter to the thunk
    dispatch(getRandomQuestion({QuestionRank: questionRankValue ,numberOfQuestion: numberOfQuestions2 }))
      .then((result) => {
        if (result.payload && result.payload.length > 0) {
          message.info(
            `Random Questions: ${result.payload
              .map((q) => q.questionName)
              .join(", ")}`
          );
        }
      })
      .catch(() => {
        message.warning("Failed to fetch random questions.");
      });
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
        <ButtonsComponent
          buttons={[
            {
              label: "Sửa",
              onClick: () => handleEdit(record),
            },
            {
              label: "Xóa",
              onClick: () => handleDelete(record.questionId),
              danger: true,
            },
          ]}
        />
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
      <ButtonsComponent
        buttons={[
          {
            type: "primary",
            label: "Thêm Câu Hỏi",
            onClick: handleAdd,
            style: { marginBottom: 16 },
          },
        ]}
      />

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

      <div style={{display:"flex", justifyContent:"space-around"}}>
        <div style={{ marginBottom: 16 }}>
          <Input
            type="number"
            min={1}
            placeholder="Nhập số lượng câu hỏi ngẫu nhiên"
            value={numberOfQuestions}
            onChange={(e) => setNumberOfQuestions(Number(e.target.value))}
            style={{ width: 200, marginRight: 8 }}
          />
          <Button type="default" onClick={handleFetchRandomQuestion}>
            Lấy ngẫu nhiên câu hỏi
          </Button>
        </div>

        <div style={{ marginBottom: 16 }}>
          <Select onChange={(value) => setQuestionRankValue(value)} placeholder="Chọn độ khó">
            {questionRanks?.map((item) => (
              <Option key={item.value} value={item.value}>
                {item.rank}
              </Option>
            ))}
          </Select>
          <Input
            type="number"
            min={1}
            placeholder="Nhập số lượng câu hỏi ngẫu nhiên"
            value={numberOfQuestions2}
            onChange={(e) => setNumberOfQuestions2(Number(e.target.value))}
            style={{ width: 200, marginRight: 8 }}
          />
          <Button type="default" onClick={handleFetchRandomQuestionByRank}>
            Lấy câu hỏi ngẫu nhiên theo rank
          </Button>
        </div>
      </div>
    </div>
  );
}

export default QuestionManagement;
