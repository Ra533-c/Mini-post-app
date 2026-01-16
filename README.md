# Mini Post App 📝

A simple social media-like application built for learning purposes using **Node.js**, **Express**, and **MongoDB**. Users can create accounts, post updates, like content, and manage their profiles.

## 🚀 Features

*   **User Authentication**: Secure Login and Registration using JWT (JSON Web Tokens) and Bcrypt for password hashing. 🔐
*   **Create Posts**: Users can share their thoughts by creating text-based posts. ✍️
*   **Like System**: Interactive like/unlike functionality for posts. ❤️
*   **Edit Posts**: Users can edit the content of their own posts. ✏️
*   **Profile Management**: View user profiles and upload/update profile pictures. 🖼️
*   **Responsive Design**: Styled with Tailwind CSS for a modern look. 📱

## 🛠️ Tech Stack

*   **Backend**: Node.js, Express.js
*   **Database**: MongoDB (Mongoose ODM)
*   **Frontend**: EJS (Embedded JavaScript), Tailwind CSS
*   **Authentication**: JWT, Cookie-Parser, Bcrypt
*   **File Uploads**: Multer

## ⚙️ Installation & Setup

1.  **Clone the repository**
    ```bash
    git clone <your-repo-url>
    cd Auth
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Set up MongoDB**
    Make sure you have MongoDB installed and running locally on `mongodb://127.0.0.1:27017/miniapp`.

4.  **Run the Application**
    ```bash
    node app.js
    # or if you have nodemon installed
    nodemon app.js
    ```

5.  **Access the App**
    Open your browser and visit: `http://localhost:3000`

## 📂 Project Structure

*   `app.js`: Main entry point of the application.
*   `models/`: Mongoose schemas for User and Post.
*   `views/`: EJS templates for frontend rendering.
*   `public/`: Static files (images, styles).
*   `config/`: Configuration files (e.g., Multer setup).
