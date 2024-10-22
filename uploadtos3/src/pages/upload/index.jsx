import React, { useState } from "react";
import { Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import AWS from "aws-sdk";
import "./upload.css";

const { Dragger } = Upload;

const S3FileUpload = () => {
  const [fileList, setFileList] = useState([]);

  const handleUpload = async (file) => {
    try {
      const s3 = new AWS.S3({
        accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
        secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
        region: import.meta.env.VITE_AWS_REGION,
      });

      const params = {
        Bucket: import.meta.env.VITE_S3_BUCKET,
        Key: file.name,
        Body: file,
      };

      const { Location } = await s3.upload(params).promise();
      message.success(`${file.name} uploaded successfully`);
      return Location;
    } catch (error) {
      message.error(`${file.name} upload failed.`);
      console.error("Error uploading file: ", error);
    }
  };

  const uploadProps = {
    name: "file",
    multiple: true,
    fileList,
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
      setFileList(info.fileList);
    },
    customRequest({ file, onSuccess }) {
      handleUpload(file).then((url) => {
        onSuccess(url, file);
      });
    },
  };
  

  return (
    <div>
      <div className="t">Upload Your Files here</div>
    <div className="main">
      <Dragger {...uploadProps}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload.
        </p>
      </Dragger>
    </div>
    </div>
  );
};

export default S3FileUpload;
