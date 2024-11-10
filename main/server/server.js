import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { S3Client, PutObjectCommand,ListObjectsV2Command, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

dotenv.config();

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

const s3Client = new S3Client({
  region: 'eu-north-1',
  credentials: {
    accessKeyId: 'AKIAQIJRSINZ2SRKZ3TM',
    secretAccessKey: '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',
  },
});

app.post('/api/get-upload-url', async (req, res) => {
  try {
    const { fileName, fileType } = req.body;
    const uniqueFileName = `${Date.now()}-${fileName}`;

    const putObjectCommand = new PutObjectCommand({
      Bucket: 'ca3-project',
      Key: uniqueFileName,
      ContentType: fileType,
    });

    const uploadUrl = await getSignedUrl(s3Client, putObjectCommand, {
      expiresIn: 3600,
    });

    const fileUrl = `https://ca3-project.s3.eu-north-1.amazonaws.com/${uniqueFileName}`;

    res.json({ uploadUrl, fileUrl });
  } catch (error) {
    console.error('Error generating pre-signed URL:', error);
    res.status(500).json({ error: 'Failed to generate upload URL' });
  }
});

app.get('/api/list-files', async (req, res) => {
  try {
    const command = new ListObjectsV2Command({
      Bucket: 'ca3-project',
    });

    const response = await s3Client.send(command);
    const files = response.Contents?.map(file => ({
      name: file.Key,
      lastModified: file.LastModified,
      size: file.Size,
      url: `https://ca3-project.s3.eu-north-1.amazonaws.com/${file.Key}`
    })) || [];

    res.json({ files });
  } catch (error) {
    console.error('Error listing files:', error);
    res.status(500).json({ error: 'Failed to list files' });
  }
});

app.delete('/api/delete-file/:fileName', async (req, res) => {
  try {
    const { fileName } = req.params;
    
    const command = new DeleteObjectCommand({
      Bucket: 'ca3-project',
      Key: fileName
    });

    await s3Client.send(command);
    res.json({ message: 'File deleted successfully' });
  } catch (error) {
    console.error('Error deleting file:', error);
    res.status(500).json({ error: 'Failed to delete file' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});