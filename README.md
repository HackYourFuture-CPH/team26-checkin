# Team Check-In Application

Welcome to the Team Check-In Application! This web application is designed to help teams manage their activities, conduct check-in questions, and monitor progress through a user-friendly interface.

### Live Deployment

You can also access the live deployment of the application directly at https://hyf-dk-team26-checkin.vercel.app/.

### Usage Instructions

1. **Log In**: Start by entering your unique team code on the login page to gain access to your team's dashboard.

2. **Dashboard Overview**: The dashboard provides a snapshot of team activities and a navigation menu to access different features of the application.

3. **Managing Team Members**: Add new team members using the 'Add Team Member' button. Existing team members can be edited or removed using the action icons next to their names.

![Login and Dashbord](https://github.com/HackYourFuture-CPH/team26-checkin/assets/127700012/9e2703b3-d2e2-4ca1-b97e-35ec36311de1)

4. **Check-In Questions**: Create, respond to, and manage check-in questions from the 'Questions' tab. You have the flexibility to edit or delete any question as required by the team's needs.

5. **Editing and Deleting**: Every entry for team members and questions comes with options to edit or delete, ensuring you can manage your team's information and queries effectively. Just click on the appropriate icon next to an entry to make changes or remove it.

(![Question](https://github.com/HackYourFuture-CPH/team26-checkin/assets/127700012/f8c6a4a0-08fb-4437-a82b-29d34ba3c17d)
)

6. **Report Page**: Receiving Check-In Questions: This page provides responses to the check-in questions.
   Responding: Each response can be reviewed and answered, allowing for tracking of individual and team progress over time.

![03-Report](https://github.com/HackYourFuture-CPH/team26-checkin/assets/127700012/44dccee9-4048-4641-9c3b-2b53cda70759)

## Technologies Used:

### Frontend:

- **React:** Used to build the user interface of the report page, providing a responsive and interactive design.
- **CSS:** For styling the application's layout and components.

### Backend:

- **Node.js:** Provides the backend framework, handling server-side logic and data processing.
- **Express:** A web framework built on Node.js, managing routes and APIs.

### Database:

- **MySQL:** Stores team members, check-in questions, and responses, providing efficient relational data management.

### APIs:

- **RESTful API:** Provides a standard way for the frontend to interact with the backend, facilitating the creation, retrieval, update, and deletion (CRUD) of resources.
- **Custom APIs:** Allow for seamless communication between the frontend and backend, managing data flow and operations.

### Other Tools:

- **Git:** For version control, facilitating collaborative development.
- **Yarn:** Manages dependencies and packages used in the project, providing a streamlined workflow.

## Installation

This section is intended for developers interested in setting up the application locally.

1. Clone the repository:
   ```bash
   git clone https://github.com/HackYourFuture-CPH/team26-checkin.git
   ```
2. Navigate to the project directory:
   ```bash
   cd team26-checkin
   ```
3. Install dependencies:
   ```bash
   yarn install
   ```
4. Run the backend server:
   ```bash
   yarn dev
   ```
5. Run the frontend application:

```bash
   yarn start
```

You can access the app by navigating to http://localhost:3000 in your web browser.
