
# Water Reminder

## About the Project

Water Reminder is a web application designed to help users track and maintain their daily water intake. It provides a user-friendly interface for setting reminders, logging water consumption, and visualizing progress towards daily hydration goals.

### Key Features

- Set personalized water intake reminders
- Track daily water consumption
- Visualize progress towards daily hydration goals
- View water intake history
- Receive hourly notifications for drinking water

## Technologies Used

This project is built using modern web technologies and best practices:

- **Next.js 14**: For server-side rendering and routing
- **TypeScript**: For type-safe JavaScript
- **Tailwind CSS**: For responsive and customizable styling
- **Clerk**: For authentication and user management
- **Prisma**: As the ORM for database operations
- **SQLite**: As the database for storing user data and water intake records

## Development Complexity and Challenges

Developing the Water Reminder application presented several interesting challenges:

1. **State Management**: Implementing real-time updates for water intake tracking while maintaining consistency across different components required careful state management.

2. **Data Persistence**: Designing an efficient database schema to store user data, reminders, and water intake records while ensuring quick retrieval for displaying history and progress.

3. **User Authentication**: Integrating Clerk for secure user authentication and managing user-specific data access.

4. **Notifications**: Implementing a system for sending timely reminders to users about their water intake goals.

5. **Data Visualization**: Creating intuitive visual representations of water intake progress and history using custom React components and Tailwind CSS.

6. **API Design**: Developing efficient API routes to handle various operations like adding reminders, updating water intake, and fetching history.

7. **Error Handling**: Implementing robust error handling throughout the application to ensure a smooth user experience even when issues arise.

8. **Performance Optimization**: Optimizing database queries and component rendering to maintain fast load times and responsive user interactions.

9. **Responsive Design**: Ensuring the application is fully responsive and provides a consistent experience across different devices and screen sizes.

## Getting Started

To run this project locally:

1. Clone the repository
2. Install dependencies with `npm install`
3. Set up your environment variables for Clerk authentication
4. Initialize the Prisma database with `npx prisma db push`
5. Run the development server with `npm run dev`
6. .env file is located in the root directory
```.env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
```

## Contributing

Contributions to improve Water Reminder are welcome. Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).