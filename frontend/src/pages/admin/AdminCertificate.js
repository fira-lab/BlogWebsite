import React, { useEffect, useState } from "react";
import { Form, Input, message, Button, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { HideLoading, ShowLoading, reloadPortfolioData, addCertificate, updateCertificate, deleteCertificate } from "../../redux/rootSlice";
import Loader from "../../components/Loader";

const AdminCertificates = () => {
  const dispatch = useDispatch();
  const { portfolioData, isLoading } = useSelector((state) => state.root);
  const [isCertificateLoading, setIsCertificateLoading] = useState(false);

  const { certificates } = portfolioData || { certificates: [] };
  const [localCertificates, setLocalCertificates] = useState(certificates);
  
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [selectedItemForEdit, setSelectedItemForEdit] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(reloadPortfolioData());
  }, [dispatch]);

  useEffect(() => {
    setLocalCertificates(certificates);
  }, [certificates]);

  const onFinish = async (values) => {
    setIsCertificateLoading(true);
    dispatch(ShowLoading());
    try {
      if (selectedItemForEdit) {
        const response = await dispatch(updateCertificate({ ...values, _id: selectedItemForEdit._id })).unwrap();
        const updatedCertificates = localCertificates.map((cert) =>
          cert._id === selectedItemForEdit._id ? response.data : cert
        );
        setLocalCertificates(updatedCertificates);
        message.success('Certificate updated successfully!');
      } else {
        const response = await dispatch(addCertificate(values)).unwrap();
        setLocalCertificates([...localCertificates, response.data]);
        message.success('Certificate added successfully!');
      }

      dispatch(reloadPortfolioData());
      setShowAddEditModal(false);
      form.resetFields();
    } catch (error) {
      message.error('Failed to process certificate. Please try again.');
    } finally {
      setIsCertificateLoading(false);
      dispatch(HideLoading());
    }
  };

  const handleEdit = (item) => {
    setSelectedItemForEdit(item);
    form.setFieldsValue(item);
    setShowAddEditModal(true);
  };

  const onDelete = async (item) => {
    setIsCertificateLoading(true);
    dispatch(ShowLoading());
    try {
      await dispatch(deleteCertificate(item._id)).unwrap();
      const updatedCertificates = localCertificates.filter(cert => cert._id !== item._id);
      setLocalCertificates(updatedCertificates);
      message.success('Certificate deleted successfully');
    } catch (error) {
      message.error('Failed to delete certificate. Please try again.');
    } finally {
      setIsCertificateLoading(false);
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
      {(isLoading || isCertificateLoading) && <Loader />}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl text-white">Certificates</h1>
        <button
          onClick={handleAdd}
          className="bg-primary px-4 py-2 text-white text-xl"
        >
          Add Certificate
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 text-white text-xl">
        {localCertificates.map((certificate) => (
          <div key={certificate._id} className="shadow-xl border-2 shiny-border p-5 rounded-lg transition-transform transform hover:scale-105 duration-500">
            <h1 className="text-secondary text-2xl font-bold">{certificate.title}</h1>
            <img src={certificate.image} alt={certificate.title} className="w-full h-auto" />
            <p className="text-base">{certificate.description}</p>
            <p className="text-blue-400"><a href={certificate.link} target="_blank" rel="noopener noreferrer">View Certificate</a></p>
            <div className="space-x-3 mt-3">
              <button
                className="bg-red-500 px-3 py-1 text-white rounded-md"
                onClick={() => onDelete(certificate)}
              >
                Delete
              </button>
              <button
                onClick={() => handleEdit(certificate)}
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
        title={selectedItemForEdit ? "Edit Certificate" : "Add Certificate"}
        onCancel={() => setShowAddEditModal(false)}
        footer={null}
        centered
      >
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Form.Item name="title" label="Title" rules={[{ required: true, message: "Please enter the title" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description" rules={[{ required: true, message: "Please enter the description" }]}>
            <Input.TextArea />
          </Form.Item>
          <Form.Item name="image" label="Image Link">
            <Input />
          </Form.Item>
          <Form.Item name="link" label="Certificate Link">
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

export default AdminCertificates;
