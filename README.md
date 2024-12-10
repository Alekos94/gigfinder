# GIGFINDER

GigFinder is a dynamic event discovery app that connects users with live events happening near them.

## Installation

### 1. Clone the Repository
```bash
git clone https://github.com/Alekos94/gigfinder
```

### 2. Install server dependencies
```bash
cd server
npm install
```

### 3. Install client dependencies
```bash
cd client
npm install
```

## Usage

### Run the development server
```bash
cd server
npm run server
```

### Run the client
```bash
cd client
npm run start
```

## Environment Variables

### Server

#### 1. Create a `.env` file in `/server`:
```bash
cd server
touch .env
```

#### 2. Populate the server `.env` file with the following environment variable:

`TICKETMASTER_API_KEY=<insert_your_key_here>`

### Client

#### 1. Create a `.env` file in `/client`:
```bash
cd client
touch .env
```

#### 2. Populate the client `.env` file with the following environment variable:

`REACT_APP_MAPBOX_ACCESS_TOKEN=<insert_your_key_here>`

## Contributors
George Burt • [GitHub](https://github.com/georgeeburt) • [LinkedIn](https://www.linkedin.com/in/george-burt/)

Alexandros Christodoulides • [GitHub](https://github.com/Alekos94) • [LinkedIn](https://www.linkedin.com/in/alexandros-christodoulides-227b6b149/)