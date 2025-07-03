import React, { useState, useEffect } from "react";
import { Form, Input, message, Button, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { HideLoading, ShowLoading, reloadPortfolioData, addExperience, updateExperience, deleteExperience } from "../../redux/rootSlice";
import Loader from "../../components/Loader";

const AdminExperience = () => {
  const dispatch = useDispatch();
  const { portfolioData, isLoading } = useSelector((state) => state.root);
  const [isLocalLoading, setIsLocalLoading] = useState(false);

  const { experiences } = portfolioData || { experiences: [] };
  const [localExperiences, setLocalExperiences] = useState(experiences);

  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [selectedItemForEdit, setSelectedItemForEdit] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(reloadPortfolioData());
  }, [dispatch]);

  useEffect(() => {
    setLocalExperiences(experiences);
  }, [experiences]);

  const onFinish = async (values) => {
    setIsLocalLoading(true);
    dispatch(ShowLoading());
    try {
      if (selectedItemForEdit) {
        await dispatch(updateExperience({ ...values, _id: selectedItemForEdit._id }));
        const updatedExperiences = localExperiences.map((exp) =>
          exp._id === selectedItemForEdit._id ? { ...values, _id: selectedItemForEdit._id } : exp
        );
        setLocalExperiences(updatedExperiences);
      } else {
        await dispatch(addExperience(values));
        setLocalExperiences([...localExperiences, values]);
      }

      message.success('Experience updated successfully!');
      dispatch(reloadPortfolioData());
      setShowAddEditModal(false);
      form.resetFields();
    } catch (error) {
      message.error('Failed to update experience. Please try again.');
    } finally {
      setIsLocalLoading(false);
      dispatch(HideLoading());
    }
  };

  const handleEdit = (item) => {
    setSelectedItemForEdit(item);
    form.setFieldsValue(item);
    setShowAddEditModal(true);
  };

  const onDelete = async (item) => {
    setIsLocalLoading(true);
    dispatch(ShowLoading());
    try {
      await dispatch(deleteExperience(item._id));
      const updatedExperiences = localExperiences.filter(
        (exp) => exp._id !== item._id
      );
      setLocalExperiences(updatedExperiences);
      message.success('Experience deleted successfully');
    } catch (error) {
      message.error('Failed to delete experience. Please try again.');
    } finally {
      setIsLocalLoading(false);
      dispatch(HideLoading());
    }
  };

  const handleAdd = () => {
    setSelectedItemForEdit(null);
    setShowAddEditModal(true);
    form.resetFields();
  };

  return (
    <div className="space-y-5">
      {(isLoading || isLocalLoading) && <Loader />}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl text-white">Experience</h1>
        <button
          onClick={handleAdd}
          className="bg-primary px-1 py-1 text-white text-2xl"
        >
          Add Experience
        </button>
      </div>
      <div className="grid grid-cols-4 gap-5 text-white text-xl">
        {localExperiences.map((experience) => (
          <div key={experience._id} className="shadow-xl border-2 shiny-border p-5 rounded-lg transition-transform transform hover:scale-105 duration-500">
            <h1 className="text-secondary text-2xl font-bold">
              {experience.period}
            </h1>
            <p>Company: {experience.company}</p>
            <p>Role: {experience.title}</p>
            <p className="text-base">{experience.description}</p>
            <p className="text-base text-blue-400">{experience.link}</p>
            <div className="space-x-3">
              <button
                className="bg-red-500 px-3 py-1 text-white rounded-md"
                onClick={() => onDelete(experience)}
              >
                Delete
              </button>
              <button
                onClick={() => handleEdit(experience)}
                className="bg-green-500 px-3 py-1 text-white rounded-md"
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal
        visible={showAddEditModal}
        title={selectedItemForEdit ? "Edit Experience" : "Add Experience"}
        onCancel={() => setShowAddEditModal(false)}
        footer={null}
        centered
      >
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Form.Item name="period" label="Period" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="company" label="Company" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="title" label="Title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description" rules={[{ required: true }]}>
            <Input.TextArea />
          </Form.Item>
          <Form.Item name="link" label="Link">
            <Input />
          </Form.Item>
          <Button type="primary" htmlType="submit" className="bg-primary w-full">
            {selectedItemForEdit ? "Update" : "Add"}
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminExperience;
