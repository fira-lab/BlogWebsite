<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
 
</head>
<body>
    <h1>Blog website with Clean NestJS Clean Architecture with DDD, CQRS & Event Sourcing</h1>
    <h2>Project Overview</h2>
    <p>
        The Blog Management System is an enterprise-grade application built with NestJS on the backend and React.js with Redux on the frontend. It adheres to Clean Architecture principles, incorporating Domain-Driven Design (DDD), Command Query Responsibility Segregation (CQRS), and Event Sourcing to ensure scalability, maintainability, and robust security. The system fully implements the requirements outlined in the provided project specification PDF, delivering a comprehensive platform for creating, managing, and querying blog content.
    </p>
    <p>
        The backend leverages the <code>BlogService</code> for business logic orchestration and the <code>BlogRepository</code> for data persistence with MongoDB, while the frontend provides a secure and responsive user interface using React.js and Redux for centralized state management.
    </p>
    <h2>Key Features</h2>
    <p>
        The project implements all features specified in the provided PDF, ensuring a robust and secure blog platform:
    </p>
    <ul>
        <li><b>Blog CRUD Operations</b>: Create, retrieve, update, and delete blog posts with robust validation and error handling via <code>BlogService</code>.</li>
        <li><b>Title-Based Search with Blind Indexing</b>: Securely query blogs by title using blind indexing in <code>BlogRepository</code> to protect sensitive data.</li>
        <li><b>Category-Based Filtering</b>: Retrieve blogs by category for organized content exploration, implemented in <code>BlogService</code> and <code>BlogRepository</code>.</li>
        <li><b>Secure Frontend with React and Redux</b>: A responsive UI with centralized state management for predictable data flow and enhanced security.</li>
        <li><b>JWT Authentication</b>: Secure, token-based authentication with refresh token rotation for user sessions.</li>
        <li><b>Role-Based Access Control (RBAC)</b>: Restricts access to routes using role-based guards.</li>
        <li><b>Secure Data Storage</b>: Uses bcrypt for password hashing and AES-256-CBC for encrypting sensitive fields at rest.</li>
        <li><b>CSRF Protection</b>: Safeguards API and OAuth flows against cross-site request forgery attacks.</li>
        <li><b>Event-Driven Architecture</b>: Implements CQRS and Event Sourcing for orchestrating complex workflows, such as blog creation and updates.</li>
    </ul>
    <h2>Architecture Overview</h2>
    <p>
        The project follows a Clean Architecture with a strict four-layer structure:
    </p>
    <ul>
        <li><b>Domain Layer</b>: Contains pure business logic, including the Blog entity and repository interfaces, free of framework dependencies.</li>
        <li><b>Application Layer</b>: Orchestrates business logic through application services, with <code>BlogService</code> implementing CQRS for read (queries) and write (commands) operations.</li>
        <li><b>API Layer</b>: Handles HTTP requests, controllers, and DTOs, integrating with the frontend via RESTful endpoints.</li>
        <li><b>Infrastructure Layer</b>: Manages external concerns, including MongoDB integration via Mongoose, with <code>BlogRepository</code> handling data operations.</li>
    </ul>
    <h3>CQRS Implementation</h3>
    <ul>
        <li><b>Commands</b>: Handle write operations (e.g., create, update, delete blogs) in <code>BlogService</code>.</li>
        <li><b>Queries</b>: Handle read operations (e.g., find by ID, title, or category) in <code>BlogService</code>.</li>
        <li><b>Handlers</b>: Process commands and queries separately with business-context logging.</li>
        <li><b>Events</b>: Publish domain events (e.g., BlogCreated, BlogUpdated) for inter-module communication.</li>
    </ul>
    <p>
        The <code>BlogService</code> serves as the central orchestrator, coordinating commands and queries while interacting with the <code>BlogRepository</code> for data access. The <code>BlogRepository</code> implements secure data operations, including blind indexing for title searches, using Mongoose for MongoDB integration.
    </p>
    <h2>Security Features</h2>
    <p>
        Security is a core focus, with the following measures implemented:
    </p>
    <ul>
        <li><b>Blind Indexing</b>: Enables secure querying of encrypted data without decryption in <code>BlogRepository</code>.</li>
        <li><b>JWT and Refresh Tokens</b>: Ensures secure user authentication with token rotation.</li>
        <li><b>RBAC</b>: Restricts access to routes based on user roles.</li>
        <li><b>Encrypted Data Storage</b>: Sensitive fields are encrypted using AES-256-CBC.</li>
        <li><b>CSRF Protection</b>: Safeguards against cross-site attacks in API and OAuth flows.</li>
        <li><b>Rate Limiting</b>: Prevents API abuse through request throttling.</li>
    </ul>
    <h2>Frontend Implementation</h2>
    <p>
        The frontend is built with React.js and Redux, providing a secure and responsive user interface:
    </p>
    <ul>
        <li><b>React Components</b>: Modular components for displaying blogs, categories, and user dashboards.</li>
        <li><b>Redux State Management</b>: Centralized state for predictable data flow, managing blog data, authentication, and UI state.</li>
        <li><b>Secure API Integration</b>: Communicates with the NestJS backend via secure RESTful endpoints with JWT authentication.</li>
        <li><b>Responsive Design</b>: Ensures compatibility across devices with a mobile-first approach.</li>
    </ul>
    <h2>Compliance with PDF Requirements</h2>
    <p>
        The project fully implements all features specified in the provided PDF, including blog management, secure search capabilities, and category-based filtering. The use of Clean Architecture, DDD, CQRS, and Event Sourcing ensures a scalable and maintainable codebase, while the React-Redux frontend meets modern UI/UX standards. The <code>BlogService</code> and <code>BlogRepository</code> are pivotal in delivering these features, ensuring robust and secure blog operations.
    </p>
    <h2>Getting Started</h2>
    <h3>Prerequisites</h3>
    <ul>
        <li>Node.js 18+</li>
        <li>MongoDB</li>
        <li>npm or yarn</li>
    </ul>
    <h3>Installation</h3>
    <ol>
        <li>Clone the repository: <code>git clone https://github.com/fira-lab/BlogWebsite </code></li>
        <li>Navigate to the project directory: <code>cd backend or cd frontend</code></li>
        <li>Install backend dependencies: <code>npm install</code></li>
        <li>Install frontend dependencies: <code>cd frontend && npm install</code></li>
        <li>Configure environment variables (e.g., MongoDB URI, JWT secrets).</li>
        <li>Run the backend: <code>npm run start:prod</code></li>
        <li>Run the frontend: <code>cd frontend && npm run start</code></li>
    </ol>
    <h3>Service Access</h3>
    <ul>
        <li><b>Frontend</b>: <code>http://localhost:3000</code></li>
        <li><b>Backend API</b>: <code>http://localhost:4000</code></li>
    </ul>
    <h2>Running with Docker</h2>
    <ol>
        <li>Build and start containers: <code>npm run docker:up</code></li>
        <li>View logs: <code>npm run docker:logs</code></li>
        <li>Stop containers: <code>npm run docker:down</code></li>
    </ol>
   <h2></h2>
    <hr>
    <p><b>Developed by Firaol Terefe  | Completed on July 3, 2025</b></p>
</body>
</html>
