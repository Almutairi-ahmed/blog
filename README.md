# Blog

Blog is a simple dark-themed blogging platform built with Express.js, EJS, and MongoDB. Users can read posts, create new posts, and send messages through the contact form.


## Tech Stack

- Node.js
- Express.js
- EJS
- MongoDB
- Mongoose
- Lodash
- HTML and CSS

## Requirements

- Node.js 18 or newer
- MongoDB running 

## Getting Started

1. Clone the repository and enter the project directory:

   ```bash
   git clone https://github.com/Almutairi-ahmed/blog.git
   cd blog
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start MongoDB. If MongoDB is installed as a system service:

   ```bash
   sudo systemctl start mongod
   ```

   For a temporary local database without changing system services:

   ```bash
   mkdir -p /tmp/blog-mongodb
   mongod --dbpath /tmp/blog-mongodb --bind_ip 127.0.0.1 --port 27017
   ```

4. Start the application:

   ```bash
   node app.js
   ```

5. Open [http://localhost:3002](http://localhost:3002) in your browser.

## Available Routes

| Route | Description |
| --- | --- |
| `/` | Display all blog posts |
| `/about` | Show information about the blog |
| `/contact` | Display the contact form |
| `/compose` | Create a new post |
| `/post/:postId` | Display one post |


## Project Structure

```text
.
├── app.js
├── package.json
├── public/
│   ├── CSS/style.css
│   └── js/script.js
└── views/
    ├── about.ejs
    ├── compose.ejs
    ├── contact.ejs
    ├── home.ejs
    ├── notFound.ejs
    ├── post.ejs
    └── partials/
        ├── footer.ejs
        └── header.ejs
```

## Notes

- The application currently uses `mongodb://localhost:27017/blogDB`.
- The server listens on port `3002`.
- Keep MongoDB running while using database-backed routes.