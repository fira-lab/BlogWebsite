<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Blog Project README</title>
    <style>
        body {
            font-family: 'Segoe UI', Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 0;
            background-color: #f0f2f5;
            color: #333;
        }
        .container {
            max-width: 900px;
            margin: 0 auto;
            padding: 20px;
        }
        header {
            text-align: center;
            padding: 30px;
            background: linear-gradient(135deg, #007bff, #0056b3);
            color: white;
            border-radius: 10px 10px 0 0;
        }
        header h1 {
            margin: 0;
            font-size: 2.8em;
        }
        section {
            background: white;
            padding: 25px;
            margin: 15px 0;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        h2 {
            color: #007bff;
            border-bottom: 3px solid #007bff;
            padding-bottom: 8px;
            font-size: 1.8em;
        }
        ul {
            list-style-type: square;
            margin-left: 25px;
        }
        li {
            margin-bottom: 12px;
            font-size: 1.1em;
        }
        p {
            margin: 12px 0;
            font-size: 1.1em;
        }
        a {
            color: #007bff;
            text-decoration: none;
        }
        a:hover {
            text-decoration: underline;
        }
        .highlight {
            background-color: #e7f3ff;
            padding: 15px;
            border-left: 5px solid #007bff;
            border-radius: 5px;
        }
        footer {
            text-align: center;
            padding: 15px 0;
            font-size: 0.95em;
            color: #555;
            background-color: #f8f9fa;
            border-radius: 0 0 10px 10px;
        }
        @media (max-width: 600px) {
            .container {
                padding: 15px;
            }
            header h1 {
                font-size: 2em;
            }
            h2 {
                font-size: 1.5em;
            }
            p, li {
                font-size: 1em;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>Blog Management System README</h1>
        </header>
        <section>
            <h2>Project Overview</h2>
            <p>
                This Blog Management System is an enterprise-grade application built with <a href="https://nestjs.com/" target="_blank">NestJS</a> on the backend and React.js with Redux on the frontend. The project follows Clean Architecture principles, incorporating Domain-Driven Design (DDD), Command Query Responsibility Segregation (CQRS), and Event Sourcing to ensure scalability, maintainability, and robust security. The system was developed to meet all requirements specified in the provided PDF, delivering a comprehensive set of features for creating, managing, and querying blog content.
            </p>
            <div class="highlight">
                <p>
                    The frontend, built with React.js and Redux, provides a highly secure and responsive user interface, while the backend leverages NestJS's modular architecture for efficient business logic orchestration.
                </p>
            </div>
        </section>
        <section>
            <h2>Key Features</h2>
            <p>
                The project implements a wide range of features as outlined in the project specification PDF, ensuring a fully functional and secure blog platform. Key features include:
            </p>
            <ul>
                <li><strong>Blog CRUD Operations:</strong> Create, retrieve, update, and delete blog posts with robust validation and error handling.</li>
                <li><strong>Title-Based Search with Blind Indexing:</strong> Securely query blogs by title using blind indexing to protect sensitive data.</li>
                <li><strong>Category-Based Filtering:</strong> Retrieve blogs by category for organized content exploration.</li>
                <li><strong>Secure Frontend with React and Redux:</strong> A responsive and secure user interface built with React.js, using Redux for state management to ensure predictable data flow and enhanced security.</li>
                <li><strong>JWT Authentication:</strong> Implements secure, token-based authentication with refresh token rotation for user sessions.</li>
                <li><strong>Role-Based Access Control (RBAC):</strong> Enforces access control with role-based guards to protect sensitive routes.</li>
                <li><strong>Secure Data Storage:</strong> Utilizes bcrypt for password hashing and AES-256-CBC for encrypting sensitive fields at rest.</li>
                <li><strong>CSRF Protection:</strong> Implements CSRF protection in API and OAuth flows to prevent cross-site request forgery attacks.</li>
                <li><strong>Event-Driven Architecture:</strong> Uses CQRS and Event Sourcing for orchestrating complex business processes, such as blog creation and updates.</li>
            </ul>
        </section>
        <section>
            <h2>Architecture Overview</h2>
            <p>
                The project adheres to Clean Architecture with a strict separation of concerns, following a four-layer structure:
            </p>
            <ul>
                <li><strong>Domain Layer:</strong> Contains pure business logic, domain entities (e.g., Blog), and repository interfaces, free of framework dependencies.</li>
                <li><strong>Application Layer:</strong> Orchestrates business logic through application services, implementing CQRS for read (queries) and write (commands) operations.</li>
                <li><strong>API Layer:</strong> Handles HTTP requests, controllers, and DTOs, integrating with the frontend via RESTful endpoints.</li>
                <li><strong>Infrastructure Layer:</strong> Manages external concerns, including MongoDB integration via Mongoose and repository implementations.</li>
            </ul>
            <p>
                The frontend leverages React.js for dynamic UI components and Redux for centralized state management, ensuring a secure and scalable user experience. The backend uses NestJS with DDD, CQRS, and Event Sourcing to handle complex workflows, such as blog creation and category-based filtering.
            </p>
        </section>
        <section>
            <h2>Security Features</h2>
            <p>
                Security is a core focus of this project, with the following measures implemented:
            </p>
            <ul>
                <li><strong>Blind Indexing:</strong> Enables secure querying of encrypted data without decryption.</li>
                <li><strong>JWT and Refresh Tokens:</strong> Ensures secure user authentication with token rotation.</li>
                <li><strong>RBAC:</strong> Restricts access to routes based on user roles.</li>
                <li><strong>Encrypted Data Storage:</strong> Sensitive fields are encrypted using AES-256-CBC.</li>
                <li><strong>CSRF Protection:</strong> Safeguards OAuth flows and API endpoints against cross-site attacks.</li>
                <li><strong>Rate Limiting:</strong> Prevents API abuse through request throttling.</li>
            </ul>
        </section>
        <section>
            <h2>Frontend Implementation</h2>
            <p>
                The frontend is built with React.js and Redux, providing a secure and responsive user interface. Key aspects include:
            </p>
            <ul>
                <li><strong>React Components:</strong> Modular, reusable components for displaying blogs, categories, and user dashboards.</li>
                <li><strong>Redux State Management:</strong> Centralized state management for predictable data flow, handling blog data, user authentication, and UI state.</li>
                <li><strong>Secure API Integration:</strong> Communicates with the NestJS backend via secure RESTful endpoints, with JWT-based authentication.</li>
                <li><strong>Responsive Design:</strong> Ensures compatibility across devices with a mobile-first approach.</li>
            </ul>
        </section>
        <section>
            <h2>Compliance with PDF Requirements</h2>
            <p>
                The project fully implements all features specified in the provided PDF, including blog management, secure search capabilities, and category-based filtering. The use of Clean Architecture, DDD, CQRS, and Event Sourcing ensures a scalable and maintainable codebase, while the secure React-Redux frontend meets modern UI/UX standards.
            </p>
        </section>
        <section>
            <h2>Getting Started</h2>
            <p>
                To set up and run the project, ensure you have Node.js 18+ and MongoDB installed. Follow these steps:
            </p>
            <ol>
                <li>Clone the repository: <code>git clone [your-repo-url]</code></li>
                <li>Navigate to the project directory: <code>cd blog-management-system</code></li>
                <li>Install dependencies: <code>npm install</code></li>
                <li>Configure MongoDB and environment variables (e.g., JWT secrets).</li>
                <li>Run the backend: <code>npm run start:dev</code></li>
                <li>Run the frontend: <code>cd frontend && npm run start</code></li>
            </ol>
            <p>
                Access the application at <code>http://localhost:3000</code> (frontend) and <code>http://localhost:4000</code> (backend API).
            </p>
        </section>
        <footer>
            <p>Developed by Firaol | Project completed on July 3, 2025</p>
        </footer>
    </div>
</body>
</html>
