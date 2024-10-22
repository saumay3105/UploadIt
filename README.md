
# UploadIt

This project is a React-based application that allows users to upload files directly to an AWS S3 bucket. It provides a clean interface to view, download, and delete files stored in the cloud.

## Features

- Upload files to AWS S3 with a simple user interface.
- View the uploaded files with details such as name, size, and last modified date.
- Download files from S3 with a direct link.
- Delete files from S3.
- Responsive design for all screen sizes.

## Technologies Used

- **Frontend**: React.js
- **Styling**: Custom CSS with an elegant and minimalistic design.
- **File Handling**: AWS SDK (S3) for interacting with AWS S3 buckets.
- **Icons**: Lucide React icons for visual elements.

## Prerequisites

Before running the project, ensure you have the following:

- **Node.js** (v14 or higher)
- **AWS S3 Bucket** with proper access rights (read, write, delete)
- **AWS Credentials** (Access Key ID and Secret Access Key)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/saumay3105/UploadIt.git
   ```

2. Navigate to the project directory:

   ```bash
   cd uploadtos3
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Create an `.env` file in the root of the project and add your AWS credentials and S3 bucket details:

   ```bash
   VITE_AWS_ACCESS_KEY_ID=your-access-key-id
   VITE_AWS_SECRET_ACCESS_KEY=your-secret-access-key
   VITE_AWS_REGION=your-aws-region
   VITE_S3_BUCKET=your-s3-bucket-name
   ```

## Running the Project

To start the development server, run:

```bash
npm run dev
```


