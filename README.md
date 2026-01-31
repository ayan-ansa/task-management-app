# 🛠️ Setup Steps: 

**Step 1: Clone the Repository**
```bash
git clone 
cd Task-Mangement
```
**Step 2: Backend Setup**
```bash
cd server
npm install
```
### Create .env file in server/
```bash
PORT=4000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
```
**Step 3: Start Backend Server**
```bash
npm start
```
**Step 4: Frontend Setup**
```bash
cd client
npm install
```
### Create .env file in client/
```bash
VITE_BASE_URL=http://localhost:4000
```
**Step 5: Start Frontend Server**
```bash
npm run dev
```
