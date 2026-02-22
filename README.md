# TailorTouch Frontend

A modern React frontend for the TailorTouch booking platform, featuring real-time communication, role-based authentication, and responsive design.

## 🚀 Features

- **Multi-role Authentication**: Customer, Tailor, and Admin interfaces
- **Real-time Updates**: WebSocket integration for live notifications
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Role-based Routing**: Protected routes based on user roles
- **Modern UI/UX**: Clean, intuitive interface design
- **State Management**: Context API for authentication and app state
- **API Integration**: Complete backend integration with error handling

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Backend server running (see backend README)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp env.example .env
   ```
   
   Edit `.env` file with your configuration:
   ```env
   # API Configuration
   REACT_APP_API_URL=http://localhost:4000/api
   
   # WebSocket Configuration
   REACT_APP_WS_URL=ws://localhost:4000
   
   # App Configuration
   REACT_APP_NAME=TailorTouch
   REACT_APP_VERSION=1.0.0
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

The app will open at `http://localhost:3000`

## 📁 Project Structure

```
frontend/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── common/           # Reusable components
│   │   │   └── LoadingSpinner.jsx
│   │   └── layout/           # Layout components
│   │       ├── Navbar.jsx
│   │       └── Footer.jsx
│   ├── context/
│   │   └── AuthContext.js    # Authentication context
│   ├── pages/
│   │   ├── Front/            # Public pages
│   │   │   ├── Home.jsx
│   │   │   ├── Services.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Contact.jsx
│   │   │   └── Booking.jsx
│   │   ├── Auth/             # Authentication pages
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   └── RoleAuth.jsx
│   │   ├── Customers/        # Customer dashboard
│   │   │   ├── CustomerDashboard.jsx
│   │   │   └── CustomerLogin.jsx
│   │   ├── Vendors/          # Tailor dashboard
│   │   │   ├── TailorDashboard.jsx
│   │   │   └── TailorAuth.jsx
│   │   └── Admin/            # Admin panel
│   │       └── AdminPanel.jsx
│   ├── services/
│   │   ├── api.js            # API service functions
│   │   └── websocket.js      # WebSocket service
│   ├── App.js                # Main app component
│   ├── index.js              # App entry point
│   └── index.css             # Global styles
├── package.json
├── tailwind.config.js
└── README.md
```

## 🔐 Authentication Flow

### User Registration
1. User selects role (Customer/Tailor)
2. Fills registration form
3. Receives OTP via email
4. Verifies OTP to complete registration

### User Login
1. User enters credentials
2. System validates and returns JWT token
3. Token stored in localStorage
4. WebSocket connection established
5. User redirected to role-specific dashboard

### Role-based Access
- **Customer**: Can book appointments, view orders, manage profile
- **Tailor**: Can manage orders, update status, view appointments
- **Admin**: Full system access, user management, analytics

## 🔌 API Integration

### API Service (`src/services/api.js`)
- Centralized API calls using axios
- Automatic token management
- Error handling and response formatting
- Request/response interceptors

### WebSocket Service (`src/services/websocket.js`)
- Real-time communication with backend
- Automatic reconnection
- Event-based message handling
- Browser notifications

## 🎨 UI Components

### Common Components
- **LoadingSpinner**: Reusable loading indicator
- **Button**: Consistent button styling
- **Modal**: Reusable modal component
- **Form**: Form components with validation

### Layout Components
- **Navbar**: Role-based navigation
- **Footer**: Public page footer
- **Sidebar**: Dashboard navigation

## 🛣️ Routing

### Public Routes
- `/` - Home page
- `/services` - Services listing
- `/about` - About page
- `/contact` - Contact page
- `/booking` - Booking page

### Authentication Routes
- `/login` - Login page
- `/signup` - Registration page
- `/role-auth` - Role selection

### Protected Routes
- `/customer/dashboard` - Customer dashboard
- `/tailor/dashboard` - Tailor dashboard
- `/admin` - Admin panel

## 🔧 State Management

### Authentication Context
- User authentication state
- Token management
- Role-based permissions
- Login/logout functions

### WebSocket Context
- Real-time connection management
- Message handling
- Event listeners

## 📱 Responsive Design

- Mobile-first approach
- Tailwind CSS for styling
- Responsive breakpoints
- Touch-friendly interfaces

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run tests in watch mode
npm test -- --watch
```

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Environment Variables for Production
```env
REACT_APP_API_URL=https://your-backend-domain.com/api
REACT_APP_WS_URL=wss://your-backend-domain.com
```

### Deployment Options
- **Netlify**: Drag and drop build folder
- **Vercel**: Connect GitHub repository
- **AWS S3**: Upload build files
- **Heroku**: Use buildpack

## 🔒 Security Features

- JWT token authentication
- Protected routes
- Role-based access control
- Secure API communication
- XSS protection
- CSRF protection

## 📊 Performance

- Code splitting with React Router
- Lazy loading of components
- Optimized bundle size
- Image optimization
- Caching strategies

## 🐛 Debugging

### Development Tools
- React Developer Tools
- Redux DevTools (if using Redux)
- Network tab for API calls
- Console for WebSocket messages

### Common Issues
1. **CORS errors**: Check backend CORS configuration
2. **WebSocket connection**: Verify backend WebSocket server
3. **Authentication**: Check token storage and API calls
4. **Routing**: Verify route protection and redirects

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Contact the development team

## 🔄 Integration with Backend

### API Endpoints
The frontend integrates with the following backend endpoints:

- **Authentication**: `/api/auth/*`
- **Orders**: `/api/orders/*`
- **Appointments**: `/api/appointments/*`
- **Users**: `/api/users/*`

### WebSocket Events
- Order updates
- Appointment reminders
- Chat messages
- System notifications

### Environment Setup
Ensure both frontend and backend are running:
- Backend: `http://localhost:4000`
- Frontend: `http://localhost:3000`

## 📈 Future Enhancements

- PWA support
- Offline functionality
- Push notifications
- Advanced analytics
- Multi-language support
- Dark mode
- Advanced search and filtering 