import React, { useState, useEffect } from "react";
import { Form, Input, message, Button, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { HideLoading, ShowLoading, reloadPortfolioData, addProject, updateProject, deleteProject } from "../../redux/rootSlice";
import Loader from "../../components/Loader";

const AdminProjects = () => {
  const dispatch = useDispatch();
  const { portfolioData, isLoading } = useSelector((state) => state.root);
  const [isProjectLoading, setIsProjectLoading] = useState(false);

  const { projects } = portfolioData || { projects: [] };
  const [localProject, setLocalProject] = useState(projects);
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [selectedItemForEdit, setSelectedItemForEdit] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(reloadPortfolioData());
  }, [dispatch]);

  useEffect(() => {
    setLocalProject(projects);
  }, [projects]);

  const onFinish = async (values) => {
    setIsProjectLoading(true);
    dispatch(ShowLoading());
    try {
      let response;
      if (selectedItemForEdit) {
        // Update existing project
        await dispatch(updateProject({ ...values, _id: selectedItemForEdit._id })).unwrap();
        const updatedProject = localProject.map((proj) =>
          proj._id === selectedItemForEdit._id ? { ...values, _id: selectedItemForEdit._id } : proj
        );
        setLocalProject(updatedProject);
        message.success('Project updated successfully!');
      } else {
        // Add new project
        await dispatch(addProject(values)).unwrap();
        setLocalProject([...localProject, values]);
        message.success('Project added successfully!');
      }

      dispatch(reloadPortfolioData());
      setShowAddEditModal(false);
      form.resetFields();
    } catch (error) {
      message.error('Failed to save project. Please try again.');
    } finally {
      setIsProjectLoading(false);
      dispatch(HideLoading());
    }
  };

  const onDelete = async (project) => {
    setIsProjectLoading(true);
    dispatch(ShowLoading());
    try {
      await dispatch(deleteProject(project._id));
      const updatedProject = localProject.filter(
        (proj) => proj._id !== project._id
      );
      setLocalProject(updatedProject);
      message.success('Project deleted successfully');
      dispatch(reloadPortfolioData());
    } catch (error) {
      message.error('Failed to delete project. Please try again.');
    } finally {
      setIsProjectLoading(false);
      dispatch(HideLoading());
    }
  };

  const handleEdit = (project) => {
    setSelectedItemForEdit(project);
    form.setFieldsValue(project);
    setShowAddEditModal(true);
  };

  const handleAdd = () => {
    setSelectedItemForEdit(null);
    setShowAddEditModal(true);
    form.resetFields();
  };

  return (
    <div className="p-2 mx-auto max-w-screen-md sm:max-w-full sm:w-40 sm:px-4">
      {(isLoading || isProjectLoading) && <Loader />}

      <div className="flex justify-end mb-3 w-full sm:flex-col sm:px-2">
        <button
          className="bg-primary px-3 py-2 text-white text-base sm:text-lg lg:text-2xl"
          onClick={handleAdd}
        >
          Add project
        </button>
      </div>
      <div className="grid gap-5 text-white text-base sm:text-lg lg:text-xl sm:flex sm:flex-col md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {localProject.map((project, index) => (
          <div key={index} className="shadow border-2 shiny-border p-4 sm:p-2 w-full mb-5 md:mb-0">
            <h1 className="text-secondary text-xl sm:text-lg font-bold mb-3">
              {project.period}
            </h1>
            <img src={project.image} alt={project.title} className="w-full h-auto mb-3" />
            <div className="space-y-2 sm:space-y-1">
              <p>Role: {project.title}</p>
              <p className="text-base">{project.description}</p>
              <p className="text-base font-poppins text-blue-400">videoUrl: {project.videoUrl}</p>
              <p className="text-secondary font-poppins">Technologies: {project.technologies}</p>
              <p>{project.link}</p>
              <p className="text-base text-blue-400">proLink: {project.proLink} </p>
            </div>
            <div className="flex sm:flex-col sm:space-y-2 space-x-3">
              <button
                className="bg-red-500 px-3 py-1 text-white"
                onClick={() => onDelete(project)}
              >
                Delete
              </button>
              <button
                onClick={() => handleEdit(project)}
                className="bg-green-500 px-3 py-1 text-white"
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal
        visible={showAddEditModal}
        title={selectedItemForEdit ? "Edit project" : "Add project"}
        footer={null}
        onCancel={() => setShowAddEditModal(false)}
      >
        <Form layout="vertical" onFinish={onFinish} form={form}>
          <Form.Item
            name="title"
            label={<span className="text-secondary">Title</span>}
            rules={[{ required: true, message: "Please enter the title" }]}
          >
            <Input placeholder="Title" />
          </Form.Item>
          <Form.Item
            name="description"
            label={<span className="text-secondary">Description</span>}
            rules={[{ required: true, message: "Please enter the description" }]}
          >
            <Input placeholder="Description" />
          </Form.Item>
          <Form.Item
            name="image"
            label={<span className="text-secondary">Image</span>}
          >
            <Input placeholder="Image URL" />
          </Form.Item>
          <Form.Item
            name="technologies"
            label={<span className="text-secondary">Technologies</span>}
            rules={[{ required: true, message: "Please enter the technologies" }]}
          >
            <Input placeholder="Technologies" />
          </Form.Item>
          <Form.Item
            name="videoUrl"
            label={<span className="text-secondary">Video URL</span>}
            rules={[{ required: true, message: "Please enter the video URL" }]}
          >
            <Input placeholder="Video URL" />
          </Form.Item>
          <Form.Item
            name="proLink"
            label={<span className="text-secondary">Project Link</span>}
            rules={[{ required: true, message: "Please enter the project link" }]}
          >
            <Input placeholder="Project Link" />
          </Form.Item>
          <div className="flex justify-end">
            <Button
              onClick={() => setShowAddEditModal(false)}
              className="mr-2"
            >
              Cancel
            </Button>
            <Button type="primary" htmlType="submit" className="bg-primary w-full">
            {selectedItemForEdit ? "Update" : "Add"}
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminProjects;
