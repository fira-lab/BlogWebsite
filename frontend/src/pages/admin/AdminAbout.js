import React, { useState } from "react";
import { Form, Input, message, Button, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { HideLoading, ShowLoading, updateAboutData } from "../../redux/rootSlice";
import Loader from "../../components/Loader";

const AdminAbout = () => {
  const dispatch = useDispatch();
  const { portfolioData, isLoading } = useSelector((state) => state.root);
  const [isLocalLoading, setIsLocalLoading] = useState(false);

  console.log(portfolioData.about);

  const onFinish = async (values) => {
    setIsLocalLoading(true);
    dispatch(ShowLoading());
    try {
      const dataToUpdate = { ...values, _id: portfolioData.about._id };


      dispatch(updateAboutData(dataToUpdate));
      console.log("Updated Data:", dataToUpdate);
      message.success("Introduction data updated successfully!");
    } catch (error) {
      message.error(error.message);
    } finally {
      setIsLocalLoading(false);
      dispatch(HideLoading());
    }
  };

  return (
    <div className="px-40 text-white sm:w-80 sm:px-4 ">
      {isLoading || isLocalLoading ? <Loader /> : null}

      <Form
        onFinish={onFinish}
        layout="vertical"
        initialValues={portfolioData.about}
      >
        <Form.Item
          name="Mytitle"
          label={<span className="text-secondary font-poppins">Mytitle </span>}
        >
          <Input placeholder="Mytitle" />
        </Form.Item>
        <Form.Item
          name="description1"
          label={
            <span className="text-secondary font-poppins">Description 1</span>
          }
        >
          <Input placeholder="Description 1" />
        </Form.Item>
        <Form.Item
          name="description1A"
          label={
            <span className="text-secondary font-poppins">Description 1A</span>
          }
        >
          <Input placeholder="Description 1" />
        </Form.Item>
        <Form.Item
          name="description1B"
          label={
            <span className="text-secondary font-poppins">Description 1B</span>
          }
        >
          <Input placeholder="Description 1" />
        </Form.Item>
        <Form.Item
          name="description1C"
          label={
            <span className="text-secondary font-poppins">Description 1C</span>
          }
        >
          <Input placeholder="Description 1" />
        </Form.Item>
        <Form.Item
          name="description1D"
          label={
            <span className="text-secondary font-poppins">Description 1D</span>
          }
        >
          <Input placeholder="Description 1" />
        </Form.Item>
        <Form.Item
          name="span1A"
          label={
            <span className="text-secondary font-poppins">span1A</span>
          }
        >
          <Input placeholder="Description 1" />
        </Form.Item>
        <Form.Item
          name="span1B"
          label={
            <span className="text-secondary font-poppins">span1B</span>
          }
        >
          <Input placeholder="Description 1" />
        </Form.Item>
        <Form.Item
          name="span1C"
          label={
            <span className="text-secondary font-poppins">span1C</span>
          }
        >
          <Input placeholder="Description 1" />
        </Form.Item>
        <Form.Item
          name="span1D"
          label={
            <span className="text-secondary font-poppins">span1D</span>
          }
        >
          <Input placeholder="Description 1" />
        </Form.Item>

        <Form.Item
          name="description2"
          label={
            <span className="text-secondary font-poppins">Description 2</span>
          }
        >
          <Input placeholder="Description 2" />
        </Form.Item>
        <Form.Item
          name="description2A"
          label={
            <span className="text-secondary font-poppins">Description 2A</span>
          }
        >
          <Input placeholder="Description 2" />
        </Form.Item>
        <Form.Item
          name="description2B"
          label={
            <span className="text-secondary font-poppins">Description 2B</span>
          }
        >
          <Input placeholder="Description 2" />
        </Form.Item>
        <Form.Item
          name="description2C"
          label={
            <span className="text-secondary font-poppins">Description 2C</span>
          }
        >
          <Input placeholder="Description 2" />
        </Form.Item>
        <Form.Item
          name="description2D"
          label={
            <span className="text-secondary font-poppins">Description 2D</span>
          }
        >
          <Input placeholder="Description 2" />
        </Form.Item>
        <Form.Item
          name="span2A"
          label={
            <span className="text-secondary font-poppins">span2A</span>
          }
        >
          <Input placeholder="Description 2" />
        </Form.Item>
        <Form.Item
          name="span2B"
          label={
            <span className="text-secondary font-poppins">span2B</span>
          }
        >
          <Input placeholder="Description 2" />
        </Form.Item>
        <Form.Item
          name="span2C"
          label={
            <span className="text-secondary font-poppins">span2C</span>
          }
        >
          <Input placeholder="Description 2" />
        </Form.Item>
        <Form.Item
          name="span2D"
          label={
            <span className="text-secondary font-poppins">span2D</span>
          }
        >
          <Input placeholder="Description 2" />
        </Form.Item>
        <Form.Item
          name="chatbotId"
          label={
            <span className="text-secondary font-poppins">Chatbot ID</span>
          }
        >
          <Input placeholder="Chatbot ID" />
        </Form.Item>
        <Form.Item
          name="formUrl"
          label={<span className="text-secondary">Form URL</span>}
        >
          <Input className="text-blue-500" placeholder="Form URL" />
        </Form.Item>
        <Form.Item
          name="lottilesUrl"
          label={<span className="text-secondary">Lottiles URL 1</span>}
        >
          <Input className="text-blue-500" placeholder="Lottiles URL 1" />
        </Form.Item>
        <Form.Item
          name="lottilesUrl2"
          label={<span className="text-secondary">Contact Lottiles URL</span>}
        >
          <Input  className="text-blue-500" placeholder="Lottiles URL 2" />
        </Form.Item>
        <Form.Item
          name="WhatsUp"
          label={<span className="text-secondary">WhatsUp</span>}
        >
          <Input  className="text-blue-500" placeholder="Link" />
        </Form.Item>
        <Form.Item
          name="Linkedn"
          label={<span className="text-secondary">Linkedn</span>}
        >
          <Input  className="text-blue-500" placeholder="Link" />
        </Form.Item>
        <Form.Item
          name="Github"
          label={<span className="text-secondary">Github</span>}
        >
          <Input  className="text-blue-500" placeholder="Link" />
        </Form.Item>
        <Form.Item
          name="youTubeUrl"
          label={<span className="text-secondary">YouTube</span>}
        >
          <Input  className="text-blue-500" placeholder="Link" />
        </Form.Item>
        <Form.Item
          name="clientFeedback"
          label={<span className="text-secondary">Testimonial</span>}
        >
          <Input  className="text-blue-500" placeholder="Feedback_Title" />
        </Form.Item>
        <Form.Item
          name="nullPages"
          label={<span className="text-secondary">Null Pages Image</span>}
        >
          <Input  className="text-blue-500" placeholder="Link" />
        </Form.Item>
        <Form.Item
          name="noConnection"
          label={<span className="text-secondary">No Connection</span>}
        >
          <Input  className="text-blue-500" placeholder="No_Connection" />
        </Form.Item>

        <Form.List name="profile">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, fieldKey, ...restField }) => (
                <Space
                  key={key}
                  style={{ display: "flex", marginBottom: 8 }}
                  align="baseline"
                >
                  <Form.Item
                    {...restField}
                    name={[name, "name"]}
                    fieldKey={[fieldKey, "name"]}
                    label={<span className="text-secondary">Profile Name</span>}
                    rules={[
                      { required: true, message: "Missing profile name" },
                    ]}
                  >
                    <Input placeholder="Profile Name" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "image"]}
                    fieldKey={[fieldKey, "image"]}
                    label={<span className="text-secondary">Image Url</span>}
                    rules={[{ required: true, message: "Missing image URL" }]}
                  >
                    <Input className="text-blue-500" placeholder="Image URL" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "role"]}
                    fieldKey={[fieldKey, "role"]}
                    label={<span className="text-secondary">Role</span>}
                    rules={[{ required: true, message: "Missing role" }]}
                  >
                    <Input className="text-fuchsia-800" placeholder="Role" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "feedback"]}
                    fieldKey={[fieldKey, "feedback"]}
                    label={<span className="text-secondary">Feedback</span>}
                    rules={[{ required: true, message: "Missing feedback" }]}
                  >
                    <Input placeholder="Feedback" />
                  </Form.Item>
                  <Button type="link" onClick={() => remove(name)}>
                    Delete
                  </Button>
                </Space>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} block>
                  Add Profile
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Form.List name="Skills" initialValue={portfolioData.about.Skills}>
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, fieldKey, ...restField }) => (
                <Space
                  key={key}
                  style={{ display: "flex", marginBottom: 8 }}
                  align="baseline"
                >
                  <Form.Item
                    {...restField}
                    name={[name, "name"]}
                    fieldKey={[fieldKey, "name"]}
                    label={<span className="text-secondary">Skill Name</span>}
                    rules={[{ required: true, message: "Missing skill name" }]}
                  >
                    <Input placeholder="Skill Name" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "imageUrl"]}
                    fieldKey={[fieldKey, "imageUrl"]}
                    label={<span className="text-secondary">logoLink</span>}
                    rules={[{ required: true, message: "Missing image URL" }]}
                  >
                    <Input className="text-blue-500" placeholder="Image URL" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "proficiency"]}
                    fieldKey={[fieldKey, "proficiency"]}
                    label={<span className="text-secondary">Proficiency
                    
                    </span>}
                    rules={[{ required: true, message: "Missing proficiency" }]}
                  >
                    <Input className="text-yellow-400" placeholder="Proficiency" />
                  </Form.Item>
                  <Button type="link" onClick={() => remove(name)}>
                    Delete
                  </Button>
                </Space>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} block>
                  Add Skill
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <div className="flex space-x-4">
          <button
            type="submit"
            className="w-1/2 bg-white text-black py-4 rounded-lg hover:bg-secondary shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f]"
          >
            Update
          </button>
        </div>
      </Form>
    </div>
  );
};

export default AdminAbout;
