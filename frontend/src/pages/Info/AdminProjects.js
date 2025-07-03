import React, { useState, useEffect } from "react";
import { Form, Input, message, Button, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import {
  addProject,
  deleteProject,
  getData,
  HideLoading,
  reloadPortfolioData,
  ShowLoading,
  updateProject,
} from "../../redux/features/auth/authSlice";
import Header from "../../components/Header/Header";
import PageMenu from "../../components/pageMenu/PageMenu";
import Footer from "../../components/Footer/Footer";

const AdminProjects = () => {
  const dispatch = useDispatch();
  const { info, isLoading } = useSelector((state) => state.auth);
  const [isProjectLoading, setIsProjectLoading] = useState(false);
  const { projects } = info || { projects: [] };
  const [localProject, setLocalProject] = useState(projects);
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [selectedItemForEdit, setSelectedItemForEdit] = useState(null);
  const [form] = Form.useForm();
  const [links, setLinks] = useState([]); // State for managing links
  const [texts, setTexts] = useState([]); // State for managing texts

  useEffect(() => {
    dispatch(reloadPortfolioData());
    dispatch(getData());
  }, [dispatch]);

  useEffect(() => {
    setLocalProject(projects);
  }, [projects]);

  const onFinish = async (values) => {
    setIsProjectLoading(true);
    dispatch(ShowLoading());
    try {
      if (selectedItemForEdit) {
        await dispatch(
          updateProject({
            ...values,
            _id: selectedItemForEdit._id,
            links,
            texts,
          })
        ).unwrap();
        const updatedProject = localProject.map((proj) =>
          proj._id === selectedItemForEdit._id
            ? { ...values, _id: selectedItemForEdit._id, links, texts }
            : proj
        );
        setLocalProject(updatedProject);
        message.success("Content updated successfully!");
      } else {
        await dispatch(addProject({ ...values, links, texts })).unwrap();
        setLocalProject([{ ...values, links, texts }, ...localProject]);
        message.success("Content added successfully!");
      }
      dispatch(reloadPortfolioData());
      setShowAddEditModal(false);
      form.resetFields();
      setLinks([]); // Reset links after submission
      setTexts([]); // Reset texts after submission
    } catch (error) {
      message.error("Failed to save content. Please try again.");
    } finally {
      setIsProjectLoading(false);
      dispatch(HideLoading());
    }
  };

  const handleAddText = () => {
    setTexts([...texts, ""]);
  };

  const handleTextChange = (index, value) => {
    const newTexts = [...texts];
    newTexts[index] = value;
    setTexts(newTexts);
  };

  const handleDeleteText = (index) => {
    const newTexts = texts.filter((_, i) => i !== index);
    setTexts(newTexts);
  };

  const handleAddLink = () => {
    setLinks([...links, ""]);
  };

  const handleLinkChange = (index, value) => {
    const newLinks = [...links];
    newLinks[index] = value;
    setLinks(newLinks);
  };

  const handleDeleteLink = (index) => {
    const newLinks = links.filter((_, i) => i !== index);
    setLinks(newLinks);
  };

  const onDelete = (project) => {
    Modal.confirm({
      title: "Are you sure?",
      content: "This action is irreversible. Do you want to proceed?",
      okText: "Yes, Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: async () => {
        setIsProjectLoading(true);
        dispatch(ShowLoading());
        try {
          await dispatch(deleteProject(project._id));
          setLocalProject(
            localProject.filter((proj) => proj._id !== project._id)
          );
          message.success("Content deleted successfully!");
          dispatch(reloadPortfolioData());
        } catch (error) {
          message.error("Failed to delete project. Please try again.");
        } finally {
          setIsProjectLoading(false);
          dispatch(HideLoading());
        }
      },
    });
  };

  const handleEdit = (project) => {
    setSelectedItemForEdit(project);
    form.setFieldsValue(project);
    setLinks(project.links || []);
    setTexts(project.texts || []);
    setShowAddEditModal(true);
  };

  const handleAdd = () => {
    setSelectedItemForEdit(null);
    setShowAddEditModal(true);
    form.resetFields();
    setLinks([]);
    setTexts([]);
  };

  return (
    <div className="p-2 mx-auto max-w-screen-md sm:max-w-full sm:w-40 sm:px-4">
      {(isLoading || isProjectLoading) && <Loader />}

      <PageMenu />

      <div className="flex justify-end mb-3 w-full sm:flex-col sm:px-2">
        <button
          className="bg-primary px-3 py-2 text-white text-base sm:text-lg lg:text-2xl"
          onClick={handleAdd}
        >
          Add Content
        </button>
      </div>
      <div className="grid gap-5 text-white text-base sm:text-lg lg:text-xl sm:flex sm:flex-col md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {localProject.map((project, index) => (
          <div
            key={index}
            className="shadow border-2 shiny-border p-4 sm:p-2 w-full mb-5 md:mb-0"
          >
            <h1 className="text-secondary text-xl sm:text-lg font-bold mb-3">
              {project.period}
            </h1>
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-auto mb-3"
            />
            <div className="space-y-2 sm:space-y-1">
              <p>Role: {project.title}</p>
              <p className="text-base">{project.description}</p>
              <p className="text-base font-poppins text-blue-400">
                videoUrl: {project.videoUrl}
              </p>
              <p className="text-secondary font-poppins">
                Technologies: {project.technologies}
              </p>
              <p>{project.link}</p>
              <p className="text-base text-blue-400">
                proLink: {project.proLink}
              </p>
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
        title={selectedItemForEdit ? "Edit Content" : "Add Content"}
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
            rules={[
              { required: true, message: "Please enter the description" },
            ]}
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
          >
            <Input placeholder="Technologies" />
          </Form.Item>
          <Form.Item
            name="videoUrl"
            label={<span className="text-secondary">Video URL</span>}
          >
            <Input placeholder="Video URL" />
          </Form.Item>
          <Form.Item
            name="proLink"
            label={<span className="text-secondary">Content Link</span>}
            rules={[
              { required: true, message: "Please enter the project link" },
            ]}
          >
            <Input placeholder="Project Link" />
          </Form.Item>

          <h3 className="text-secondary">Links</h3>
          {links.map((link, index) => (
            <div key={index} className="flex items-center mb-2">
              <Input
                placeholder={`Link ${index + 1}`}
                value={link}
                onChange={(e) => handleLinkChange(index, e.target.value)}
                className="mr-2"
              />
              <Button
                type="primary"
                danger
                onClick={() => handleDeleteLink(index)}
              >
                Delete
              </Button>
            </div>
          ))}
          <Button type="dashed" onClick={handleAddLink}>
            Add Link
          </Button>

          <h3 className="text-secondary">Texts</h3>
          {texts.map((text, index) => (
            <div key={index} className="flex items-center mb-2">
              <Input
                placeholder={`Text ${index + 1}`}
                value={text}
                onChange={(e) => handleTextChange(index, e.target.value)}
                className="mr-2"
              />
              <Button
                type="primary"
                danger
                onClick={() => handleDeleteText(index)}
              >
                Delete
              </Button>
            </div>
          ))}
          <Button type="dashed" onClick={handleAddText}>
            Add Text
          </Button>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Footer />
    </div>
  );
};

export default AdminProjects;
