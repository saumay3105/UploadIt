
# UploadIt

This project is a React and Express based application that allows users to upload files directly to an AWS S3 bucket. It provides a clean interface to view, and delete files stored in the cloud.

## Features

- Upload files to AWS S3 with a simple user interface.
- View the uploaded files with details such as name, size, and last modified date.
- Delete files from S3.
- Responsive design for all screen sizes.

## Technologies Used

- **Frontend**: React.js
- **Backend**: Express
- **Styling**: Custom CSS with an elegant and minimalistic design.
- **File Handling**: AWS SDK (S3) for interacting with AWS S3 buckets.

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
   cd main
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```



## Running the Project

To start the frontend , run:

```bash
npm run dev
```

To start the backend , run:

```bash
cd server
node server.js
```

