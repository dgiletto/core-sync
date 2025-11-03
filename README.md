# CoreSync - Fitness Tracker Application

A full-stack fitness tracking web application that helps users log workouts, track progress, and receive personalized workout recommendations powered by AI.

## 🌟 Features

- **User Authentication**: Secure JWT-based authentication system
- **Workout Logging**: Create and manage workout sessions with detailed exercise tracking
- **Exercise Management**: Support for both strength training and cardio exercises
- **Progress Reports**: Automatic weekly and monthly progress tracking with BMI calculations
- **AI-Powered Recommendations**: Personalized workout plans generated based on user profile and fitness goals
- **Daily Motivation**: Inspirational fitness quotes cached and refreshed daily
- **Responsive Design**: Modern, dark-themed UI with smooth animations

## 🛠️ Technology Stack

### Backend
- **Java 21** with **Spring Boot 3.5.6**
- **PostgreSQL** database
- **Spring Security** with JWT authentication
- **Spring Data JPA** for database operations
- **Maven** for dependency management

### Frontend
- **Next.js 15.5.4** with React 19
- **TypeScript** for type safety
- **Tailwind CSS 4** for styling
- **Framer Motion** for animations
- **Axios** for API requests
- **shadcn/ui** components
- **Upstash Redis** for caching
- **OpenAI API** for workout recommendations

## 📋 Prerequisites

- Java 21 or higher
- Node.js 18+ and npm/yarn
- PostgreSQL database
- Redis instance (Upstash)
- OpenAI API key (via OpenRouter)

### Frontend Setup

### To Locally Run Frontend

1. Navigate to the frontend directory:
```bash
cd fitness-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file:
```env
UPSTASH_REDIS_REST_URL=your_upstash_redis_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token
NINJA_API_KEY=your_api_ninjas_key
AI_KEY=your_openrouter_api_key
```

4. Run the development server:
```bash
npm run dev
```

The frontend will start on `http://localhost:3000`

### To Run on Vercel
- Due to vercel being run on https and my elastic bean stalk being a http, the requests are not allowed to be made on google chrome so to ensure this just follow these steps.
In order to fix this issue I would be required to purchase a domain which I am not financially able to do at this moment and time, sorry for the inconvience.

1. Click this link to get to the landing page: https://core-sync-rouge.vercel.app/
2. View site information by clicking the two dot and bars at the top left next to site name
3. Click site settings
4. There you will see a list of various permissions the page has. You just need to allow insecure content (set to block on default)

## 📁 Project Structure

### Backend Structure
```
coreSync/
├── src/main/java/com/dgiletto/coreSync/
│   ├── config/           # Security and JWT configuration
│   ├── controllers/      # REST API endpoints
│   ├── domain/
│   │   ├── dto/         # Data Transfer Objects
│   │   └── entities/    # JPA entities
│   ├── mappers/         # Entity-DTO mappers
│   ├── repositories/    # Data access layer
│   ├── services/        # Business logic
│   └── util/            # Utility classes
└── src/test/           # Unit and integration tests
```

### Frontend Structure
```
fitness-frontend/
├── app/
│   ├── api/            # API routes
│   ├── dashboard/      # Dashboard pages
│   └── (auth)/         # Authentication pages
├── components/         # React components
│   └── ui/            # UI component library
├── hooks/             # Custom React hooks
└── lib/               # Utilities and configurations
```

## 🔑 Key Features Explained

### Workout Tracking
- Create workout sessions with date and weight tracking
- Add exercises with support for:
  - **Strength training**: Sets, reps, weight, muscle groups
  - **Cardio**: Duration, distance

### Progress Reports
- Automated weekly/monthly calculations using scheduled tasks
- Metrics include:
  - Average strength progress (total volume lifted)
  - Endurance progress (distance/duration ratio)
  - Weight tracking and BMI calculations

### AI Recommendations
- Personalized workout plans based on:
  - Age, weight, height
  - Current fitness level (Beginner/Intermediate/Advanced)
  - Fitness goals (Weight loss, Muscle building, Endurance)
- Cached for 24 hours to optimize API usage

## 🔐 Security

- JWT-based authentication with 10-hour token expiration
- BCrypt password hashing
- CORS configuration for frontend integration
- Stateless session management

## 📦 Deployment

### Backend
The application is configured for deployment on AWS Elastic Beanstalk. A `Dockerfile` is provided for containerization.

### Frontend
The Next.js application is deployed on Vercel with environment variables configured in the Vercel dashboard.

## 📝 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### Workout Endpoints
- `POST /api/workout/log` - Create workout
- `GET /api/workout/{userId}` - Get user's workouts (paginated)
- `GET /api/workout/{userId}/{workoutLogId}` - Get specific workout
- `PUT /api/workout/{userId}/{workoutLogId}` - Update workout
- `DELETE /api/workout/{userId}/{workoutLogId}` - Delete workout

### Exercise Endpoints
- `POST /api/exercise/{workoutLogId}` - Add exercise to workout
- `GET /api/exercise/{workoutLogId}` - Get all exercises in workout
- `GET /api/exercise/{workoutLogId}/{exerciseId}` - Get specific exercise
- `PUT /api/exercise/{workoutLogId}/{exerciseId}` - Update exercise
- `DELETE /api/exercise/{workoutLogId}/{exerciseId}` - Delete exercise

### Progress Endpoints
- `GET /api/report/{userId}/weekly` - Get weekly progress report
- `GET /api/report/{userId}/monthly` - Get monthly progress report

### User Endpoints
- `GET /api/users/{userId}` - Get user profile
- `PUT /api/users/{userId}` - Update user profile

## 👤 Author

**Dylan Giletto**
