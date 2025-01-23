# rural

A user-friendly platform for discovering and booking unique rural tourism experiences in Portugal.

## Table of Contents
- [About](#about)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Usage](#usage)
- [Getting Started](#getting-started)
- [Folder Structure](#folder-structure)
  

## About
This website is a dedicated platform for exploring and booking authentic rural experiences in Portugal. Designed with both guests and property owners in mind, it offers a comprehensive collection of features to facilitate seamless and enjoyable countryside getaways.

Beyond showcasing captivating rural tourism options - inspiring travelers to explore beyond the typical tourist destinations - the website aims to contribute to the economic growth and sustainability of local communities throughout Portugal.


## Demo
Check out the live version of the website here:

[Live Demo](https://rural-iqp3.onrender.com)

> **Note**: The demo is hosted on a free-tier Render plan, so performance may be slow 🐌

## Technologies Used

This project is built with the following technologies:

### Backend
- **Node.js**: JavaScript runtime for server-side development.
- **Express.js**: Web framework for backend API.
- **TypeScript**
- **MongoDB**: NoSQL database for efficient data storage.
- **Mongoose**: Object Data Modeling (ODM) for MongoDB.
- **Cloudinary**: Media storage and image optimization.
- **JWT**: Secure user authentication.
- **Bcrypt.js**: Password hashing.
- **Stripe API**: Payment gateway integration.
- **Multer**: File upload middleware.

### Frontend
- **React**: Building interactive user interfaces.
- **Vite**: Development environment and build tool.
- **TypeScript**
- **React Router DOM**: Routing library for navigating pages.
- **React Hook Form**: Form handling and validation.
- **React Query**: Data-fetching and caching library for managing server state.
- **React Icons**: Collection of customizable icons.
- **React DatePicker**: Date selection component.
- **Tailwind CSS**

### End-to-End Testing
- **Playwright**: Framework for automated end-to-end testing.
- **TypeScript**


## Features

- **Search and Filter Properties**: Use the search bar on the homepage to find properties by destination, number of guests and booking dates. You can further clarify your results using the filters and sorting options on the Search Reasults page.

- **Explore Latest Destinations**: Discover the newest listings with a dedicated section on the homepage.

- **Property Details**: View detailed property information with a 'Book Now!' option.

- **Booking Page**: Securely book properties with Stripe payment integration.

- **Favorite Properties**: Click the heart icon on property cards to save them for easy access on the 'Favorites' page.

- **Bookings**: View booking history on the 'Bookings' page.

- **List Properties**: Create listings by submitting a valid property form.

- **Edit or Delete Listings**: Manage your properties from the 'My Properties' page.

- **Mobile-Friendly Design**: Optimized for seamless browsing and interaction across devices.

- **Secure autentication**: sign in or register to access all features.


## Usage 

- **Home page**:
  - Access home page and use the search bar to input your destination, number of guests and your check-in/check-out dates. Alternatively click the 'Explore Properties' button to browse all listings.
  - Discover the types of rural tourism available with a detailed overview.
  - Check the 'Latest Destination' section, where you can find the newest additions.
 
- **Search Results**:
  - Click the 'Explore Properties' button or directly navigate to the Search Page ('/search').
  - Browse all properties or use the filters and sorting to refine your results.

- **Property Details**:
  - Click on a property card to access all the details.

- **Book Property**:
  - Ensure you're signed in, click the 'Book Now!' button on the property details page.
  - On the 'Booking' page ('/my-bookings') review the booking details, enter your payment information and confirm your booking securely using Stripe.

- **Favorite Property**:
  - If you're signed in, click the heart icon on any property card or Property Details page to add it to your Favorites.
  - Visit the 'Favorites' page to view your saved properties.
 
- **Bookings**:
  - Access the 'Bookings' page to view all your past and upcoming reservations.

- **List your Property**:
  - Navigate to the 'List your Property' page ('/list-property').
  - Fill out all the inputs on the form. Submit to add your listing to the website.
 
- **Manage Properties**:
  - Go to the '/my-property' page to view all your listed properties.
  - Use the options to edit or delete your listings.


## Getting Started

### Prerequisites
- Node.js
- MongoDB

### Instalation
1. Clone repository:

```bash
git clone https://github.com/adrianaffp/rural.git
```

2. Navigate to the project directory:

```bash
cd rural
```

3. Install dependencies for each folder:
   
   - Backend:
  
      ```bash
      cd backend
      npm i
      ```
      
    - Frontend:
  
      ```bash
      cd frontend
      npm i
      ```

   - End-to-End Tests (optional):
  
      ```bash
      cd e2e-tests
      npm i
      ```
      
### Running Application

1. Start backend server:

```bash
cd backend
npm run dev
```

2. Start frontend development server in a new terminal window:

```bash
cd frontend
npm run dev
```

3. Open your browser and navigate to:
```bash
http://localhost:5173
```

### Running Tests

1. Start End-to-End on backend server:
Run the backend server in test mode using the `.env.e2e` file:
```bash
cd backend
npm run e2e
```

2. Start frontend development server in a new terminal window:

```bash
cd frontend
npm run dev
```


## Folder Structure
rural/
├── backend/          # Backend API built with Node.js and Express
├── e2e-tests/        # End-to-end tests with Playwright
├── frontend/         # Frontend React application
└── README.md         # Project documentation
